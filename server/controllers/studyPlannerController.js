import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
import StudyPlan from "../models/StudyPlan.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateStudyPlan = async (req, res) => {
  try {
    // =========================
    // AUTH CHECK
    // =========================
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login again.",
      });
    }

    const {
      topic,
      days,
      hoursPerDay,
    } = req.body;

    // =========================
    // VALIDATION
    // =========================
    if (!topic || !days || !hoursPerDay) {
      return res.status(400).json({
        success: false,
        message:
          "Topic, number of days, and hours per day are required.",
      });
    }

    // =========================
    // GEMINI PROMPT
    // =========================
    const prompt = `
You are an expert study planner.

Create a detailed and practical study plan.

Topic:
${topic}

Number of days:
${days}

Study hours per day:
${hoursPerDay}

Create a realistic day-by-day plan.

Return ONLY valid JSON in this exact format:

{
  "plan": [
    {
      "day": 1,
      "topics": [
        "Topic 1",
        "Topic 2"
      ],
      "tasks": [
        "Task 1",
        "Task 2"
      ]
    }
  ]
}

Important:
- Generate exactly ${days} days.
- Keep the daily workload realistic for ${hoursPerDay} hours per day.
- Balance learning, practice, and revision.
`;

    // =========================
    // GEMINI
    // =========================
    const response =
      await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

    let resultText = response.text || "";

    resultText = resultText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(resultText);

    if (!result.plan || !Array.isArray(result.plan)) {
      return res.status(500).json({
        success: false,
        message: "AI returned an invalid study plan.",
      });
    }

    // =========================
    // SAVE TO MONGODB
    // =========================
    const savedPlan = await StudyPlan.create({
      userId: req.user.id,
      topic,
      days: Number(days),
      hoursPerDay: Number(hoursPerDay),
      plan: result.plan,
    });

    console.log(
      "Study plan saved:",
      savedPlan._id.toString()
    );

    // =========================
    // RESPONSE
    // =========================
    return res.status(200).json({
      success: true,
      message: "Study plan generated successfully",
      planId: savedPlan._id,
      plan: savedPlan.plan,
    });
  } catch (error) {
    console.error("Study planner error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message:
          "AI quota has been reached. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to generate study plan.",
    });
  }
};