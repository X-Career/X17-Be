import * as yup from "yup";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const resClientData = (res, statusCode, data, message) => {
  res.status(statusCode).send({
    data: data ? data : null,
    message: message ? message : data ? "Complete" : "Failed",
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
  const token = jwt.sign(data, "SECRET_CODE", {
    expiresIn: expiresIn || "1d", 
  });
  return token;
};


const decodeToken = (token) => {
  const verifyToken = jwt.verify(token, "SECRET_CODE");
  return verifyToken;
};

export {
  resClientData,
  hashingPassword,
  comparePassword,
  generateJwt,
  decodeToken,
};
