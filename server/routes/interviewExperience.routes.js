import express from "express";

import {
  getAllInterviewExperiences,
  getInterviewExperienceById,
  approveInterviewExperience,
  rejectInterviewExperience,
  deleteInterviewExperience,
} from "../controllers/interviewExperienceController.js";

//import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// =====================================
// ALL ROUTES ADMIN PROTECTED
// =====================================

router.use(adminMiddleware);

// =====================================
// GET ALL
// =====================================

router.get(
  "/",
  getAllInterviewExperiences
);


// =====================================
// GET BY ID
// =====================================

router.get(
  "/:id",
  getInterviewExperienceById
);


// =====================================
// APPROVE
// =====================================

router.put(
  "/:id/approve",
  approveInterviewExperience
);


// =====================================
// REJECT
// =====================================

router.put(
  "/:id/reject",
  rejectInterviewExperience
);


// =====================================
// DELETE
// =====================================

router.delete(
  "/:id",
  deleteInterviewExperience
);


export default router;