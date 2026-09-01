import {
  getSettings as getSettingsService,
  updateSettings as updateSettingsService,
} from "../services/settingsService.js";

import { createAdminLog } from "../services/adminLogService.js";


// =================================
// GET SETTINGS
// =================================

const getSettings = async (req, res) => {
  try {

    const settings =
      await getSettingsService();

    return res.status(200).json({
      success: true,
      data: settings,
    });

  } catch (error) {

    console.error(
      "Get settings controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
    });
  }
};


// =================================
// UPDATE SETTINGS
// =================================

const updateSettings = async (req, res) => {
  try {

    const {
      siteName,
      siteDescription,
      maintenanceMode,
      notifications,
    } = req.body;


    const settings =
      await updateSettingsService(
        {
          siteName,
          siteDescription,
          maintenanceMode,
          notifications,
        },
        req.admin.adminId
      );


    // =============================
    // ADMIN LOG
    // =============================

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "UPDATE",
      module: "SETTINGS",
      targetId: settings._id,
      description: "Admin settings updated",
    });


    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: settings,
    });

  } catch (error) {

    console.error(
      "Update settings controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update settings",
    });
  }
};


export {
  getSettings,
  updateSettings,
};