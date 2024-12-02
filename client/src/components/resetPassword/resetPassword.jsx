import React, { useState } from "react";
import { resetPassword } from "../../api/user"; // Import your reset password function
import "./resetPassword.css"; // Import your CSS file

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent page refresh

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password must match.");
      return;
    }

    try {
      // Call the API function to reset the password
      await resetPassword({
        oldPassword,
        newPassword,
      });
      setSuccess("Password reset successfully!");
      setError("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword} className="reset-password-form">
        {/* Old Password */}
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        {/* New Password */}
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Error and Success Messages */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {/* Submit Button */}
        <button type="submit" className="btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
