import UserModel from "../models/User.js";
import { decodeToken, resClientData } from "../utils/index.js";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header của yêu cầu
    const token = req.header("Authorization").replace("Bearer ", "");

    // Xác thực token
    const decodedToken = decodeToken(
      token.replace("Bearer ", ""),
      "SECRET_CODE"
    );
    req.user = decodedToken;

    // Kiểm tra xem AT có hết hạn chưa
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();

    if (isTokenExpired) {
      resClientData(res, 401, null, "Token hết hạn");
    }
    next();
  } catch (error) {
    return res.status(401).send({
      data: null,
      success: false,
      message: "Unauthorized",
    });
  }
};
