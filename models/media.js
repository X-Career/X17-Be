import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

const mediaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CombineCollection.USERINFO,
      required: true,
    },
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
    type: {
      type: String,
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
