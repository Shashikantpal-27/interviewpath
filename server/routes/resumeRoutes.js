import express from "express";
import { analyzeResume } from "../controllers/resumeController.js";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/analyze",
  authMiddleware,
  upload.single("resume"),
  analyzeResume
);

export default router;