import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

const PostSchema = new mongoose.Schema(
  {
    vacation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CombineCollection.VACATION,
      required: true,
    },
    milestones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: CombineCollection.MILESTONE,
      },
    ],
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model(CombineCollection.POST, PostSchema);
export default Post;
