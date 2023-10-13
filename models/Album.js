import mongoose from "mongoose";
import CombineCollection from "../controllers/database";

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
    avatarUrl: {
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
