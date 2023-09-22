import { verifyToken, resClientData } from "../utils/index.js";
const middleware = {
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) throw new Error("Invalid authorization");
      const verify = verifyToken(token);
      req.user = {
        ...verify,
        token,
      };
      return next();
    } catch (error) {
      resClientData(res, 402, null, error.message);
    }
  },
};

export default middleware;
