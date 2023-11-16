import express from "express";
import authenticate from "../middlewares/verifyToken.js";
import {
  addLikeToVacation,
  checkIfUserLikedVacation,
} from "../controllers/reactionController.js";
const reactionRouter = express.Router();
reactionRouter.post(
  "/createReaction/:vacationId",
  authenticate,
  addLikeToVacation
);
reactionRouter.get(
  "/checkReaction/:vacationId",
  authenticate,
  checkIfUserLikedVacation
);
export default reactionRouter;
