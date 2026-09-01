import mongoose from "mongoose";

const interviewQuestionSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      default: "",
    },

    interviewType: {
      type: String,
      default: "Technical",
    },

    questionType: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      default: "Medium",
    },

    experienceLevel: {
      type: String,
      default: "Fresher",
    },

    focusAreas: {
      type: [String],
      default: [],
    },

    question: {
      type: String,
      required: true,
    },

    options: {
      type: [String],
      default: [],
    },

    // Stored only on backend
    correctAnswer: {
      type: String,
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60,
    },
  }
);

const InterviewQuestion = mongoose.model(
  "InterviewQuestion",
  interviewQuestionSchema
);

export default InterviewQuestion;