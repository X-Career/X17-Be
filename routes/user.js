import express from "express";
import authenticate from "../middlewares/verifyToken.js";
import { getUserData } from "../controllers/index.js";
const UserRouter = express.Router();
UserRouter.get("/userInfo", authenticate, getUserData);
export default UserRouter;
