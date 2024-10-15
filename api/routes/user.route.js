import express from "express";
import {
  signUp,
  signIn,
  googleSignIn,
  getProfile,
} from "../controllers/user.controller.js";
import {
  validateSignUp,
  validateSignIn,
} from "../validations/user.middleware.js";

const router = express.Router();

router.post("/signup", validateSignUp, signUp);
router.post("/signin", validateSignIn, signIn);
router.post("/getProfile", getProfile);
router.post("/signin/google", googleSignIn);

export default router;
