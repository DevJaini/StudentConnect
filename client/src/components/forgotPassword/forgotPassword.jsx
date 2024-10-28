import React, { useState } from "react";
import "./forgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../../api/user.js"; // Import backend API functions

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirming the password
  const [generatedOtp, setGeneratedOtp] = useState(""); // Store OTP from the API response
  const [step, setStep] = useState(1); // To handle step in the process (1: Email, 2: OTP, 3: Reset Password)
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle sending OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await forgotPassword({ email }); // Call API to send OTP
      setLoading(false);

      if (response.error) {
        setErrorMessage(response.error);
        return;
      }

      setGeneratedOtp(response.otp); // Store the OTP from the backend response
      setSuccessMessage("OTP sent to your email.");
      setStep(2); // Move to the next step (OTP verification)
    } catch (error) {
      setLoading(false);
      setErrorMessage("Error sending OTP. Please try again.");
    }
  };

  // Function to verify OTP (Frontend OTP verification)
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (otp === generatedOtp) {
      setSuccessMessage("OTP verified! You can now reset your password.");
      setStep(3); // Move to the next step (Reset password)
    } else {
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  // Function to reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      setLoading(false);
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await resetPassword({
        email,
        password,
        confirmPassword,
      }); // Call API to reset password
      setLoading(false);

      if (response.error) {
        setErrorMessage(response.error);
        return;
      }

      setSuccessMessage("Password successfully reset. You can now log in.");
      navigate("/signIn"); // Redirect to sign-in page after successful password reset
    } catch (error) {
      setLoading(false);
      setErrorMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <section className="forgotPassword mb center forgotPassword-container">
      <div className="container">
        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form className="shadow" onSubmit={handleSendOTP}>
            <h2 className="color">Forgot your password?</h2>
            <p>Enter your email to receive an OTP for password reset.</p>
            <br />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            <br />
            <Link to="/signIn" style={{ textDecoration: "underline" }}>
              Back to Sign In
            </Link>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <form className="shadow" onSubmit={handleVerifyOTP}>
            <h2 className="color">Verify OTP</h2>
            <p>We have sent an OTP to your email. Please enter it below.</p>
            <br />
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <br />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <button type="submit" disabled={loading}>
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form className="shadow" onSubmit={handleResetPassword}>
            <h2 className="color">Reset Password</h2>
            <p>Enter your new password below.</p>
            <br />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
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
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <button type="submit" disabled={loading}>
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
