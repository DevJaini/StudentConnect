import { supabase } from "../database/supabase.config.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/jwt.middleware.js";

// Sign Up Controller
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required!" });
    }

    // Check if email is a student email
    if (!email.endsWith(".edu")) {
      return res
        .status(400)
        .json({ message: "Invalid email domain. Use your student email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([{ username, email, password: hashedPassword }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: "User sign up successful!", data });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Sign In Controller
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required!" });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: "Invalid email." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password." });
    }

    user.token = generateToken(user);

    res.status(200).json({ message: "Sign in successful!", user });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Get User Profile Controller
export const getProfile = async (req, res) => {
  const email = req.user.email;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single(); // Fetch a single user based on student ID

    if (error || !data) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Get Profile Error:", err); // Log error for debugging
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Google OAuth Sign In Controller
export const googleSignIn = async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res
      .status(200)
      .json({ message: "Google sign-in successful!", session: data });
  } catch (err) {
    console.error("Google Sign In Error:", err); // Log error for debugging
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
