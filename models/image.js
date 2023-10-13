import mongoose from "mongoose";
import CombineCollection from "../database";

const albumSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      default: "",
    },
    album: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: CombineCollection.ALBUM,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const albumModel = mongoose.model(CombineCollection.IMAGE, albumSchema);

export default albumModel;
