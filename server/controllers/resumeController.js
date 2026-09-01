import dotenv from "dotenv";
dotenv.config();

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { GoogleGenAI } from "@google/genai";
import ResumeAnalysis from "../models/ResumeAnalysis.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeResume = async (req, res) => {
  try {
    // =========================================
    // CHECK AUTHENTICATED USER
    // =========================================
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login again.",
      });
    }

    // =========================================
    // CHECK FILE
    // =========================================
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume",
      });
    }

    console.log("Resume received:", req.file.originalname);

    // =========================================
    // EXTRACT PDF TEXT
    // =========================================
    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(req.file.buffer),
    }).promise;

    let resumeText = "";

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {
      const page = await pdf.getPage(pageNumber);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .join(" ");

      resumeText += pageText + "\n";
    }

    console.log("Resume text extracted successfully");

    // =========================================
    // CHECK EXTRACTED TEXT
    // =========================================
    if (!resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Could not extract text from this PDF. Please upload a text-based resume.",
      });
    }

    // =========================================
    // GEMINI PROMPT
    // =========================================
    const prompt = `
You are an expert ATS resume analyzer.

Analyze the following resume and provide feedback.

Resume:
${resumeText}

Return ONLY valid JSON in this exact format:

{
  "atsScore": 75,
  "skillsFound": [
    "React",
    "Node.js",
    "MongoDB"
  ],
  "strengths": [
    "Good full-stack development experience",
    "Clear project descriptions"
  ],
  "missingKeywords": [
    "Docker",
    "AWS"
  ],
  "improvements": [
    "Add more measurable achievements",
    "Improve keyword optimization"
  ],
  "suggestions": [
    "Add relevant certifications",
    "Include more industry keywords"
  ]
}
`;

    // =========================================
    // CALL GEMINI
    // =========================================
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    let resultText = response.text || "";

    // Remove markdown code blocks
    resultText = resultText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(resultText);

    // =========================================
    // SAVE ANALYSIS TO MONGODB
    // =========================================
    const savedAnalysis = await ResumeAnalysis.create({
      userId: req.user.id,

      fileName: req.file.originalname,

      atsScore: Number(analysis.atsScore) || 0,

      skillsFound: analysis.skillsFound || [],

      strengths: analysis.strengths || [],

      missingKeywords:
        analysis.missingKeywords || [],

      improvements:
        analysis.improvements || [],

      suggestions:
        analysis.suggestions || [],
    });

    console.log(
      "Resume analysis saved:",
      savedAnalysis._id.toString()
    );

    // =========================================
    // RESPONSE
    // =========================================
    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      fileName: req.file.originalname,
      analysis,
      analysisId: savedAnalysis._id,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);

    // Gemini quota
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message:
          "AI quota has been reached. Please try again later.",
      });
    }

    // Invalid AI JSON
    if (error instanceof SyntaxError) {
      return res.status(500).json({
        success: false,
        message:
          "AI returned an invalid analysis format. Please try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to analyze resume",
    });
  }
};