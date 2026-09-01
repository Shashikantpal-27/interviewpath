import ResumeAnalysis from "../models/ResumeAnalysis.js";
import InterviewSession from "../models/InterviewSession.js";
import StudyPlan from "../models/StudyPlan.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // =========================================
    // LATEST RESUME ANALYSIS
    // =========================================

    const latestResume = await ResumeAnalysis.findOne({
      userId,
    }).sort({ createdAt: -1 });

    // =========================================
    // MOCK INTERVIEW DATA
    // =========================================

    const interviewCount =
      await InterviewSession.countDocuments({
        userId,
      });

    const latestInterview =
      await InterviewSession.findOne({
        userId,
      }).sort({ createdAt: -1 });

    // =========================================
    // STUDY PLAN DATA
    // =========================================

    const studyPlanCount =
      await StudyPlan.countDocuments({
        userId,
      });

    const latestStudyPlan =
      await StudyPlan.findOne({
        userId,
      }).sort({ createdAt: -1 });

    // =========================================
    // RESPONSE
    // =========================================

    return res.status(200).json({
      success: true,

      data: {
        // -------------------------------
        // RESUME
        // -------------------------------
        resume: latestResume
          ? {
              atsScore: latestResume.atsScore,
              fileName: latestResume.fileName,
              analyzedAt: latestResume.createdAt,
            }
          : null,

        // -------------------------------
        // INTERVIEWS
        // -------------------------------
        interviews: {
          count: interviewCount,

          latestScore: latestInterview
            ? latestInterview.overallScore
            : null,

          latestRole: latestInterview
            ? latestInterview.role
            : null,

          latestCompany: latestInterview
            ? latestInterview.company
            : null,

          latestDate: latestInterview
            ? latestInterview.createdAt
            : null,
        },

        // -------------------------------
        // STUDY PLANNER
        // -------------------------------
        studyPlan: {
          count: studyPlanCount,

          exists: Boolean(latestStudyPlan),

          topic: latestStudyPlan
            ? latestStudyPlan.topic
            : null,

          days: latestStudyPlan
            ? latestStudyPlan.days
            : null,

          hoursPerDay: latestStudyPlan
            ? latestStudyPlan.hoursPerDay
            : null,

          createdAt: latestStudyPlan
            ? latestStudyPlan.createdAt
            : null,
        },
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};