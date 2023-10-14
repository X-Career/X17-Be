import {
  resClientData,
  hashingPassword,
  generateJwt,
  comparePassword,
  decodeToken,
} from "../utils/index.js";
import UserModel from "../models/User.js";
import refreshTokenModel from "../models/refreshToken.js";
import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET } = process.env;

export const registerUser = async (req, res) => {
  try {
    let { firstName, lastName, username, email, password, gender } = req.body;
    email = email.toLowerCase();
    username = username.toLowerCase();

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return resClientData(res, 400, null, "Username or email already exists");
    }

    const { hashedPassword, salt } = hashingPassword(password);

    const newUser = new UserModel({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      salt,
      gender,
    });
    await newUser.save();
    resClientData(res, 201, newUser, "User registered successfully");
  } catch (error) {
    console.error(error);
    resClientData(res, 500, null, "Internal Server Error");
  }
};

//sign in
export const signinController = async (req, res) => {
  try {
    let { identifier, password } = req.body;
    identifier = identifier.toLowerCase();
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return resClientData(res, 401, null, "Incorrect username or password");
    }

    const isPasswordValid = comparePassword(password, user.salt, user.password);
    if (!isPasswordValid) {
      return resClientData(res, 401, null, "Incorrect username or password");
    }
    const accessToken = generateJwt({ userId: user._id }, "5m");
    const refreshToken = generateJwt({ userId: user._id }, "30d");
    const rfUser = await refreshTokenModel.findOne({ userId: user._id });
    if (!rfUser) {
      const refreshData = {
        userId: user._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };
      await refreshTokenModel.create(refreshData);
    } else {
      rfUser.token = refreshToken;
      await rfUser.save();
    }
    return resClientData(
      res,
      200,
      {
        accessToken,
        refreshToken,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
      "Login successful"
    );
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};
//refresh-token
export const refreshTokenHandle = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decodedRefreshToken = decodeToken(refreshToken, JWT_SECRET);
    const existingRefreshToken = await refreshTokenModel.findOne({
      token: refreshToken,
      userId: decodedRefreshToken.userId,
    });

    if (!existingRefreshToken) {
      return res.status(401).json({ message: "Refresh Token không hợp lệ." });
    }

    // Generate a new access token
    const newAccessToken = generateJwt(
      { userId: decodedRefreshToken.userId },
      "5m"
    );
    const newRefreshToken = generateJwt(
      { userId: decodedRefreshToken.userId },
      "30d"
    );
    existingRefreshToken.token = newRefreshToken;
    existingRefreshToken.expiresAt = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    );
    await existingRefreshToken.save();

    resClientData(
      res,
      200,
      { token: newAccessToken, RT: newRefreshToken },
      "Refresh thành công"
    );
  } catch (error) {
    resClientData(res, 400, null, error.message);
  }
};
