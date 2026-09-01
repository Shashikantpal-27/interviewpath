import express from "express";
import {
  signup,
  login,
  getCurrentUser,
} from "../controllers/authcontroller.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Protected Route
router.get("/me", authMiddleware, getCurrentUser);

export default router;