import * as yup from "yup";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { promisify } from "util";

dotenv.config();

const { JWT_SECRET } = process.env;
const resClientData = (res, statusCode, data, message) => {
  res.status(statusCode).send({
    data: data ? data : null,
    message: data
      ? message
        ? message
        : "success"
      : message
      ? message
      : "failed",
    success: data ? true : false,
  });
};

const hashingPassword = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return {
    hashedPassword,
    salt,
  };
};

const comparePassword = (password, salt, hashedPassword) => {
  const hashingPasswordReq = bcrypt.hashSync(password, salt);
  return hashedPassword === hashingPasswordReq;
};

const generateJwt = (data, expiresIn) => {
  const token = jwt.sign(data, JWT_SECRET, {
    expiresIn: expiresIn || "1d",
  });
  return token;
};

const decodeToken = (token) => {
  const verifyToken = jwt.verify(token, JWT_SECRET);
  return verifyToken;
};

const asyncHandleController = (controllerFunc) => {
  return async (req, res, next) => {
    try {
      controllerFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export {
  resClientData,
  hashingPassword,
  comparePassword,
  generateJwt,
  decodeToken,
  asyncHandleController,
};
