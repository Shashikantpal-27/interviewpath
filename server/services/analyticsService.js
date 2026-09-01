import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Company from "../models/Company.js";
import Role from "../models/Role.js";
import Roadmap from "../models/Roadmap.js";
import InterviewExperience from "../models/InterviewExperience.js";
import Report from "../models/Report.js";


// =================================
// GET ANALYTICS
// =================================

const getAnalytics = async () => {
  try {

    const totalUsers = await User.countDocuments();

    const totalAdmins = await Admin.countDocuments();

    const totalCompanies =
      await Company.countDocuments();

    const totalRoles =
      await Role.countDocuments();

    const totalRoadmaps =
      await Roadmap.countDocuments();

    const totalInterviewExperiences =
      await InterviewExperience.countDocuments();

    const totalReports =
      await Report.countDocuments();

    const pendingReports =
      await Report.countDocuments({
        status: "pending",
      });

    const resolvedReports =
      await Report.countDocuments({
        status: "resolved",
      });

    const dismissedReports =
      await Report.countDocuments({
        status: "dismissed",
      });


    return {
      users: totalUsers,
      admins: totalAdmins,
      companies: totalCompanies,
      roles: totalRoles,
      roadmaps: totalRoadmaps,
      interviewExperiences:
        totalInterviewExperiences,

      reports: {
        total: totalReports,
        pending: pendingReports,
        resolved: resolvedReports,
        dismissed: dismissedReports,
      },
    };

  } catch (error) {

    console.error(
      "Get analytics service error:",
      error
    );

    throw error;
  }
};


export {
  getAnalytics,
};