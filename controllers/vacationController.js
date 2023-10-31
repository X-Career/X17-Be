import vacationModel from "../models/Vacation.js";
import milestoneModel from "../models/Milestone.js";
import { resClientData, parseDate } from "../utils/index.js";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
//create Vacation
export const createVacation = async (req, res) => {
  try {
    const {
      location,
      title,
      description,
      participants,
      startDay,
      endDay,
      privacy,
    } = req.body;
    const host = req.authUser;
    const startDay1 = parseDate(startDay);
    const endDay1 = parseDate(endDay);
    const newVacation = new vacationModel({
      location,
      host: host._id,
      title,
      description,
      participants,
      startDay: startDay1,
      endDay: endDay1,
      privacy,
    });
    const numberOfDays = Math.ceil(
      (endDay1.getTime() - startDay1.getTime()) / (1000 * 60 * 60 * 24)
    );
    for (let i = 0; i <= numberOfDays; i++) {
      const milestoneDate = new Date(startDay1);
      milestoneDate.setDate(startDay1.getDate() + i);

      const newMilestone = new milestoneModel({
        vacation: newVacation._id,
        date: milestoneDate,
        posts: [],
        title: "",
      });

      await newMilestone.save();
    }

    // Lưu vacation vào cơ sở dữ liệu
    await newVacation.save();

    return resClientData(res, 200, newVacation, "Create Vacation Success");
  } catch (error) {
    return resClientData(res, 401, null, error.message);
  }
};
//get Vacation
export const getVacation = async (req, res) => {
  try {
    const vacationId = req.params;
    const vacation = await vacationModel.findOne({
      _id: vacationId.vacationId,
    });
    if (!vacation) {
      return resClientData(res, 404, null, "Vacation not found");
    }

    resClientData(res, 201, vacation, "success");
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};
//update Vacation
export const updateVacation = async (req, res) => {
  try {
    const vacationId = req.params.vacationId;
    const { startDay, endDay, ...otherFields } = req.body;
    const existingVacation = await vacationModel.findOne({
      _id: vacationId,
    });

    if (!existingVacation) {
      return resClientData(res, 404, null, "Vacation not found");
    }
    for (const key in otherFields) {
      if (otherFields.hasOwnProperty(key)) {
        existingVacation[key] = otherFields[key];
      }
    }

    await existingVacation.save();
    if (startDay && endDay) {
      const newStartDay = parseDate(startDay);
      const newEndDay = parseDate(endDay);
      const existingMilestone = await milestoneModel.find({
        vacation: existingVacation._id,
      });
      let existingMilestones = existingMilestone;
      await milestoneModel.deleteMany({
        vacation: existingVacation._id,
      });
      const numberOfDays = Math.ceil(
        (newEndDay.getTime() - newStartDay.getTime()) / (1000 * 60 * 60 * 24)
      );
      let newMilestones = [];
      for (let i = 0; i <= numberOfDays; i++) {
        const milestoneDate = new Date(newStartDay);
        milestoneDate.setDate(newStartDay.getDate() + i);
        const existingMilestone = existingMilestones.find((milestone) => {
          return milestone.date.toISOString() === milestoneDate.toISOString();
        });
        if (existingMilestone) {
          milestoneModel.insertMany(existingMilestone);
          newMilestones.push(existingMilestone);
        } else {
          const newMilestone = new milestoneModel({
            vacation: existingVacation._id,
            date: milestoneDate,
            posts: [],
            title: "",
          });
          await newMilestone.save();
          newMilestones.push(newMilestone);
        }
      }
      existingVacation.startDay = newStartDay;
      existingVacation.endDay = newEndDay;
      await existingVacation.save();
    }

    return resClientData(res, 200, existingVacation, "Update Vacation Success");
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};
//upload ảnh bìa
export const updateCoverVacation = async (req, res) => {
  try {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary.v2,
      params: {
        folder: "avatar",
        allowed_formats: ["jpg", "jpeg", "png"],
      },
      filename: (_, file, cb) => {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage }).single("data");

    upload(req, res, async (err) => {
      if (err) {
        return resClientData(res, 500, null, err.message);
      }
      const file = req.file;
      if (!file) {
        return resClientData(res, 400, null, "No file uploaded");
      }

      // Lấy URL của ảnh trên Cloudinary sau khi upload thành công
      const imageUrl = file.path;
      const vacationid = req.params.vacationId;
      const existingVacation = await vacationModel.findByIdAndUpdate(
        vacationid,
        { avatarUrl: imageUrl },
        { new: true }
      );
      if (!existingVacation) {
        return resClientData(res, 404, null, "Vacation not found");
      }

      return resClientData(
        res,
        200,
        existingVacation,
        "CoverImg uploaded successfully!"
      );
    });
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};
