import express from "express";
import validate from "../middlewares/validate.js";
import { schemaRegister, schemaSignIn } from "../validators/index.js";
import {
  registerUser,
  signinController,
  refreshTokenHandle,
} from "../controllers/authController.js";
const AuthRouter = express.Router();

AuthRouter.post("/register", validate(schemaRegister), registerUser);
AuthRouter.post("/login", validate(schemaSignIn), signinController);
AuthRouter.post("/refresh-token", refreshTokenHandle);

export default AuthRouter;
