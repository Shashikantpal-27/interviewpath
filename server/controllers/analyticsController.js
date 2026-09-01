import {
  getAnalytics as getAnalyticsService,
} from "../services/analyticsService.js";


// =================================
// GET ANALYTICS
// =================================

const getAnalytics = async (req, res) => {

  try {

    const analytics =
      await getAnalyticsService();

    return res.status(200).json({

      success: true,

      data: analytics,

    });

  } catch (error) {

    console.error(
      "Get analytics controller error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to fetch analytics",

    });
  }
};


export {
  getAnalytics,
};