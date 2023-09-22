import { Router } from "express";
import AuthRouter from "./auth.js";
const CombineRouter = Router();

CombineRouter.use("/auth", AuthRouter);

export default CombineRouter;
