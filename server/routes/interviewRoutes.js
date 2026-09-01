import express from "express";

import {
  startInterview,
  evaluateAnswer,
  finalEvaluation,
} from "../controllers/interviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/start", authMiddleware, startInterview);

router.post("/evaluate", authMiddleware, evaluateAnswer);

router.post(
  "/final-evaluation",
  authMiddleware,
  finalEvaluation
);

export default router;