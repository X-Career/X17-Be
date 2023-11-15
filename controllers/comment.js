import express from "express";
import { resClientData } from "../utils/index.js";
import Comment from "../models/Comment.js";
import vacationModel from "../models/Vacation.js";
export const createComment = async (req, res) => {
  try {
    const { vacationId } = req.params;
    console.log(vacationId);
    const { content } = req.body;
    const host = req.authUser;
    console.log(host._id);
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

    console.log(existingVacation.views);
    if (commentList.length > 0) {
      resClientData(res, 200, commentList, "Get comment success");
    } else {
      resClientData(res, 200, {}, "Empty comment");
    }
  } catch (error) {
    resClientData(res, 400, {}, error.message);
  }
};
