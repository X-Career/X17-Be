import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

const ReactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vacationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacation",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reaction = mongoose.model(CombineCollection.REACTION, ReactionSchema);
export default Reaction;
