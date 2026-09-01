import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Company from "../models/Company.js";
import Role from "../models/Role.js";
import Roadmap from "../models/Roadmap.js";
import InterviewExperience from "../models/InterviewExperience.js";
import Report from "../models/Report.js";
import AdminLog from "../models/AdminLog.js";


// =================================
// DASHBOARD
// =================================

// =================================
// DASHBOARD
// =================================

// =================================
// DASHBOARD
// =================================

const getDashboard = async () => {

  try {

    const [
      totalUsers,
      totalAdmins,
      totalCompanies,
      totalRoles,
      totalRoadmaps,

      // Interview Experience
      pendingInterviewExperiences,
      approvedInterviewExperiences,
      rejectedInterviewExperiences,

      // Reports
      pendingReports,
      resolvedReports,
      dismissedReports,

      // Recent Activities
      recentActivities,

    ] = await Promise.all([

      // =========================
      // USERS
      // =========================

      User.countDocuments({
        role: "user",
      }),


      // =========================
      // ADMINS
      // =========================

      Admin.countDocuments(),


      // =========================
      // COMPANIES
      // =========================

      Company.countDocuments(),


      // =========================
      // ROLES
      // =========================

      Role.countDocuments(),


      // =========================
      // ROADMAPS
      // =========================

      Roadmap.countDocuments(),


      // =========================
      // INTERVIEW EXPERIENCES
      // =========================

      InterviewExperience.countDocuments({
        status: "pending",
      }),

      InterviewExperience.countDocuments({
        status: "approved",
      }),

      InterviewExperience.countDocuments({
        status: "rejected",
      }),


      // =========================
      // REPORTS
      // =========================

      Report.countDocuments({
        status: "pending",
      }),

      Report.countDocuments({
        status: "resolved",
      }),

      Report.countDocuments({
        status: "dismissed",
      }),


      // =========================
      // RECENT ADMIN ACTIVITIES
      // =========================

      AdminLog.find()
        .populate(
          "adminId",
          "name email"
        )
        .sort({
          timestamp: -1,
        })
        .limit(10),

    ]);


    return {

      totalUsers,

      totalAdmins,

      totalCompanies,

      totalRoles,

      totalRoadmaps,

      pendingInterviewExperiences,

      approvedInterviewExperiences,

      rejectedInterviewExperiences,

      pendingReports,

      resolvedReports,

      dismissedReports,

      recentActivities,

    };

  } catch (error) {

    console.error(
      "Dashboard service error:",
      error
    );

    throw error;
  }
};

const getAnalytics = async () => {
  try {

    // User registration analytics
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);


    // Company creation analytics
    const companyGrowth = await Company.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);


    // Interview experience status
    const interviewExperienceStats =
      await InterviewExperience.aggregate([
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
      ]);


    // Report status
    const reportStats =
      await Report.aggregate([
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
      ]);


    return {
      userGrowth,
      companyGrowth,
      interviewExperienceStats,
      reportStats,
    };

  } catch (error) {

    console.error(
      "Analytics service error:",
      error
    );

    throw error;
  }
};

const getAllUsers = async () => {
  try {

    const users = await User.find(
      { role: "user" },
      {
        password: 0,
      }
    ).sort({
      createdAt: -1,
    });

    return users;

  } catch (error) {

    console.error(
      "Get users service error:",
      error
    );

    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findOne(
      {
        _id: userId,
        role: "user",
      },
      {
        password: 0,
      }
    );

    return user;

  } catch (error) {
    console.error("Get user by ID service error:", error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {

    const user = await User.findOneAndDelete({
      _id: userId,
      role: "user",
    });

    return user;

  } catch (error) {

    console.error(
      "Delete user service error:",
      error
    );

    throw error;
  }
};

export {
  getDashboard,
   getAnalytics,
   getAllUsers,
    getUserById,
     deleteUser,
};