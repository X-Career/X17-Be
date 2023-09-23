import express from "express";
import {
  registerUser,
  signinController,
  refreshTokenHandle,
} from "../controllers/auth.js";
const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", signinController);
AuthRouter.post("/refresh-token", refreshTokenHandle);

export default AuthRouter;
