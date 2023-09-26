import UserModel from "../models/User.js";
import { decodeToken, resClientData } from "../utils/index.js";
const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const verify = decodeToken(token);
    req.authUser = verify;
    return next();
  } catch (error) {
    return resClientData(res, 401, null, error.message);
  }
};
export default authenticate;
