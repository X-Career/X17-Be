import express from "express";
import { schemaCreateVaction } from "../validators/index.js";
import authenticate from "../middlewares/verifyToken.js";
const vacationRouter = express.Router();

import {
  createVacation,
  updateVacation,
  getVacation,
  updateCoverVacation,
  addTripmate,
  removeTripmate,
} from "../controllers/Vacation.js";
vacationRouter.post("/createVacation", authenticate, createVacation);
vacationRouter.get("/getVacation/:vacationId", authenticate, getVacation);
vacationRouter.put("/updateVacation/:vacationId", authenticate, updateVacation);
vacationRouter.post(
  "/updateCover/:vacationId",
  authenticate,
  updateCoverVacation
);
vacationRouter.post("/addTripmates/:vacationId", authenticate, addTripmate);
vacationRouter.post(
  "/removeTripmates/:vacationId",
  authenticate,
  removeTripmate
);
export default vacationRouter;
