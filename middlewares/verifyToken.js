import { decodeToken, resClientData } from "../utils/index.js";
import UserModel from "../models/User.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const verify = decodeToken(token);
    const user = await UserModel.findById(verify.userId);
    if (!user) throw new Error("User not found");
    req.authUser = user;
    return next();
  } catch (error) {
    return resClientData(res, 401, null, error.message);
  }
};
export default authenticate;
