import express from "express";
import authenticate from "../middlewares/verifyToken.js";
import { getUserData, updateUserInfo } from "../controllers/index.js";

import { schemaUpdateUserInfo } from "../validators/index.js";
import validate from "../middlewares/validate.js";
import { UserInfoUpdateAvt } from "../controllers/index.js";

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
