import React, { useState } from "react";
import "./forgotPassword.css"; // Optional: Create this CSS file for custom styling
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/user.js"; // Assuming you have this function in your API

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle forgot password form submission
  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Call the API function to send the reset email or OTP
      const { error } = await forgotPassword(email); // This could be an API or Supabase function

      setLoading(false);

      if (error) {
        setErrorMessage(error.message);
        console.error("Error sending reset email:", error);
        return;
      }

      // If successful, show a success message
      setSuccessMessage(
        "Password reset email sent successfully! Please check your inbox."
      );
    } catch (error) {
      setLoading(false);
      setErrorMessage("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className="forgotPassword mb center forgotPassword-container">
        <div className="container">
          <form className="shadow" onSubmit={handleForgotPassword}>
            <h2 className="color">Forgot your password?</h2>
            <p>Enter your email address to receive a password reset link.</p>
            <br />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
            <br />
            {errorMessage && (
              <p style={{ color: "red" }}>{errorMessage}</p>
            )}{" "}
            {/* Display error message */}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}{" "}
            {/* Display success message */}
            <button type="submit" disabled={loading}>
              {loading ? "Sending Reset Email..." : "Send Reset Email"}
            </button>
            <br />
            <br />
            <Link to="/signIn" style={{ textDecoration: "underline" }}>
              Back to Sign In
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
