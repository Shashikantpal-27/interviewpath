import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    language: { type: String, required: true },
    code: { type: String, required: true },
    mode: { type: String, enum: ["run", "submit"], default: "submit" },
    passed: { type: Boolean, default: false },
    output: { type: String, default: "" },
    testResults: {
      passed: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;