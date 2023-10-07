import { Router } from "express";
import AuthRouter from "./auth.js";
import UserRouter from "./user.js";
import PostRouter from "./post.js";

const CombineRouter = Router();

CombineRouter.use("/auth", AuthRouter);
CombineRouter.use("/user", UserRouter);
CombineRouter.use("/posts", PostRouter);

export default CombineRouter;
