import express from "express";

import {
  getAdminProfile,
  updateAdminProfile,
  changePassword,
} from "../controllers/adminProfileController.js";

//import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// ADMIN PROTECTION

router.use(adminMiddleware);


// GET PROFILE

router.get(
  "/",
  getAdminProfile
);


// UPDATE PROFILE

router.put(
  "/",
  updateAdminProfile
);


// CHANGE PASSWORD

router.put(
  "/password",
  changePassword
);


export default router;