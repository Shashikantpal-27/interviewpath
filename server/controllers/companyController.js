import Company from "../models/Company.js";


// ======================================
// USER: GET COMPANIES
// ======================================

export const getCompanies = async (req, res) => {
  try {
    const {
      search,
      difficulty,
      role,
      industry,
    } = req.query;

    const query = {};

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (
      difficulty &&
      difficulty !== "All"
    ) {
      query.difficulty = difficulty;
    }

    if (
      industry &&
      industry !== "All"
    ) {
      query.industry = industry;
    }

    if (
      role &&
      role !== "All"
    ) {
      query.popularRoles = role;
    }

    const companies =
      await Company.find(query)
        .sort({ name: 1 });

    return res.json({
      success: true,
      data: companies,
    });

  } catch (error) {

    console.error(
      "getCompanies error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch companies",
    });
  }
};


// ======================================
// USER + ADMIN: GET BY ID
// ======================================

export const getCompanyById =
  async (req, res) => {

    try {

      const company =
        await Company.findById(
          req.params.id
        );

      if (!company) {
        return res.status(404).json({
          success: false,
          message: "Company not found",
        });
      }

      const data = {
        ...company.toObject(),

        progress: {
          solved: 0,
          total:
            company.codingQuestionsCount,
        },
      };

      return res.json({
        success: true,
        data,
      });

    } catch (error) {

      console.error(
        "getCompanyById error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch company",
      });
    }
  };


// ======================================
// USER: FILTER DATA
// ======================================

export const getCompanyFilters =
  async (req, res) => {

    try {

      const industries =
        await Company.distinct(
          "industry"
        );

      const roles =
        await Company.distinct(
          "popularRoles"
        );

      return res.json({
        success: true,

        data: {
          industries,
          roles,
          difficulties: [
            "Easy",
            "Medium",
            "Hard",
          ],
        },
      });

    } catch (error) {

      console.error(
        "getCompanyFilters error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch filters",
      });
    }
  };


// ======================================
// ADMIN: CREATE
// ======================================

export const createCompany =
  async (req, res) => {

    try {

      const company =
        await Company.create(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Company created successfully",
        data: company,
      });

    } catch (error) {

      console.error(
        "createCompany error:",
        error
      );

      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Failed to create company",
      });
    }
  };


// ======================================
// ADMIN: GET ALL
// ======================================

export const getAllCompanies =
  async (req, res) => {

    try {

      const companies =
        await Company.find()
          .sort({ createdAt: -1 });

      return res.json({
        success: true,
        data: companies,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch companies",
      });
    }
  };


// ======================================
// ADMIN: UPDATE
// ======================================

export const updateCompany =
  async (req, res) => {

    try {

      const company =
        await Company.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!company) {
        return res.status(404).json({
          success: false,
          message:
            "Company not found",
        });
      }

      return res.json({
        success: true,
        message:
          "Company updated successfully",
        data: company,
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Failed to update company",
      });
    }
  };


// ======================================
// ADMIN: DELETE
// ======================================

export const deleteCompany =
  async (req, res) => {

    try {

      const company =
        await Company.findByIdAndDelete(
          req.params.id
        );

      if (!company) {
        return res.status(404).json({
          success: false,
          message:
            "Company not found",
        });
      }

      return res.json({
        success: true,
        message:
          "Company deleted successfully",
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete company",
      });
    }
  };