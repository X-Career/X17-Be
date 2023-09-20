import mongoose from "mongoose";
import CombineCollection from "../database/index.js";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: String,
      default: "",
    },
    salt: { type: String, required: true },
    age: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model(CombineCollection.USERINFO, UserSchema);
export default UserModel;
