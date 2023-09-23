import {
  resClientData,
  hashingPassword,
  generateJwt,
  comparePassword,
  decodeToken,
} from "../utils/index.js";
import UserModel from "../models/User.js";
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
