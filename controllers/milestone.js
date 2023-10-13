import milestoneModel from "../models/Milestone.js";
import { resClientData } from "../utils/index.js";
//get Milestons
export const getMilestoneInfo = async (req, res) => {
  try {
    const vacationId = req.params.vacationId;

    const listMS = await milestoneModel.find({ vacation: vacationId });
    if (!listMS) {
      resClientData(res, 404, null, "Milestons not found");
    }
    resClientData(res, 201, listMS, "success");
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};
