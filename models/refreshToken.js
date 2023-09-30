import mongoose from "mongoose";
import CombineCollection from "../database/index.js";
const RefreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const refreshTokenModel = mongoose.model(
  CombineCollection.REFRESHTOKEN,
  RefreshTokenSchema
);
export default refreshTokenModel;
