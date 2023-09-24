import { resClientData, decodeToken, hashingPassword } from "../utils/index.js";
import UserModel from "../models/User.js";
import { schemaUpdateUserInfo } from "../validators/index.js";
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
    const { firstName, lastName, username, password, gender } = req.body;

    const updateFields = {
      firstName,
      lastName,
      username,
      password,
      gender,
    };

    const crrAccount = await UserModel.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });
    if (!crrAccount) throw new Error("User not exist");

    // hash password trước khi lưu
    if (password) {
      const { hashedPassword, salt } = hashingPassword(password);
      crrAccount.password = hashedPassword;
      crrAccount.salt = salt;
    }

    await crrAccount.save();
    resClientData(res, 200, crrAccount);
  } catch (error) {
    resClientData(res, 403, null, error.message);
  }
};
