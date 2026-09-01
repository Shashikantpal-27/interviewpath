import mongoose from "mongoose";

const studyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    hoursPerDay: {
      type: Number,
      required: true,
    },

    plan: {
      type: [
        {
          day: Number,

          topics: {
            type: [String],
            default: [],
          },

          tasks: {
            type: [String],
            default: [],
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const StudyPlan = mongoose.model(
  "StudyPlan",
  studyPlanSchema
);

export default StudyPlan;