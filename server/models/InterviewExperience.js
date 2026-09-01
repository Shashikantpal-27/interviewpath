import mongoose from "mongoose";

const interviewExperienceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      required: true,
    },

    interviewDate: {
      type: Date,
    },

    difficulty: {
      type: String,
      enum: [
        "easy",
        "medium",
        "hard",
      ],
      default: "medium",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
      ],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const InterviewExperience =
  mongoose.model(
    "InterviewExperience",
    interviewExperienceSchema
  );

export default InterviewExperience;