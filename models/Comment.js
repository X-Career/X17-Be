import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CombineCollection.USERINFO,
      required: true,
    },
    vacationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CombineCollection.VACATION,
      required: true,
    },
    content: {
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
