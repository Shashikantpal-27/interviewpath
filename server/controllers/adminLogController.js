import {
  getAllAdminLogs as getAllAdminLogsService,
} from "../services/adminLogService.js";


// =================================
// GET ALL ADMIN LOGS
// =================================

const getAllAdminLogs = async (req, res) => {

  try {

    const logs =
      await getAllAdminLogsService();

    return res.status(200).json({
      success: true,
      message: "Admin logs fetched successfully",
      data: logs,
    });

  } catch (error) {

    console.error(
      "Admin logs controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin logs",
    });
  }
};


export {
  getAllAdminLogs,
};