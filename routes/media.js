import { Router } from "express";
import authenticate from "../middlewares/verifyToken.js";
import checkHost from "../middlewares/checkHost.js";
import {
  createMedia,
  createMediaInsideMediaDetails,
  deleteMedia,
  deleteMediaFromAlbum,
  getMedia,
  updateMedia,
} from "../controllers/mediaController.js";

const mediaRouter = Router();

mediaRouter.post("/createMedia/:albumId", authenticate, createMedia);
mediaRouter.post(
  "/createMediaInsideMediaDetails/:albumId",
  authenticate,
  createMediaInsideMediaDetails
);
mediaRouter.post("/deleteMedia/:id", authenticate, deleteMedia);
mediaRouter.post(
  "/deleteMediaFromAlbum/:albumId",
  authenticate,
  deleteMediaFromAlbum
);
mediaRouter.get("/getMedia/:albumId", authenticate, getMedia);
mediaRouter.get("/getMediaEdit/:albumId", authenticate, checkHost, getMedia);
mediaRouter.put("/updateMedia/:id", authenticate, updateMedia);

export default mediaRouter;
