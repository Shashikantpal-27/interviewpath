import express from "express";
import {
  getCompanies,
  getCompanyById,
  getCompanyFilters,
} from "../controllers/companyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getCompanies);
router.get("/meta/filters", authMiddleware, getCompanyFilters);
router.get("/:id", authMiddleware, getCompanyById);

export default router;