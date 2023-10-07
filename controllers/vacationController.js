import vacationModel from "../models/Vacation.js";
import milestoneModel from "../models/Milestone.js";
import { parseDate } from "../utils/index.js";

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
      milestones: [],
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
      newVacation.milestones.push(newMilestone._id);
    }

    // Lưu vacation vào cơ sở dữ liệu
    await newVacation.save();

    return resClientData(res, 200, newVacation, "Create Vacation Success");
  } catch (error) {
    return resClientData(res, 401, null, error.message);
  }
};

//get Vacation
export const getVacationWithMilestones = async (req, res) => {
  try {
    const vacationId = req.body;
    const vacation = await vacationModel
      .findOne({
        _id: vacationId.vacationId,
      })
      .populate("milestones");
    if (!vacation) {
      return res.status(404).json({ message: "Vacation not found" });
    }

    resClientData(res, 201, vacation, "success");
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
