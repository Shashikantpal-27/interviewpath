import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getProfile,
  updateProfile,
  updateProfileImage,
} from "../controllers/profileController.js";

import uploadProfileImage from "../middleware/profileUpload.js";

const router = express.Router();

// =========================
// GET PROFILE
// =========================

router.get(
  "/",
  authMiddleware,
  getProfile
);


// =========================
// UPDATE PROFILE
// =========================

router.put(
  "/",
  authMiddleware,
  updateProfile
);


// =========================
// UPDATE PROFILE IMAGE
// =========================

router.post(
  "/image",
  authMiddleware,
  uploadProfileImage.single("profileImage"),
  updateProfileImage
);

export default router;