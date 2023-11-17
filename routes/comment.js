import express from "express";
import {
  createComment,
  getComment,
  deleteComment,
} from "../controllers/comment.js";
import authenticate from "../middlewares/verifyToken.js";
const commentRouter = express.Router();
commentRouter.post("/create-comment/:vacationId", authenticate, createComment);
commentRouter.get("/get-comment/:vacationId", getComment);
commentRouter.post("/delete-comment/:cmtId", deleteComment);
export default commentRouter;
