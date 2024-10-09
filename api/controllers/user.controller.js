import { supabase } from "../config/supabase.config.js";
import bcrypt from "bcrypt";

// Sign Up Controller
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([{ username, email, password: hashedPassword }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "User sign up successful!", data });
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
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

    res.status(200).json({ message: "Sign in successful!", user });
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};

// Google OAuth Sign In Controller
export const googleSignIn = async (req, res) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res
    .status(200)
    .json({ message: "Google sign in successful!", session: data });
};
