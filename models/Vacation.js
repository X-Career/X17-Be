import mongoose from "mongoose";
import CombineCollection from "../database/index.js";
const vacationSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CombineCollection.USERINFO,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    participants: [
      {
        type: String,
      },
    ],
    startDay: {
      type: Date,
      required: true,
    },
    endDay: {
      type: Date,
      required: true,
    },
    privacy: {
      type: String,
      default: "public",
    },
    avatarUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dsdoekr0q/image/upload/v1696919248/avatar/gjqakp6jxzlvmli6ilcy.jpg",
    },
<<<<<<< HEAD
    milestones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: CombineCollection.MILESTONE,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: CombineCollection.COMMENT,
      },
    ],
    reactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: CombineCollection.REACTION,
      },
    ],
=======
>>>>>>> 7757de963e97c7e9a8af3339ff54f679f4545282
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const vacationModel = mongoose.model(
  CombineCollection.VACATION,
  vacationSchema
);
export default vacationModel;
