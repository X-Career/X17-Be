import express from "express";
import { schemaCreateVacation } from "../validators/index.js";
import validate from "../middlewares/validate.js";
import authenticate from "../middlewares/verifyToken.js";
const vacationRouter = express.Router();

import {
  createVacation,
  updateVacation,
  getVacation,
  updateCoverVacation,
} from "../controllers/vacationController.js";
vacationRouter.post(
  "/createVacation",
  authenticate,
  validate(schemaCreateVacation),
  createVacation
);
vacationRouter.get("/getVacation/:vacationId", authenticate, getVacation);
vacationRouter.put("/updateVacation/:vacationId", authenticate, updateVacation);
vacationRouter.post(
  "/updateCover/:vacationId",
  authenticate,
  updateCoverVacation
);
export default vacationRouter;
