import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

<<<<<<< HEAD
const milestoneSchema = new mongoose.Schema({
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
});
=======
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
>>>>>>> 7757de963e97c7e9a8af3339ff54f679f4545282

const milestoneModel = mongoose.model(
  CombineCollection.MILESTONE,
  milestoneSchema
);
export default milestoneModel;
