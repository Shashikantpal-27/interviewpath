import express from "express";

import {
  getAnalytics,
} from "../controllers/analyticsController.js";

//import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";


const router = express.Router();


// =================================
// ADMIN PROTECTION
// =================================

router.use(adminMiddleware);


// =================================
// GET ANALYTICS
// =================================

router.get(
  "/",
  getAnalytics
);


export default router;