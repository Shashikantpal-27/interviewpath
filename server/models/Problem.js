import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    topic: { type: String, required: true },
    companyTags: { type: [String], default: [] },
    description: { type: String, required: true },
    examples: {
      type: [
        {
          input: String,
          output: String,
          explanation: String,
        },
      ],
      default: [],
    },
    constraints: { type: [String], default: [] },
    hints: { type: [String], default: [] },
    // Hidden from API responses to clients - used for judging Run/Submit
    testCases: {
      type: [
        {
          input: String,
          expectedOutput: String,
          isSample: { type: Boolean, default: false },
        },
      ],
      default: [],
      select: false,
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;