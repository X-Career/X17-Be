import mongoose from "mongoose";
import CombineCollection from "../database/index.js";

const VacationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    participants: {
      type: [String],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (endDate) {
          return endDate >= this.startDate;
        },
        message: "EndDate must be equal to or greater than StartDate",
      },
    },
    milestones: [
      {
        date: {
          type: Date,
          required: true,
          validate: {
            validator: function (date) {
              return date >= this.startDate && date <= this.endDate;
            },
            message:
              "Milestone date must be within the range of StartDate and EndDate.",
          },
        },
        posts: [
          {
            type: mongoose.Types.ObjectId,
            ref: "Post",
          },
        ],
      },
    ],
    description: {
      type: String,
      required: true,
    },
    reactCount: {
      type: Number,
      default: 0,
    },
    reactBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    commentCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Vacation = mongoose.model(CombineCollection.VACATION, VacationSchema);
export default Vacation;
