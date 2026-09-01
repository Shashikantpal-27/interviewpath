import express from "express";

import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../controllers/roleController.js";

//import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// All routes are admin protected

router.use(adminMiddleware);

// CREATE
router.post(
  "/",
  createRole
);


// GET ALL
router.get(
  "/",
  getAllRoles
);


// GET BY ID
router.get(
  "/:id",
  getRoleById
);


// UPDATE
router.put(
  "/:id",
  updateRole
);


// DELETE
router.delete(
  "/:id",
  deleteRole
);


export default router;