import Joi from "joi";
import validateRequest from "../middleware/validate.middleware.js";

const signUpSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    "string.empty": "Username is required",
  }),
  email: Joi.string()
    .email()
    .required()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/)
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
      "string.pattern.base": "Invalid email domain. Use your student email.",
    }),
  password: Joi.string().min(5).required().messages({
    "string.min": "Password must be at least 5 characters long",
    "string.empty": "Password is required",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm Password is required",
  }),
});

const signInSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/)
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
      "string.pattern.base": "Email must be a valid .edu email address",
    }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/)
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
      "string.pattern.base": "Email must be a valid .edu email address",
    }),
});

// Export middleware using common validation
export const validateSignUp = validateRequest(signUpSchema);
export const validateSignIn = validateRequest(signInSchema);
export const validateForgotPassword = validateRequest(forgotPasswordSchema);
