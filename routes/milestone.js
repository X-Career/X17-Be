import express from "express";
import { getMilestoneInfo } from "../controllers/milestone.js";
const milestoneRouter = express.Router();
milestoneRouter.get("/getMilestones/:vacationId", getMilestoneInfo);
export default milestoneRouter;
