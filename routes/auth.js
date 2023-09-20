import { Router } from "express";
const AuthRouter = Router();
AuthRouter.post("/signIn");
AuthRouter.post("/signUp");
export default AuthRouter;
