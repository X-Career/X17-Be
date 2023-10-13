import { Router } from "express";
import AuthRouter from "./auth.js";
import UserRouter from "./user.js";
<<<<<<< HEAD
import PostRouter from "./post.js";

=======
import vacationRouter from "./vacation.js";
import milestoneRouter from "./milestone.js";
>>>>>>> 7757de963e97c7e9a8af3339ff54f679f4545282
const CombineRouter = Router();

CombineRouter.use("/auth", AuthRouter);
CombineRouter.use("/user", UserRouter);
<<<<<<< HEAD
CombineRouter.use("/posts", PostRouter);
=======
CombineRouter.use("/vacation", vacationRouter);
CombineRouter.use("/milestone", milestoneRouter);
>>>>>>> 7757de963e97c7e9a8af3339ff54f679f4545282

export default CombineRouter;
