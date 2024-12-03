import React, { useState } from "react";
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { signUp } from "../../api/user.js"; // Assuming you have a signUp API

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setErrorMessage(["Passwords do not match."]);
      return;
    }

    setLoading(true); // Start loading spinner

    try {
      const response = await signUp({
        username,
        email,
        password,
      }); // Call the signUp API

      if (response.success) {
        setLoading(false);
        navigate("/signIn"); // Navigate to sign-in page on success
      }
    } catch (error) {
      setLoading(false);
      console.error("Sign-up error:", error.errors);
      setErrorMessage(error.errors); // Set errors directly as an array
    }
  };

  const handleGoogleSignUp = async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        throw new Error(error.message);
      }

      navigate("/signIn"); // Navigate to sign-in page on success
    } catch (error) {
      setLoading(false);

      // Log and display a meaningful error message
      console.error("Google sign-up error:", error);
      setErrorMessage(
        error.message || "Google sign-up failed. Please try again."
      );
    }
  };

  return (
    <section className="signUp mb center signUp-container">
      <div className="container">
        <form className="shadow" onSubmit={handleSignUp}>
          <h2 className="color">Create an account</h2>
          Or,&nbsp;
          <Link to="/signIn" style={{ textDecoration: "underline" }}>
            Sign into your account
          </Link>
          <br />
          <br />
          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />
          {errorMessage && (
            <ul
              style={{
                color: "red",
              }}
            >
              {errorMessage.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          )}{" "}
          {/* Display error message */}
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <br />
          <h4 style={{ color: "gray" }}>
            ------------------------- OR -------------------------
          </h4>
          <br />
          <button type="button" onClick={handleGoogleSignUp} disabled={loading}>
            {loading ? "Signing Up with Google..." : "Sign Up with Google"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
