import {
  resClientData,
  hashingPassword,
  generateJwt,
  comparePassword,
  decodeToken,
} from "../utils/index.js";
import UserModel from "../models/User.js";
export const getUserData = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token);
};
