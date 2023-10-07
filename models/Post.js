import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

const PostSchema = new mongoose.Schema(
  {
    milestone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CombineCollection.MILESTONE,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model(CombineCollection.POST, PostSchema);
export default Post;
