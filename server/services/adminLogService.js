import AdminLog from "../models/AdminLog.js";


// =====================================
// CREATE LOG
// =====================================

const createAdminLog = async ({
  adminId,
  action,
  module,
  targetId = null,
  description = "",
}) => {

  const log = await AdminLog.create({
    adminId,
    action,
    module,
    targetId,
    description,
  });

  return log;
};


// =====================================
// GET ALL LOGS
// =====================================
// =================================
// GET ALL ADMIN LOGS
// =================================

const getAllAdminLogs = async () => {

  try {

    const logs = await AdminLog.find()
      .populate(
        "adminId",
        "name email"
      )
      .sort({
        timestamp: -1,
      });

    return logs;

  } catch (error) {

    console.error(
      "Get admin logs service error:",
      error
    );

    throw error;
  }
};


// =====================================
// GET LOGS BY ADMIN
// =====================================

const getLogsByAdmin = async (adminId) => {

  const logs = await AdminLog.find({
    adminId,
  })
    .populate(
      "adminId",
      "name email"
    )
    .sort({
      timestamp: -1,
    });

  return logs;
};


export {
  createAdminLog,
  getAllAdminLogs,
  getLogsByAdmin,
};