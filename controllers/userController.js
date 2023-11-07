import {
  resClientData,
  decodeToken,
  hashingPassword,
  comparePassword,
} from "../utils/index.js";
import UserModel from "../models/User.js";

import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

export const getUserData = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const verify = decodeToken(token);

    const user = await UserModel.findOne({ _id: verify.userId }).select(
      "-password"
    );

    if (!user) throw new Error("User profile not found");
    return resClientData(res, 200, user, "Find success");
  } catch (error) {
    resClientData(res, 403, null, error.message);
  }
};
// update user info
export const updateUserInfo = async (req, res) => {
  try {
    const user = req.authUser;
    const {
      firstName,
      lastName,
      username,
      crrPassword,
      newPassword,
      gender,
      bio,
      age,
      dateOfBirth,
    } = req.body;

    const updateFields = {
      firstName,
      lastName,
      username,
      gender,
      bio,
      age,
      dateOfBirth,
    };

    const trimmedCrrPassword = (crrPassword || "").trim();
    const trimmedNewPassword = (newPassword || "").trim();

    if (trimmedCrrPassword !== "" && trimmedNewPassword === "") {
      throw new Error("Mật khẩu mới không được để trống!");
    } else if (trimmedCrrPassword === "" && trimmedNewPassword !== "") {
      throw new Error("Mật khẩu hiện tại không được để trống!");
    } else if (trimmedCrrPassword !== "" && trimmedNewPassword !== "") {
      if (trimmedCrrPassword === trimmedNewPassword) {
        throw new Error(
          "Mật khẩu mới không được trùng với mật khẩu hiện tại!!"
        );
      } else {
        if (!comparePassword(trimmedCrrPassword, user.salt, user.password)) {
          return resClientData(
            res,
            401,
            null,
            "Mật khẩu hiện tại không đúng.!!"
          );
        } else {
          const { hashedPassword, salt } = hashingPassword(trimmedNewPassword);
          updateFields.password = hashedPassword;
          updateFields.salt = salt;
        }
      }
    }

    const crrAccount = await UserModel.findByIdAndUpdate(
      user._id,
      updateFields,
      {
        new: true,
      }
    );
    if (!crrAccount) throw new Error("User not exist");
    resClientData(res, 200, crrAccount);
  } catch (error) {
    resClientData(res, 403, null, error.message);
  }
};

export const UserInfoUpdateAvt = async (req, res) => {
  try {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary.v2,
      params: {
        folder: "avatar",
        allowed_formats: ["jpg", "jpeg", "png"],
      },
      filename: (_, file, cb) => {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage }).single("data");

    upload(req, res, async (err) => {
      if (err) {
        return resClientData(res, 500, null, err.message);
      }

      const file = req.file;
      if (!file) {
        return resClientData(res, 400, null, "No file uploaded");
      }

      const imageUrl = file.path;
      const user = req.authUser;
      const crrUser = await UserModel.findByIdAndUpdate(
        user._id,
        { avatarUrl: imageUrl },
        { new: true }
      );

      if (!crrUser) {
        return resClientData(res, 404, null, "User not found");
      }

      return resClientData(res, 200, crrUser, "Avatar uploaded successfully!");
    });
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};
