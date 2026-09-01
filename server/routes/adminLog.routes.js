import express from "express";

import {
  getAllAdminLogs,
} from "../controllers/adminLogController.js";

//import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// =================================
// ADMIN PROTECTED ROUTES
// =================================

router.use(adminMiddleware);


// =================================
// GET ALL ADMIN LOGS
// =================================

router.get(
  "/",
  getAllAdminLogs
);


export default router;