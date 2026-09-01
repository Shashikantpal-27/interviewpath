import {
  getAdminProfileService,
  updateAdminProfileService,
  changeAdminPasswordService,
} from "../services/adminProfileService.js";


// =================================
// GET ADMIN PROFILE
// =================================

const getAdminProfile = async (req, res) => {

  try {

    const admin =
      await getAdminProfileService(
        req.admin.adminId
      );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: admin,
    });

  } catch (error) {

    console.error(
      "Get admin profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin profile",
    });
  }
};


// =================================
// UPDATE ADMIN PROFILE
// =================================

const updateAdminProfile = async (req, res) => {

  try {

    const {
      name,
      email,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const admin =
      await updateAdminProfileService(
        req.admin.adminId,
        name,
        email
      );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Admin profile updated successfully",
      data: admin,
    });

  } catch (error) {

    console.error(
      "Update admin profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update admin profile",
    });
  }
};


// =================================
// CHANGE PASSWORD
// =================================

const changePassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 6 characters",
      });
    }

    const result =
      await changeAdminPasswordService(
        req.admin.adminId,
        currentPassword,
        newPassword
      );

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {

    console.error(
      "Change admin password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to change password",
    });
  }
};


export {
  getAdminProfile,
  updateAdminProfile,
  changePassword,
};