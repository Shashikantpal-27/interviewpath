import express from "express";
import {
  getProblems,
  getProblemById,
  getProblemStats,
} from "../controllers/problemController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProblems);
router.get("/meta/stats", authMiddleware, getProblemStats);
router.get("/:id", authMiddleware, getProblemById);

export default router;