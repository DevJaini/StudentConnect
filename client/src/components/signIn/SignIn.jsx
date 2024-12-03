import React, { useState } from "react";
import "./signIn.css";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { signIn } from "../../api/user.js";
import { useUser } from "../../context/userContext.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  // Function to handle email/password sign in
  const handleSignIn = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await signIn({
        email,
        password,
      }); // Call the signUp API

      if (response.success) {
        setLoading(false);
        // Store token in localStorage
        localStorage.setItem("authToken", response.user.token);
        setUser(response.user); // Store username in context
        navigate("/"); // Navigate to sign-in page on success
      }
    } catch (error) {
      setLoading(false);
      console.error("Sign-up error:", error);
      setErrorMessage(error.errors); // Set errors directly as an array
    }
  };

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing in with Google:", error);
      return;
    }

    navigate("/");
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
