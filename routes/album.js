import { Router } from "express";
import authenticate from "../middlewares/verifyToken.js";
import {
  createAlbum,
  getAlbum,
  deleteAlbum,
  updateAlbum,
  updateAlbumAvatar,
  getAllAlbums,
} from "../controllers/albumController.js";

const albumRouter = Router();

albumRouter.post("/createAlbum", authenticate, createAlbum);
albumRouter.get("/getAlbum", authenticate, getAlbum);
albumRouter.get("/get-albums", getAllAlbums);
albumRouter.post("/deleteAlbum/:albumId", authenticate, deleteAlbum);
albumRouter.put("/updateAlbum/:id", authenticate, updateAlbum);
albumRouter.post("/updateAlbumAvatar/:id", authenticate, updateAlbumAvatar);

export default albumRouter;
