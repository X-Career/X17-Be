import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

const mediaSchema = new mongoose.Schema(
  {
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CombineCollection.ALBUM,
      required: true,
    },
    mediaUrl: {
      type: String,
      default: "",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const mediaModel = mongoose.model(CombineCollection.MEDIA, mediaSchema);

export default mediaModel;
