import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

// =================================
// GET ADMIN PROFILE
// =================================

const getAdminProfileService = async (adminId) => {
  const admin = await Admin.findById(adminId)
    .select("-password");

  return admin;
};


// =================================
// UPDATE ADMIN PROFILE
// =================================

const updateAdminProfileService = async (
  adminId,
  name,
  email
) => {

  const admin = await Admin.findByIdAndUpdate(
    adminId,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  return admin;
};


// =================================
// CHANGE PASSWORD
// =================================

const changeAdminPasswordService = async (
  adminId,
  currentPassword,
  newPassword
) => {

  const admin = await Admin.findById(adminId);

  if (!admin) {
    return {
      success: false,
      message: "Admin not found",
    };
  }

  const isPasswordCorrect =
    await bcrypt.compare(
      currentPassword,
      admin.password
    );

  if (!isPasswordCorrect) {
    return {
      success: false,
      message: "Current password is incorrect",
    };
  }

  const hashedPassword =
    await bcrypt.hash(newPassword, 10);

  admin.password = hashedPassword;

  await admin.save();

  return {
    success: true,
    message: "Password changed successfully",
  };
};


export {
  getAdminProfileService,
  updateAdminProfileService,
  changeAdminPasswordService,
};