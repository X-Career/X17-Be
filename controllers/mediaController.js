import mediaModel from "../models/media.js";
import { resClientData } from "../utils/index.js";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

export const createMedia = (req, res) => {
  try {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary.v2,
      params: {
        folder: "media",
        allowed_formats: ["jpg", "png", "jpeg"],
      },
      filename: (_, file, cb) => {
        cb(null, file.originalname);
      },
    });
    const mediaUpload = multer({ storage }).single("file");
    mediaUpload(req, res, async (err) => {
      if (err) {
        return resClientData(res, 500, null, err.message);
      }

      const file = req.file;
      if (!file) {
        return resClientData(res, 400, null, "No file uploaded");
      }

      const { albumId } = req.params;
      const title = JSON.parse(req.body.title);
      const mediaUrl = file.path;

      const createMedia = await mediaModel.create({
        albumId: albumId,
        mediaUrl: mediaUrl,
        title: title || "",
      });
      resClientData(res, 200, createMedia, "Success");
    });
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};

export const createMediaInsideMediaDetails = async (req, res) => {
  try {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary.v2,
      params: {
        folder: "media",
        allowed_formats: ["jpg", "png", "jpeg"],
      },
      filename: (_, file, cb) => {
        cb(null, file.originalname);
      },
    });
    const mediaUpload = multer({ storage }).single("file");
    mediaUpload(req, res, async (err) => {
      if (err) {
        return resClientData(res, 500, null, err.message);
      }

      const file = req.file;
      if (!file) {
        return resClientData(res, 400, null, "No file uploaded");
      }

      const { albumId } = req.params;
      const mediaUrl = file.path;

      const createMedia = await mediaModel.create({
        albumId: albumId,
        mediaUrl: mediaUrl,
        title: "",
      });
      resClientData(res, 200, createMedia, "Success");
    });
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    await mediaModel.deleteOne({ _id: id });
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};

export const deleteMediaFromAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    await mediaModel.deleteMany({ albumId: albumId });
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};

export const getMedia = async (req, res) => {
  try {
    const { albumId } = req.params;
    const media = await mediaModel.find({ albumId: albumId });
    if (!media) {
      return resClientData(res, 404, null, "Album not found");
    }
    resClientData(res, 200, media, "Media retrieved successfully");
  } catch (error) {
    resClientData(res, 403, null, error.message);
  }
};
export const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const media = await mediaModel.findByIdAndUpdate(
      id,
      { title: title },
      { new: true }
    );
    resClientData(res, 200, media, "Update media successfully");
  } catch (error) {
    resClientData(res, 403, null, error.message);
  }
};
