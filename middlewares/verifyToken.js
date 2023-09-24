import UserModel from "../models/User.js";
import { decodeToken, resClientData } from "../utils/index.js";
const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header của yêu cầu
    const token = req.header("Authorization").replace("Bearer ", "");
    const verify = decodeToken(token);
    req.authUser = verify;
    return next();
  } catch (error) {
    // return res.status(401).send({
    //   data: null,
    //   success: false,
    //   message: "Unauthorized",
    // });
    return resClientData(res, 401, null, "Unauthorized");
  }
};
export default authenticate;
