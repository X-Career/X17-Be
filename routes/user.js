import express from "express";
import authenticate from "../middlewares/verifyToken.js";
import {
  getUserData,
  updateUserInfo,
  UserInfoUpdateAvt,
} from "../controllers/userController.js";
import { schemaUpdateUserInfo } from "../validators/index.js";
import validate from "../middlewares/validate.js";

const UserRouter = express.Router();

UserRouter.get("/userInfo", authenticate, getUserData);
UserRouter.put(
  "/updateInfo",
  authenticate,
  validate(schemaUpdateUserInfo),
  updateUserInfo
);
UserRouter.post("/updateAvatar", authenticate, UserInfoUpdateAvt);

export default UserRouter;
