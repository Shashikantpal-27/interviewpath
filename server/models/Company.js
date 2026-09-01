import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    logo: { type: String, default: "" },
    description: { type: String, required: true },
    overview: { type: String, default: "" },
    industry: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    popularRoles: { type: [String], default: [] },
    interviewRounds: {
      type: [
        {
          name: String,
          description: String,
        },
      ],
      default: [],
    },
    topics: {
      DSA: { type: [String], default: [] },
      DBMS: { type: [String], default: [] },
      OS: { type: [String], default: [] },
      OOP: { type: [String], default: [] },
      "System Design": { type: [String], default: [] },
    },
    behavioralQuestions: { type: [String], default: [] },
    codingQuestionsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;