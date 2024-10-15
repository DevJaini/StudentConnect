import express from "express";
import {
  signUp,
  signIn,
  googleSignIn,
  getProfile,
} from "../controllers/user.controller.js";
import {
  validateSignUpSignUp,
  validateSignInSignUp,
} from "../validations/user.middleware.js";

const router = express.Router();

router.post("/signup", validateSignUpSignUp, signUp);
router.post("/signin", validateSignInSignUp, signIn);
router.post("/getProfile", getProfile);
router.post("/signin/google", googleSignIn);

export default router;
