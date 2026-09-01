import {
  getAllInterviewExperiences as getAllInterviewExperiencesService,
  getInterviewExperienceById as getInterviewExperienceByIdService,
  approveInterviewExperience as approveInterviewExperienceService,
  rejectInterviewExperience as rejectInterviewExperienceService,
  deleteInterviewExperience as deleteInterviewExperienceService,
} from "../services/interviewExperienceService.js";

import { createAdminLog } from "../services/adminLogService.js";


// =====================================
// GET ALL
// =====================================

const getAllInterviewExperiences = async (req, res) => {
  try {

    const experiences =
      await getAllInterviewExperiencesService(
        req.query.status
      );

    return res.status(200).json({
      success: true,
      data: experiences,
    });

  } catch (error) {

    console.error(
      "Get interview experiences controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch interview experiences",
    });
  }
};


// =====================================
// GET BY ID
// =====================================

const getInterviewExperienceById = async (req, res) => {
  try {

    const experience =
      await getInterviewExperienceByIdService(
        req.params.id
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Interview experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: experience,
    });

  } catch (error) {

    console.error(
      "Get interview experience controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch interview experience",
    });
  }
};


// =====================================
// APPROVE
// =====================================

const approveInterviewExperience = async (req, res) => {
  try {

    const experience =
      await approveInterviewExperienceService(
        req.params.id
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Interview experience not found",
      });
    }

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "APPROVE",
      module: "INTERVIEW_EXPERIENCE",
      targetId: experience._id,
      description:
        `Interview experience "${experience.title}" approved`,
    });

    return res.status(200).json({
      success: true,
      message: "Interview experience approved successfully",
      data: experience,
    });

  } catch (error) {

    console.error(
      "Approve interview experience controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to approve interview experience",
    });
  }
};


// =====================================
// REJECT
// =====================================

const rejectInterviewExperience = async (req, res) => {
  try {

    const { rejectionReason } = req.body;

    if (!rejectionReason) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required",
      });
    }

    const experience =
      await rejectInterviewExperienceService(
        req.params.id,
        rejectionReason
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Interview experience not found",
      });
    }

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "REJECT",
      module: "INTERVIEW_EXPERIENCE",
      targetId: experience._id,
      description:
        `Interview experience "${experience.title}" rejected`,
    });

    return res.status(200).json({
      success: true,
      message: "Interview experience rejected successfully",
      data: experience,
    });

  } catch (error) {

    console.error(
      "Reject interview experience controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to reject interview experience",
    });
  }
};


// =====================================
// DELETE
// =====================================

const deleteInterviewExperience = async (req, res) => {
  try {

    const experience =
      await deleteInterviewExperienceService(
        req.params.id
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Interview experience not found",
      });
    }

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "DELETE",
      module: "INTERVIEW_EXPERIENCE",
      targetId: experience._id,
      description:
        `Interview experience "${experience.title}" deleted`,
    });

    return res.status(200).json({
      success: true,
      message: "Interview experience deleted successfully",
    });

  } catch (error) {

    console.error(
      "Delete interview experience controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete interview experience",
    });
  }
};


export {
  getAllInterviewExperiences,
  getInterviewExperienceById,
  approveInterviewExperience,
  rejectInterviewExperience,
  deleteInterviewExperience,
};