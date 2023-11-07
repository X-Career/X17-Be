import milestoneModel from "../models/Milestone.js";
import { resClientData } from "../utils/index.js";
//get Milestons
export const getMilestoneInfo = async (req, res) => {
  try {
    const vacationId = req.params.vacationId;
    const listMS = await milestoneModel.find({ vacation: vacationId });
    listMS.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    if (listMS.length === 0) {
      resClientData(res, 404, null, "Milestones not found");
    } else {
      resClientData(res, 201, listMS, "success");
    }
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};
