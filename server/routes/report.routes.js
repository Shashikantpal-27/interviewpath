import express from "express";

import {
  getAllReports,
  getReportById,
  resolveReport,
  dismissReport,
} from "../controllers/reportController.js";

//import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(adminMiddleware);

// GET ALL
router.get(
  "/",
  getAllReports
);


// GET BY ID
router.get(
  "/:id",
  getReportById
);


// RESOLVE
router.put(
  "/:id/resolve",
  resolveReport
);


// DISMISS
router.put(
  "/:id/dismiss",
  dismissReport
);

export default router;