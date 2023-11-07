import albumModel from "../models/Album.js";
import { resClientData } from "../utils/index.js";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

export const createAlbum = async (req, res) => {
  try {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary.v2,
      params: {
        folder: "albumAvatar",
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

      const user = req.authUser;
      const imageUrl = file.path;
      const { albumName } = req.body;

      const createAlbum = await albumModel.create({
        userId: user._id,
        owner: user.firstName + " " + user.lastName,
        albumName: albumName,
        coverUrl: imageUrl,
      });
      resClientData(res, 200, createAlbum, "Create album successfully!");
    });
  } catch (error) {
    resClientData(res, 403, null, error.message);
  }
};

export const getAlbum = async (req, res) => {
  try {
    const user = req.authUser;
    const album = await albumModel.find({ userId: user._id });
    if (!album) {
      return resClientData(res, 404, null, "Album not found");
    }
    resClientData(res, 200, album, "Album retrieved successfully");
  } catch (error) {
    resClientData(res, 403, null, error.message);
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    await albumModel.deleteOne({ _id: albumId });
  } catch (error) {
    resClientData(res, 403, null, error.message);
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { albumName } = req.body;
    const updateAlbum = await albumModel.findByIdAndUpdate(
      id,
      { albumName: albumName },
      { new: true }
    );
    resClientData(res, 200, updateAlbum, "Update album successfully!");
  } catch (error) {
    resClientData(res, 403, null, error.message);
  }
};
export const updateAlbumAvatar = (req, res) => {
  try {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary.v2,
      params: {
        folder: "albumAvatar",
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

      const imageUrl = file.path;
      const { id } = req.params;
      const crrAlbum = await albumModel.findByIdAndUpdate(
        id,
        { coverUrl: imageUrl },
        { new: true }
      );

      if (!crrAlbum) {
        return resClientData(res, 404, null, "User not found");
      }

      return resClientData(res, 200, crrAlbum, "Avatar uploaded successfully!");
    });
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};
