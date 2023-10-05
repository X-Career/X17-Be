import express from "express";
import authenticate from "../middlewares/verifyToken.js";
import {
  getUserData,
  updateUserInfo,
  createVacation,
  getVacationWithMilestones,
} from "../controllers/index.js";
import {
  schemaUpdateUserInfo,
  schemaCreateVaction,
} from "../validators/index.js";
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
UserRouter.post(
  "/createVacation",
  authenticate,
  validate(schemaCreateVaction),
  createVacation
);
UserRouter.post("/getVacation", authenticate, getVacationWithMilestones);

export default UserRouter;
