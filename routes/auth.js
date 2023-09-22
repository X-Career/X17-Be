import express from "express";
import {
  registerUser,
  signinController,
  refreshTokenHandle,
  updateUserInfo,
} from "../controllers/auth.js";
import { authenticate } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signinController);
router.post("/refresh-token", refreshTokenHandle);
router.put("/updateInfo", authenticate, updateUserInfo);

export default router;
