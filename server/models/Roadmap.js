import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    level: {
      type: String,
      enum: [
        "beginner",
        "intermediate",
        "advanced",
      ],
      default: "beginner",
    },

    duration: {
      type: String,
      default: "",
    },

    topics: {
      type: [String],
      default: [],
    },

    resources: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: [
        "draft",
        "published",
      ],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

const Roadmap = mongoose.model(
  "Roadmap",
  roadmapSchema
);

export default Roadmap;