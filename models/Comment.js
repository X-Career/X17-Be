import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

const CommentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    postId: { type: mongoose.Types.ObjectId, ref: "Post" },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model(CombineCollection.COMMENT, CommentSchema);
export default Comment;
