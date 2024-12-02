import React, { useState } from "react";
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { signUp } from "../../api/user.js"; // Assuming you have a signUp API similar to signIn
// import { useUser } from "../../context/userContext.js";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { setUser } = useUser();

  // Function to handle email/password sign-up
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true); // Set loading state to true
    setErrorMessage("");

    const { error } = await signUp({
      username,
      email,
      password,
      confirmPassword,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message); // Display error message
      return;
    }

    navigate("/signIn"); // Redirect to the home page upon successful sign-up
  };

  // Function to handle Google sign-up
  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setErrorMessage(error.message); // Display error message
      return;
    }

    navigate("/signIn"); // Redirect to the home page upon successful Google sign-up
  };

  return (
    <>
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
              onChange={(e) => setUsername(e.target.value)} // Update fullName state
              required
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
              required
            />
            <br />
            {errorMessage && (
              <p style={{ color: "red" }}>{errorMessage}</p>
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
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading}
            >
              {loading ? "Signing Up with Google..." : "Sign Up with Google"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
