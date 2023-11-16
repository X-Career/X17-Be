import express from "express";
import authenticate from "../middlewares/verifyToken.js";
const vacationRouter = express.Router();

import {
  createVacation,
  updateVacation,
  getVacation,
  updateCoverVacation,
  addTripmate,
  removeTripmate,
  getHomeVacations,
  getAllVacations,
  getProfileVacations,
} from "../controllers/vacationController.js";

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
vacationRouter.get("/getVacations/:page/:pageSize", getHomeVacations);
vacationRouter.get("/get-vacations", getAllVacations);
vacationRouter.get(
  "/getProfileVacations/:page/:pageSize/:hostId",
  authenticate,
  getProfileVacations
);

export default vacationRouter;
