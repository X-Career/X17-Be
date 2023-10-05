import {
  resClientData,
  decodeToken,
  hashingPassword,
  comparePassword,
  parseDate,
} from "../utils/index.js";
import UserModel from "../models/User.js";
import vacationModel from "../models/Vacation.js";
import milestoneModel from "../models/Milestone.js";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET } = process.env;
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
      throw new Error("New password cannot be empty.");
    } else if (trimmedCrrPassword === "" && trimmedNewPassword !== "") {
      throw new Error("Current password cannot be empty.");
    } else if (trimmedCrrPassword !== "" && trimmedNewPassword !== "") {
      if (trimmedCrrPassword === trimmedNewPassword) {
        throw new Error(
          "The new password cannot be the same as the current password."
        );
      } else {
        if (!comparePassword(trimmedCrrPassword, user.salt, user.password)) {
          return resClientData(res, 401, null, "Password is not correct");
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

      // Nếu upload thành công, thông tin ảnh sẽ được lưu trong req.file
      const file = req.file;

      if (!file) {
        return resClientData(res, 400, null, "No file uploaded");
      }

      // Lấy URL của ảnh trên Cloudinary sau khi upload thành công
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
//create Vacation
export const createVacation = async (req, res) => {
  try {
    const {
      location,
      title,
      description,
      participants,
      startDay,
      endDay,
      privacy,
    } = req.body;
    const host = req.authUser;
    const startDay1 = parseDate(startDay);
    const endDay1 = parseDate(endDay);
    const newVacation = new vacationModel({
      location,
      host: host._id,
      title,
      description,
      participants,
      startDay: startDay1,
      endDay: endDay1,
      privacy,
      milestones: [],
    });
    const numberOfDays = Math.ceil(
      (endDay1.getTime() - startDay1.getTime()) / (1000 * 60 * 60 * 24)
    );
    for (let i = 0; i <= numberOfDays; i++) {
      const milestoneDate = new Date(startDay1);
      milestoneDate.setDate(startDay1.getDate() + i);

      const newMilestone = new milestoneModel({
        vacation: newVacation._id,
        date: milestoneDate,
        posts: [],
        title: "",
      });

      await newMilestone.save();
      newVacation.milestones.push(newMilestone._id);
    }

    // Lưu vacation vào cơ sở dữ liệu
    await newVacation.save();

    return resClientData(res, 200, newVacation, "Create Vacation Success");
  } catch (error) {
    return resClientData(res, 401, null, error.message);
  }
};
//get Vacation
export const getVacationWithMilestones = async (req, res) => {
  try {
    const vacationId = req.body;
    const vacation = await vacationModel
      .findOne({
        _id: vacationId.vacationId,
      })
      .populate("milestones");
    if (!vacation) {
      return res.status(404).json({ message: "Vacation not found" });
    }

    resClientData(res, 201, vacation, "success");
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
