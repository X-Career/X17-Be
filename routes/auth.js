import { Router } from "express";
import userController from "../controllers/auth.js";
import middleware from "../middlewares/index.js";
const AuthRouter = Router();

AuthRouter.put("/updateInfo", middleware.verifyToken, userController.update);
export default AuthRouter;
