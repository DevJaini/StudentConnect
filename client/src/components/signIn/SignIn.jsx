import React, { useState } from "react";
import "./signIn.css";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Function to handle email/password sign in
  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true); // Set loading to true
    setErrorMessage(""); // Reset error message

    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    setLoading(false); // Reset loading to false

    if (error) {
      setErrorMessage(error.message); // Set error message
      console.error("Error signing in:", error);
      return;
    }

    console.log("User:", user);
    // Redirect to dashboard or handle successful sign-in
  };

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing in with Google:", error);
      return;
    }

    console.log("User:", user);
    // Redirect to dashboard or handle successful sign-in
  };

  return (
    <section className="signIn mb center signIn-container">
      <div className="container">
        <form className="shadow" onSubmit={handleSignIn}>
          <h2 className="color">Sign into your account</h2>
          Or,&nbsp;
          <Link to="/signUp" style={{ textDecoration: "underline" }}>
            Create an account
          </Link>
          <br />
          <br />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
          <Link to="/forgotPassword" style={{ textDecoration: "underline" }}>
            Forgot your password?
          </Link>
          <br />
          <br />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
          {/* Display error message */}
          <button type="submit" disabled={loading}>
            {" "}
            {/* Disable button when loading */}
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <br />
          <h4 style={{ color: "gray" }}>
            ------------------------- OR -------------------------
          </h4>
          <br />
          <button type="button" onClick={handleGoogleSignIn} disabled={loading}>
            {" "}
            {/* Disable Google sign-in button when loading */}
            Sign In with Google
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
