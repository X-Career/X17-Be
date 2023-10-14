import mongoose from "mongoose";
import CombineCollection from "../database";

const albumSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CombineCollection.USERINFO,
      required: true,
    },
    albumName: {
      type: String,
      require: true,
    },
    coverUrl: {
      type: String,
      default: "",
    },
    imageUrl: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: CombineCollection.IMAGE,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const albumModel = mongoose.model(CombineCollection.ALBUM, albumSchema);

export default albumModel;
