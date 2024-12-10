import { supabase } from "../database/supabase.config.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/jwt.middleware.js";
import { sendOTPEmail } from "../services/otp.service.js";

// Add a new user to the studentconnect
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email is already in use
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

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from("users")
      .insert({ username, email, password: hashedPassword });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res
      .status(200)
      .json({ success: true, message: "Account created successfully!", data });
  } catch (err) {
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
      details: err.message,
    });
  }
};

//  Authentication of the user of studentconnect
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
        errors: [
          "No account found with this email. Please check your email or sign up.",
        ],
      });
    }

    // Validate the password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        errors: [
          "Incorrect password. Please check your credentials and try again.",
        ],
      });
    }

    // Remove the password from the user object before sending the response
    delete user.password;
    user.token = generateToken(user);

    res
      .status(200)
      .json({ success: true, message: "Logged in successfully!", user });
  } catch (err) {
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
      details: err.message,
    });
  }
};

// Get User Profile Controller
export const getProfile = async (req, res) => {
  const filters = req.body;

  try {
    let query = supabase.from("users").select("*").eq("archived", false);

    // Dynamically apply filters if provided
    if (filters && Object.keys(filters).length > 0) {
      for (const key in filters) {
        query = query.eq(key, filters[key]);
      }
    }

    const { data, error } = await query;

    if (error || !data) {
      return res
        .status(404)
        .json({ error: "User profile not found. Please check your details." });
    }

    delete data.password; // Remove sensitive data before sending

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
      details: err.message,
    });
  }
};

// Update User Profile Controller
export const updateProfile = async (req, res) => {
  const id = req.user.userId;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ error: "Id is required to fetch the profile." });
    }

    // Update the user profile with the provided data
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

// Forgot Password Controller
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
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

    // Send OTP to the user's email for password reset
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
    // Retrieve user by email
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

    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    const { error: updateError } = await supabase
      .from("users")
      .update({ password: hashedPassword })
      .eq("email", email);

    if (updateError) {
      return res
        .status(400)
        .json({ error: "Unable to update password. Please try again." });
    }

    res.status(200).json({ message: "Password update successful!" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Reset Password using Old and New Password Controller
export const resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const id = req.user.userId;

  try {
    // Retrieve user by ID
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

    // Compare the old password with the stored password
    const validPassword = await bcrypt.compare(oldPassword, data.password);

    if (!validPassword) {
      return res.status(400).json({
        error:
          "Incorrect old password. Please check your credentials and try again.",
      });
    }

    // Hash the new password before updating
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
    // Initiate Google OAuth sign-in
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
