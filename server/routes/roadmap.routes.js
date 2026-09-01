import express from "express";

import {
  createRoadmap,
  getAllRoadmaps,
  getRoadmapById,
  updateRoadmap,
  deleteRoadmap,
} from "../controllers/roadmapController.js";

//import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";


const router = express.Router();


// =================================
// ADMIN PROTECTION
// =================================

router.use(adminMiddleware);


// =================================
// CREATE
// =================================

router.post(
  "/",
  createRoadmap
);


// =================================
// GET ALL
// =================================

router.get(
  "/",
  getAllRoadmaps
);


// =================================
// GET BY ID
// =================================

router.get(
  "/:id",
  getRoadmapById
);


// =================================
// UPDATE
// =================================

router.put(
  "/:id",
  updateRoadmap
);


// =================================
// DELETE
// =================================

router.delete(
  "/:id",
  deleteRoadmap
);


export default router;