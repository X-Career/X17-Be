import { resClientData } from "../utils/index.js";
import Post from "../models/Post.js";
import milestoneModel from "../models/Milestone.js";

// Create post
export const createPost = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const { content, images } = req.body;

    const milestone = await milestoneModel.findById(milestoneId);

    if (!milestone) {
      return resClientData(res, 400, null, "Milestone not found!");
    }

    const newPost = new Post({
      milestone: milestoneId,
      content: content,
      images: images,
    });

    await newPost.save();

    return resClientData(res, 200, newPost, "Post has been created!");
  } catch (error) {
    return resClientData(res, 401, null, error.message);
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, images } = req.body;

    if (!postId) {
      return resClientData(res, 400, null, "Post not found!");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { content: content, images: images },
      { new: true }
    );

    if (!updatedPost)
      return resClientData(res, 400, null, "Something went wrong!");

    return resClientData(res, 200, updatedPost, "Success!");
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
    const posts = await Post.find();

    return resClientData(res, 200, posts, "Success!");
  } catch (error) {
    return resClientData(res, 401, null, error.message);
  }
};

// Get one post
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
