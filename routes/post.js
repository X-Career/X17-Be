import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";

const PostRouter = express.Router();

PostRouter.post("/create/:milestoneId", createPost);
PostRouter.put("/update/:postId", updatePost);
PostRouter.delete("/delete/:postId", deletePost);
PostRouter.get("/getPost/:milestoneId", getPosts);

export default PostRouter;
