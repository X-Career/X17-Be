import { resClientData } from "../utils/index.js";
import mediaModel from "../models/media.js";

const checkHost = async (req, res, next) => {
  try {
    const user = req.authUser;
    const { albumId } = req.params;
    const crrMedia = await mediaModel.findOne({ albumId: albumId });
    if (!user._id.equals(crrMedia.userId)) {
      throw new Error("Bạn không có quyền truy cập đường link này!!");
    } else {
      return next();
    }
  } catch (error) {
    return resClientData(res, 403, null, error.message);
  }
};

export default checkHost;
