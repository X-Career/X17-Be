import express from "express";
import {
  registerUser,
  signinController,
  refreshTokenHandle,
} from "../controllers/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signinController);
router.post("/refresh-token", refreshTokenHandle);

export default router;
