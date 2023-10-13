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
