import express from "express";

import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";

//import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// All company management routes require admin authentication

router.use(adminMiddleware);

// CREATE
router.post("/", createCompany);


// GET ALL
router.get("/", getAllCompanies);


// GET ONE
router.get("/:id", getCompanyById);


// UPDATE
router.put("/:id", updateCompany);


// DELETE
router.delete("/:id", deleteCompany);


export default router;