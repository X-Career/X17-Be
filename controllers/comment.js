import express from "express";
import { resClientData } from "../utils/index.js";
import Comment from "../models/Comment.js";
import vacationModel from "../models/Vacation.js";
export const createComment = async (req, res) => {
  try {
    const { vacationId } = req.params;
    const { content } = req.body;
    const host = req.authUser;
    const existingVacation = await vacationModel.findById(vacationId);
    if (!existingVacation) {
      resClientData(res, 400, {}, "Vacation not found!");
    }
    const newComment = new Comment({
      user: host._id,
      vacationId: vacationId,
      content: content,
    });
    await newComment.save();
    resClientData(res, 200, newComment, "create comment completed!!");
  } catch (error) {
    resClientData(res, 500, {}, error.message);
  }
};

export const getComment = async (req, res) => {
  try {
    const { vacationId } = req.params;
    const commentList = await Comment.find({ vacationId: vacationId })
      .populate("user")
      .sort({ createdAt: -1 });
    const existingVacation = await vacationModel.findById(vacationId);
    if (existingVacation) {
      existingVacation.views = existingVacation.views + 1;
      await existingVacation.save();
    }
    if (commentList.length > 0) {
      resClientData(res, 200, commentList, "Get comment success");
    } else {
      resClientData(res, 200, {}, "Empty comment");
    }
  } catch (error) {
    resClientData(res, 400, {}, error.message);
  }
};
export const deleteComment = async (req, res) => {
  try {
    const { cmtId } = req.params;
    const deletedCmt = await Comment.findByIdAndRemove(cmtId);
    if (!deletedCmt)
      return resClientData(res, 400, null, "Something went wrong");

    return resClientData(res, 200, deleteComment, "Comment has been deleted!");
  } catch (error) {
    resClientData(res, 400, {}, error.message);
  }
};
