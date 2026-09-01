import Report from "../models/Report.js";


// =================================
// GET ALL REPORTS
// =================================

const getAllReports = async () => {
  try {

    const reports = await Report.find()
      .populate(
        "reportedBy",
        "fullName email"
      )
      .populate(
        "resolvedBy",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

    return reports;

  } catch (error) {

    console.error(
      "Get reports service error:",
      error
    );

    throw error;
  }
};


// =================================
// GET REPORT BY ID
// =================================

const getReportById = async (reportId) => {
  try {

    const report =
      await Report.findById(reportId)
        .populate(
          "reportedBy",
          "fullName email"
        )
        .populate(
          "resolvedBy",
          "name email"
        );

    return report;

  } catch (error) {

    console.error(
      "Get report by ID service error:",
      error
    );

    throw error;
  }
};


// =================================
// RESOLVE REPORT
// =================================

const resolveReport = async (
  reportId,
  adminId,
  adminAction
) => {
  try {

    const report =
      await Report.findByIdAndUpdate(
        reportId,
        {
          status: "resolved",
          adminAction,
          resolvedBy: adminId,
          resolvedAt: new Date(),
        },
        {
          new: true,
        }
      );

    return report;

  } catch (error) {

    console.error(
      "Resolve report service error:",
      error
    );

    throw error;
  }
};


// =================================
// DISMISS REPORT
// =================================

const dismissReport = async (
  reportId,
  adminId,
  adminAction
) => {
  try {

    const report =
      await Report.findByIdAndUpdate(
        reportId,
        {
          status: "dismissed",
          adminAction,
          resolvedBy: adminId,
          resolvedAt: new Date(),
        },
        {
          new: true,
        }
      );

    return report;

  } catch (error) {

    console.error(
      "Dismiss report service error:",
      error
    );

    throw error;
  }
};


export {
  getAllReports,
  getReportById,
  resolveReport,
  dismissReport,
};