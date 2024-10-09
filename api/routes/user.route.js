import express from "express";
import {
  signUp,
  signIn,
  googleSignIn,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signin/google", googleSignIn);

export default router;
