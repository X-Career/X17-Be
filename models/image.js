import mongoose from "mongoose";
import CombineCollection from "../database";

const albumSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      default: "",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const albumModel = mongoose.model(CombineCollection.IMAGE, albumSchema);

export default albumModel;
