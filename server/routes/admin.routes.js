import express from "express";

import {
  adminLogin,
  createAdmin,
  getDashboard,
  getAnalytics,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/adminController.js";

import {
  getAllAdminLogs,
} from "../controllers/adminLogController.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// PUBLIC
router.post("/login", adminLogin);


// PROTECTED ADMIN ROUTES
router.use(adminMiddleware);


router.post(
  "/create",
  createAdmin
);


router.get(
  "/dashboard",
  getDashboard
);


router.get(
  "/analytics",
  getAnalytics
);


router.get(
  "/users",
  getAllUsers
);


router.get(
  "/users/:id",
  getUserById
);


router.delete(
  "/users/:id",
  deleteUser
);


router.get(
  "/logs",
  getAllAdminLogs
);


export default router;