import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: String,
    participants: String,
    reactCounts: Number,
    reactUsers: [String],
    comments: [{}],
    commentUsers: [String],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
