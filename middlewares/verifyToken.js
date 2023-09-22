import UserModel from "../models/User.js";
import { decodeToken } from "../utils/index.js";
// import jwt from "jsonwebtoken";
export const authenticate = async (req, res, next) => {
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
      // AT đã hết hạn, cần làm mới bằng RT
      const refreshToken = req.header("Refresh-Token"); // Lấy RT từ header

      if (refreshToken) {
        // Làm mới AT bằng RT và gắn vào header
        const newAccessToken = generateJwt(
          { userId: decodedToken.userId },
          "2h"
        ); // Thay '2h' bằng thời gian sống AT mới

        res.header("Authorization", `Bearer ${newAccessToken}`);
      }
    }

    // Tìm người dùng trong cơ sở dữ liệu dựa vào id từ token
    const user = await UserModel.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).send({
        data: null,
        success: false,
        message: "Unauthorized",
      });
    }

    // Lưu thông tin người dùng vào yêu cầu để sử dụng trong controller
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({
      data: null,
      success: false,
      message: "Unauthorized",
    });
  }
};
