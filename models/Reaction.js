import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

const ReactionSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const Reaction = mongoose.model(CombineCollection.REACTION, ReactionSchema);
export default Reaction;
