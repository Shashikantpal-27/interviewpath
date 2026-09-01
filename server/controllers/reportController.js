import {
  getAllReports as getAllReportsService,
  getReportById as getReportByIdService,
  resolveReport as resolveReportService,
  dismissReport as dismissReportService,
} from "../services/reportService.js";

import { createAdminLog } from "../services/adminLogService.js";


// =================================
// GET ALL
// =================================

const getAllReports = async (req, res) => {
  try {

    const reports =
      await getAllReportsService();

    return res.status(200).json({
      success: true,
      data: reports,
    });

  } catch (error) {

    console.error(
      "Get reports controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
    });
  }
};


// =================================
// GET BY ID
// =================================

const getReportById = async (req, res) => {
  try {

    const report =
      await getReportByIdService(
        req.params.id
      );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });

  } catch (error) {

    console.error(
      "Get report controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch report",
    });
  }
};


// =================================
// RESOLVE
// =================================

const resolveReport = async (req, res) => {
  try {

    const {
      adminAction,
    } = req.body;

    if (!adminAction) {
      return res.status(400).json({
        success: false,
        message: "Admin action is required",
      });
    }

    const report =
      await resolveReportService(
        req.params.id,
        req.admin.adminId,
        adminAction
      );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "RESOLVE",
      module: "REPORT",
      targetId: report._id,
      description:
        `Report resolved: ${adminAction}`,
    });

    return res.status(200).json({
      success: true,
      message: "Report resolved successfully",
      data: report,
    });

  } catch (error) {

    console.error(
      "Resolve report controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to resolve report",
    });
  }
};


// =================================
// DISMISS
// =================================

const dismissReport = async (req, res) => {
  try {

    const {
      adminAction,
    } = req.body;

    if (!adminAction) {
      return res.status(400).json({
        success: false,
        message: "Admin action is required",
      });
    }

    const report =
      await dismissReportService(
        req.params.id,
        req.admin.adminId,
        adminAction
      );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "DISMISS",
      module: "REPORT",
      targetId: report._id,
      description:
        `Report dismissed: ${adminAction}`,
    });

    return res.status(200).json({
      success: true,
      message: "Report dismissed successfully",
      data: report,
    });

  } catch (error) {

    console.error(
      "Dismiss report controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to dismiss report",
    });
  }
};


export {
  getAllReports,
  getReportById,
  resolveReport,
  dismissReport,
};