import express from "express";

import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

//import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// =================================
// ADMIN PROTECTION
// =================================

router.use(adminMiddleware);


// =================================
// GET SETTINGS
// =================================

router.get(
  "/",
  getSettings
);


// =================================
// UPDATE SETTINGS
// =================================

router.put(
  "/",
  updateSettings
);


export default router;