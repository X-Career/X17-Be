import { Router } from "express";
import AuthRouter from "./auth.js";
import UserRouter from "./user.js";
const CombineRouter = Router();

CombineRouter.use("/auth", AuthRouter);
CombineRouter.use("/user", UserRouter);

export default CombineRouter;
