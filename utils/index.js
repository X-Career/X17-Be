import jwt from "jsonwebtoken";
const resClientData = (res, status, data, message) => {
  res.status(status).send({
    data: data ? data : null,
    message: data
      ? message
        ? message
        : "thanh cong"
      : message
      ? message
      : "that bai",
    success: data ? true : false,
  });
};
const KEY = "123abcs";
const genToken = (data) => {
  const token = jwt.sign(data, KEY, { expiresIn: 2500 });
  return token;
};
const verifyToken = (data) => {
  const decoded = jwt.verify(data, KEY);
  return decoded;
};
export { resClientData, genToken, verifyToken };
