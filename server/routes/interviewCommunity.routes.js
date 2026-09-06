import express from "express";

import {
  getApprovedExperiences,
  createExperience,
  toggleLike,
  getComments,
  createComment,
} from "../controllers/interviewCommunityController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Approved experiences sab dekh sakte hain
router.get("/", getApprovedExperiences);

// Baaki community actions ke liye login required
router.use(authMiddleware);

router.post("/", createExperience);

router.put("/:id/like", toggleLike);

router.get("/:id/comments", getComments);

router.post("/:id/comments", createComment);

export default router;