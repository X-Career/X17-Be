import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

const ReactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    postId: { type: mongoose.Types.ObjectId, ref: "Post" },
    reaction: {
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

const Reaction = mongoose.model(CombineCollection.REACTION, ReactionSchema);
export default Reaction;
