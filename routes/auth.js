import express from "express";
import { registerUser, signinController } from "../controllers/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signinController);

export default router;
