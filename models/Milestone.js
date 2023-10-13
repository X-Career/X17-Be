import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

const milestoneSchema = new mongoose.Schema(
  {
    vacation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CombineCollection.VACATION,
      required: true,
    },
    title: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const milestoneModel = mongoose.model(
  CombineCollection.MILESTONE,
  milestoneSchema
);
export default milestoneModel;
