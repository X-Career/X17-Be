import express from "express";
import authenticate from "../middlewares/verifyToken.js";
import {
  getUserData,
  updateUserInfo,
  UserInfoUpdateAvt,
} from "../controllers/userController.js";
import {
  createVacation,
  getVacationWithMilestones,
} from "../controllers/vacationController.js";
import {
  schemaUpdateUserInfo,
  schemaCreateVacation,
} from "../validators/index.js";
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
UserRouter.post(
  "/createVacation",
  authenticate,
  validate(schemaCreateVacation),
  createVacation
);
UserRouter.post("/getVacation", authenticate, getVacationWithMilestones);

export default UserRouter;
