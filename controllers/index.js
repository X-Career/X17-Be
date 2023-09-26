import { resClientData, decodeToken, hashingPassword } from "../utils/index.js";
import UserModel from "../models/User.js";
import cloudinary from "cloudinary";
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
    const { userId } = req.authUser;
    const { firstName, lastName, username, password, gender, bio } = req.body;

    const updateFields = {
      firstName,
      lastName,
      username,
      gender,
      bio,
    };

    if (password) {
      const { hashedPassword, salt } = hashingPassword(password);
      updateFields.password = hashedPassword;
      updateFields.salt = salt;
    }
    const crrAccount = await UserModel.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });
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
        folder: "avatar", // Thư mục trên Cloudinary để lưu trữ ảnh (tuỳ chọn)
        allowed_formats: ["jpg", "jpeg", "png"], // Các định dạng cho phép (tuỳ chọn)
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
      const { userId } = req.authUser;
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { avatarUrl: imageUrl },
        { new: true }
      );

      if (!user) {
        return resClientData(res, 404, null, "User not found");
      }

      return resClientData(res, 200, user, "Avatar uploaded successfully!");
    });
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};
