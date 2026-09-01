import express from "express";
import { generateStudyPlan } from "../controllers/studyPlannerController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post(
  "/generate",
  authMiddleware,
  generateStudyPlan
);

export default router;