// otp.service.js
import crypto from "crypto";
import { sendEmail } from "./transporter.service.js";

// Function to generate a secure OTP
export const generateSecureOTP = () => {
  const otp = crypto.randomInt(100000, 999999); // Generates a 6-digit OTP
  return otp.toString(); // Convert to string for easy handling
};

// Example usage of generating an OTP
export const sendOTPEmail = async (to) => {
  const otp = generateSecureOTP();

  // Optionally, send the OTP via email using the sendEmail function from transporter.service.js

  try {
    await sendEmail(
      to,
      "Your Password Reset One Time Password(OTP) Code",
      `Your One Time Password(OTP) for password reset is: ${otp}. Don't share this OTP with anyone.`
    );
    return otp; // Return OTP if needed for further verification
  } catch (error) {
    throw new Error("OTP sending failed");
  }
};
