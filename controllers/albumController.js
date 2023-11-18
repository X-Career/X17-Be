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

// get home albums
export const getHomeAlbums = async (req, res) => {
  try {
    let page = parseInt(req.params.page) || 1;
    let pageSize = parseInt(req.params.pageSize) || 6;
    page = Math.max(1, page);
    pageSize = Math.max(1, Math.min(10, pageSize));

    const totalVacations = await albumModel.countDocuments();
    const totalPages = Math.ceil(totalVacations / pageSize);

    if (page > totalPages) {
      return res.status(404).json({ message: "No data available" });
    }

    const skip = (page - 1) * pageSize;

    const albums = await albumModel
      .find({ privacy: "public" })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("userId");

    // Thêm thông tin về trang vào Header Response
    res.header("X-Total-Pages", totalPages);

    resClientData(res, 200, albums, "Success!");
  } catch (error) {
    return resClientData(res, 500, null, error.message);
  }
};

// get other user's albums
export const getOtherUserAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await albumModel.find({ userId: id });
    if (!album) {
      return resClientData(res, 404, null, "Album not found");
    }
    resClientData(res, 200, album, "Album retrieved successfully");
  } catch (error) {
    resClientData(res, 403, null, error.message);
  }
};

// Get all albums
export const getAllAlbums = async (req, res) => {
  try {
    const albums = await albumModel
      .find({ privacy: "public" })
      .sort({ createdAt: -1 })
      .populate("userId");

    resClientData(res, 200, albums, "Success!");
  } catch (error) {
    return resClientData(res, 500, null, error.message);
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
    const { albumName, privacy } = req.body;
    const updateAlbum = await albumModel.findByIdAndUpdate(
      id,
      { albumName: albumName, privacy: privacy },
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
