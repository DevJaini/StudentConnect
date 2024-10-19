import express from "express";
import {
  signUp,
  signIn,
  googleSignIn,
  getProfile,
  forgotPassword,
} from "../controllers/user.controller.js";
import {
  validateSignUp,
  validateSignIn,
  validateForgotPassword,
} from "../validations/user.middleware.js";

const router = express.Router();

router.post("/signup", validateSignUp, signUp);
router.post("/signin", validateSignIn, signIn);
router.get("/getProfile", getProfile);
router.post("/forgotPassword", validateForgotPassword, forgotPassword);
router.post("/signin/google", googleSignIn);

export default router;
