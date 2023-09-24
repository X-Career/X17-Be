import express from "express";
import { validateDataRegister, validateSignIn } from "../middlewares/index.js";
import {
  registerUser,
  signinController,
  refreshTokenHandle,
} from "../controllers/auth.js";
const AuthRouter = express.Router();

AuthRouter.post("/register", validateDataRegister, registerUser);
AuthRouter.post("/login", validateSignIn, signinController);
AuthRouter.post("/refresh-token", refreshTokenHandle);

export default AuthRouter;
