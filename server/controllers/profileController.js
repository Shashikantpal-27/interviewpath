import User from "../models/User.js";

// =========================
// GET PROFILE
// =========================

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile: user,
    });
  } catch (error) {
    console.error(
      "Get Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// =========================
// UPDATE PROFILE
// =========================

export const updateProfile = async (
  req,
  res
) => {
  try {
    const {
      fullName,
      phone,
      city,
      state,
      dateOfBirth,
      headline,
      education,
      skills,
      projects,
      experiences,
      codingProfiles,
      targetCompanies,
    } = req.body;

    const updateData = {
      fullName,
      phone,
      city,
      state,
      dateOfBirth,
      headline,
      education,
      skills,
      projects,
      experiences,
      codingProfiles,
      targetCompanies,
    };

    const user =
      await User.findByIdAndUpdate(
        req.user.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      profile: user,
    });

  } catch (error) {
    console.error(
      "Update Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// =========================
// UPDATE PROFILE IMAGE
// =========================

export const updateProfileImage = async (
  req,
  res
) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a profile image",
      });
    }

    /*
      Image URL/file path is created
      by Multer middleware.
    */

    const profileImage =
      `/uploads/profiles/${req.file.filename}`;

    const user =
      await User.findByIdAndUpdate(
        req.user.id,
        {
          profileImage,
        },
        {
          new: true,
        }
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Profile image updated successfully",
      profileImage,
      user,
    });

  } catch (error) {

    console.error(
      "Update Profile Image Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload profile image",
    });
  }
};