// transporter.service.js
import nodemailer from "nodemailer";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.example.com", // Replace with your SMTP server
  port: 587, // Usually 587 for TLS or 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_EMAIL, // Your email
    pass: process.env.SMTP_PASSWORD, // Your email password
  },
});

// Function to send an email
export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to, // List of receivers
      subject, // Subject line
      text, // Plain text body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};
