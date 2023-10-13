import { Router } from "express";
import AuthRouter from "./auth.js";
import UserRouter from "./user.js";
import vacationRouter from "./vacation.js";
import milestoneRouter from "./milestone.js";
const CombineRouter = Router();

CombineRouter.use("/auth", AuthRouter);
CombineRouter.use("/user", UserRouter);
CombineRouter.use("/vacation", vacationRouter);
CombineRouter.use("/milestone", milestoneRouter);

export default CombineRouter;
