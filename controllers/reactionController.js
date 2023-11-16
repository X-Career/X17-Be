import Reaction from "../models/Reaction.js";
import { resClientData } from "../utils/index.js";
export const addLikeToVacation = async (req, res) => {
  const { vacationId } = req.params;
  const userId = req.authUser._id;
  try {
    const existingReaction = await Reaction.findOne({
      user: userId,
      vacationId: vacationId,
    });

    if (existingReaction) {
      await Reaction.findByIdAndDelete(existingReaction._id);
      resClientData(res, 200, {}, "Đã bỏ thích bài đăng");
    } else {
      const newReaction = new Reaction({
        user: userId,
        vacationId: vacationId,
      });

      await newReaction.save();

      resClientData(res, 200, {}, "Đã thích bài đăng");
    }
  } catch (error) {
    console.error("Lỗi khi xử lý phản ứng:", error);
    resClientData(res, 500, {}, error.message);
  }
};
export const checkIfUserLikedVacation = async (req, res) => {
  const { vacationId } = req.params;
  const userId = req.authUser._id;
  try {
    const existingReaction = await Reaction.findOne({
      user: userId,
      vacationId: vacationId,
    });
    const totalReactions = await Reaction.find({ vacationId: vacationId });
    let like = false;

    if (existingReaction) {
      like = true;
    }

    const resData = {
      like: like,
      total: totalReactions.length,
    };

    resClientData(res, 201, resData, "success");
  } catch (error) {
    console.error("Lỗi khi kiểm tra phản ứng:", error);
    resClientData(res, 500, [], error.message);
  }
};
