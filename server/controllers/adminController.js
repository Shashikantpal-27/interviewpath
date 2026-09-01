import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

import {
  getDashboard as getDashboardService,
  getAnalytics as getAnalyticsService,
  getAllUsers as getAllUsersService,
  getUserById as getUserByIdService,
  deleteUser as deleteUserService,
} from "../services/adminService.js";

import { createAdminLog } from "../services/adminLogService.js";


// =================================
// ADMIN LOGIN
// =================================

const adminLogin = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Admin login successful",

      token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {

    console.error(
      "Admin login error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {

    console.error("Create admin error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create admin",
    });
  }
};

// =================================
// DASHBOARD
// =================================

const getDashboard = async (req, res) => {

  try {

    const dashboard =
      await getDashboardService();

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: dashboard,
    });

  } catch (error) {

    console.error(
      "Dashboard controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};
// =================================
// ANALYTICS
// =================================

const getAnalytics = async (req, res) => {

  try {

    const analytics =
      await getAnalyticsService();

    return res.status(200).json({
      success: true,
      message: "Analytics data fetched successfully",
      data: analytics,
    });

  } catch (error) {

    console.error(
      "Analytics controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics data",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {

    const users = await getAllUsersService();

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: users.length,
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

const getUserById = async (req, res) => {
  try {

    const user = await getUserByIdService(
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
      message: "User fetched successfully",
      data: user,
    });

  } catch (error) {

    console.error(
      "Get user by ID controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

const deleteUser = async (req, res) => {
  try {

    const user = await deleteUserService(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ================================
    // CREATE ADMIN LOG
    // ================================

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "DELETE",
      module: "USER",
      targetId: user._id,
      description: `User "${user.fullName}" deleted`,
    });

    // ================================
    // RESPONSE
    // ================================

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


// =================================
// EXPORT
// =================================


export {
  adminLogin,
  createAdmin,
  getDashboard,
  getAnalytics,
   getAllUsers,
   getUserById,
   deleteUser,
};