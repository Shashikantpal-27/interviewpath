import AdminSettings from "../models/AdminSettings.js";


// =================================
// GET SETTINGS
// =================================

const getSettings = async () => {
  try {

    let settings = await AdminSettings.findOne();

    // Create default settings if
    // no settings document exists

    if (!settings) {

      settings = await AdminSettings.create({});

    }

    return settings;

  } catch (error) {

    console.error(
      "Get settings service error:",
      error
    );

    throw error;
  }
};


// =================================
// UPDATE SETTINGS
// =================================

const updateSettings = async (
  settingsData,
  adminId
) => {
  try {

    const settings =
      await AdminSettings.findOneAndUpdate(
        {},
        {
          $set: {
            siteName:
              settingsData.siteName,

            siteDescription:
              settingsData.siteDescription,

            maintenanceMode:
              settingsData.maintenanceMode,

            notifications:
              settingsData.notifications,

            updatedBy: adminId,
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );

    return settings;

  } catch (error) {

    console.error(
      "Update settings service error:",
      error
    );

    throw error;
  }
};


export {
  getSettings,
  updateSettings,
};