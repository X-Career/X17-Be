import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

const albumSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CombineCollection.USERINFO,
      required: true,
    },
    owner: {
      type: String,
      ref: CombineCollection.USERINFO,
      required: true,
    },
    albumName: {
      type: String,
      require: true,
    },
    coverUrl: {
      type: String,
      require: true,
      default: "",
    },
    privacy: {
      type: String,
      default: "public",
    },
  },
  {
    timestamps: true,
  }
);

const albumModel = mongoose.model(CombineCollection.ALBUM, albumSchema);

export default albumModel;
