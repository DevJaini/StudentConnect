import express from "express";
import { authenticate } from "../middleware/jwt.middleware.js";
import {
  signUp,
  signIn,
  googleSignIn,
  getProfile,
  forgotPassword,
  resetPassword,
  updateProfile,
  updatePassword,
} from "../controllers/user.controller.js";
import {
  validateSignUp,
  validateSignIn,
  validateForgotPassword,
  validateUpdatePassword,
} from "../validations/user.validation.js";

const router = express.Router();

router.post("/signUp", validateSignUp, signUp);
router.post("/signIn", validateSignIn, signIn);
router.post("/getProfile", authenticate, getProfile);
router.put("/updateProfile", authenticate, updateProfile);
router.put("/resetPassword", authenticate, resetPassword);
router.post("/forgotPassword", validateForgotPassword, forgotPassword);
router.put("/updatePassword", validateUpdatePassword, updatePassword);
router.post("/signin/google", googleSignIn);

export default router;
