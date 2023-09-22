import userModel from "../models/User.js";
import { resClientData } from "../utils/index.js";
const userController = {
  update: async (req, res) => {
    try {
      const user = req.user;
      const { username, firstName, lastName } = req.body;
      if (!(username, firstName, lastName))
        throw new Error("cần phải truyền username, firstName, lastName");
      const crrAccount = await userModel.findById(user._id);
      if (!crrAccount) throw new Error("khong ton tai nguoi dung");
      crrAccount = { username, firstName, lastName };
      await crrAccount.save();
      resClientData(res, 200, {});
    } catch (error) {
      resClientData(res, 403, null, error.message);
    }
  },
};

export default userController;
