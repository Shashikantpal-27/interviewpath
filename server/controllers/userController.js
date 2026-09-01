import {
  getAllUsers as getAllUsersService,
  getUserById as getUserByIdService,
  deleteUser as deleteUserService,
} from "../services/userService.js";

import { createAdminLog } from "../services/adminLogService.js";


// =================================
// GET ALL USERS
// =================================

const getAllUsers = async (req, res) => {
  try {

    const users =
      await getAllUsersService();

    return res.status(200).json({
      success: true,
      data: users,
    });

  } catch (error) {

    console.error(
      "Get users controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};


// =================================
// GET USER BY ID
// =================================

const getUserById = async (req, res) => {
  try {

    const user =
      await getUserByIdService(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {

    console.error(
      "Get user controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};


// =================================
// DELETE USER
// =================================

const deleteUser = async (req, res) => {
  try {

    const user =
      await deleteUserService(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "DELETE",
      module: "USER",
      targetId: user._id,
      description:
        `User "${user.fullName}" deleted`,
    });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {

    console.error(
      "Delete user controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};


export {
  getAllUsers,
  getUserById,
  deleteUser,
};