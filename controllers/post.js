import { resClientData } from "../utils/index.js";
import Post from "../models/Post.js";
import milestoneModel from "../models/Milestone.js";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "avatar",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }).single("data");
// Create post
export const createPost = async (req, res) => {
  try {
    const { milestoneId } = req.params;

    upload(req, res, async (err) => {
      if (err) {
        return resClientData(res, 500, null, err.message);
      }
      const file = req.file;
      if (!file) {
        return resClientData(res, 400, null, "No file uploaded");
      }
      const imageUrl = file.path;
      const content = req.body.content;
      const milestone = await milestoneModel.findById(milestoneId);
      if (!milestone) {
        return resClientData(res, 400, null, "Milestone not found!");
      }
      const newPost = new Post({
        milestone: milestoneId,
        content: content,
        images: imageUrl,
      });
      await newPost.save();
      return resClientData(res, 200, newPost, "Post has been created!");
    });
  } catch (error) {
    // Xử lý lỗi nếu cần
    return resClientData(res, 401, null, error.message);
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    upload(req, res, async (err) => {
      if (err) {
        return resClientData(res, 500, null, err.message);
      }
      const file = req.file;
      if (!file) {
        const content = req.body.content;
        const milestone = await Post.findById(postId);
        if (!milestone) {
          return resClientData(res, 400, null, "Post not found!");
        }
        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { content: content },
          { new: true }
        );
        if (!updatedPost) {
          return resClientData(res, 400, null, "Something went wrong!");
        }
        return resClientData(res, 200, updatedPost, "Success!");
      } else {
        const imageUrl = file.path;
        const content = req.body.content;
        const milestone = await Post.findById(postId);
        if (!milestone) {
          return resClientData(res, 400, null, "Post not found!");
        }
        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { content: content, images: imageUrl },
          { new: true }
        );
        if (!updatedPost) {
          return resClientData(res, 400, null, "Something went wrong!");
        }
        return resClientData(res, 200, updatedPost, "Success!");
      }
    });
  } catch (error) {
    return resClientData(res, 401, null, error.message);
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) return resClientData(res, 400, null, "Post not found!");

    // const post = await Post.findById(postId);
    // if (!post) return resClientData(res, 400, null, "Post not found!");

    const deletedPost = await Post.findByIdAndRemove(postId);
    if (!deletedPost)
      return resClientData(res, 400, null, "Something went wrong");

    return resClientData(res, 200, deletedPost, "Post has been deleted!");
  } catch (error) {
    return resClientData(res, 401, null, error.message);
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const posts = await Post.find({ milestone: milestoneId });
    return resClientData(res, 200, posts, "Success!");
  } catch (error) {
    return resClientData(res, 401, null, error.message);
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return resClientData(res, 400, null, "Post not found!");

    return resClientData(res, 200, post, "Success!");
  } catch (error) {
    return resClientData(res, 401, null, error.message);
  }
};
