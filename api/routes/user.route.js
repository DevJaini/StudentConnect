import express from "express";
import { authenticate } from "../middleware/jwt.middleware.js";
import {
  signUp,
  signIn,
  googleSignIn,
  getProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import {
  validateSignUp,
  validateSignIn,
  validateForgotPassword,
  validateResetPassword,
} from "../validations/user.middleware.js";

const router = express.Router();

router.post("/signUp", validateSignUp, signUp);
router.post("/signIn", validateSignIn, signIn);
router.get("/getProfile", authenticate, getProfile);
router.post("/forgotPassword", validateForgotPassword, forgotPassword);
router.put("/resetPassword", validateResetPassword, resetPassword);
router.post("/signin/google", googleSignIn);

export default router;
