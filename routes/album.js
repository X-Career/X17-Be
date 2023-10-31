import { Router } from "express";
import authenticate from "../middlewares/verifyToken.js";
import {
  createAlbum,
  getAlbum,
  deleteAlbum,
  updateAlbum,
  updateAlbumAvatar,
} from "../controllers/albumController.js";

const albumRouter = Router();

albumRouter.post("/createAlbum", authenticate, createAlbum);
albumRouter.get("/getAlbum", authenticate, getAlbum);
albumRouter.post("/deleteAlbum/:albumId", authenticate, deleteAlbum);
albumRouter.put("/updateAlbum/:id", authenticate, updateAlbum);
albumRouter.post("/updateAlbumAvatar", authenticate, updateAlbumAvatar);

export default albumRouter;
