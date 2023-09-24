import express from "express";
import authenticate from "../middlewares/verifyToken.js";
import { getUserData, updateUserInfo } from "../controllers/index.js";
import { validateChangeData } from "../middlewares/checkDataChange.js";
const UserRouter = express.Router();

UserRouter.get("/userInfo", authenticate, getUserData);
UserRouter.put("/updateInfo", authenticate, validateChangeData, updateUserInfo);

export default UserRouter;
