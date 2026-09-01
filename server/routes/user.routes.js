import express from "express";

import {
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/userController.js";

//import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// All user management APIs are admin protected

router.use(adminMiddleware);


// GET ALL USERS

router.get(
  "/",
  getAllUsers
);


// GET USER BY ID

router.get(
  "/:id",
  getUserById
);


// DELETE USER

router.delete(
  "/:id",
  deleteUser
);


export default router;