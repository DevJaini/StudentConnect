import { supabase } from "../database/supabase.config.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/jwt.middleware.js";
import { sendOTPEmail } from "../services/otp.service.js";

// Sign Up Controller
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (data) {
      return res
        .status(400)
        .json({ error: "A user with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from("users")
      .insert({ username, email, password: hashedPassword });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Account created successfully!", data });
  } catch (err) {
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
      details: err.message,
    });
  }
};

// Sign In Controller
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({
        error:
          "No account found with this email. Please check your email or sign up.",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        error:
          "Incorrect password. Please check your credentials and try again.",
      });
    }

    delete user.password;
    user.token = generateToken(user);

    res.status(200).json({ message: "Logged in successfully!", user });
  } catch (err) {
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
      details: err.message,
    });
  }
};

// Get User Profile Controller
export const getProfile = async (req, res) => {
  const id = req.user.userId;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ error: "Id is required to fetch the profile." });
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return res
        .status(404)
        .json({ error: "User profile not found. Please check your details." });
    }

    delete data.password;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
      details: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  const id = req.user.userId;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ error: "Id is required to fetch the profile." });
    }

    const { error } = await supabase
      .from("users")
      .update(req.body)
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
      details: err.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({
        error: "No account with this email. Please check or sign up.",
      });
    }

    const otp = await sendOTPEmail(email);

    res.status(200).json({ message: "OTP sent to your email!", otp });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Reset Password Controller
export const updatePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({
        error: "No account with this email. Please check or sign up.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password in the database
    const { error: updateError } = await supabase
      .from("users")
      .update({ password: hashedPassword })
      .eq("email", email);

    if (updateError) {
      return res
        .status(400)
        .json({ error: "Unable to reset password. Please try again." });
    }

    res.status(200).json({ message: "Password reset successful!" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const id = req.user.userId;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return res
        .status(404)
        .json({ error: "User profile not found. Please check your details." });
    }

    const validPassword = await bcrypt.compare(oldPassword, data.password);

    if (!validPassword) {
      return res.status(400).json({
        error:
          "Incorrect old password. Please check your credentials and try again.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    const { error: updateError } = await supabase
      .from("users")
      .update({ password: hashedPassword })
      .eq("id", id);

    if (updateError) {
      return res
        .status(400)
        .json({ error: "Unable to reset password. Please try again." });
    }

    res.status(200).json({ message: "Password reset successful!" });
  } catch (err) {
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
      .json({ message: "Successfully signed in with Google!", session: data });
  } catch (err) {
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
      details: err.message,
    });
  }
};
