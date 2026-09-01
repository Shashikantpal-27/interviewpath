import {
  createRoadmap as createRoadmapService,
  getAllRoadmaps as getAllRoadmapsService,
  getRoadmapById as getRoadmapByIdService,
  updateRoadmap as updateRoadmapService,
  deleteRoadmap as deleteRoadmapService,
} from "../services/roadmapService.js";

import { createAdminLog } from "../services/adminLogService.js";


// =====================================
// CREATE
// =====================================

const createRoadmap = async (req, res) => {

  try {

    const roadmap =
      await createRoadmapService(req.body);

    if (!roadmap) {
      return res.status(400).json({
        success: false,
        message: "Roadmap creation failed",
      });
    }

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "CREATE",
      module: "ROADMAP",
      targetId: roadmap._id,
      description:
        `Roadmap "${roadmap.title}" created`,
    });

    return res.status(201).json({
      success: true,
      message: "Roadmap created successfully",
      data: roadmap,
    });

  } catch (error) {

    console.error(
      "Create roadmap controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create roadmap",
    });
  }
};


// =====================================
// GET ALL
// =====================================

const getAllRoadmaps = async (req, res) => {

  try {

    const roadmaps =
      await getAllRoadmapsService(
        req.query.status
      );

    return res.status(200).json({
      success: true,
      data: roadmaps,
    });

  } catch (error) {

    console.error(
      "Get roadmaps controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch roadmaps",
    });
  }
};


// =====================================
// GET BY ID
// =====================================

const getRoadmapById = async (req, res) => {

  try {

    const roadmap =
      await getRoadmapByIdService(
        req.params.id
      );

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: roadmap,
    });

  } catch (error) {

    console.error(
      "Get roadmap controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch roadmap",
    });
  }
};


// =====================================
// UPDATE
// =====================================

const updateRoadmap = async (req, res) => {

  try {

    const roadmap =
      await updateRoadmapService(
        req.params.id,
        req.body
      );

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "UPDATE",
      module: "ROADMAP",
      targetId: roadmap._id,
      description:
        `Roadmap "${roadmap.title}" updated`,
    });

    return res.status(200).json({
      success: true,
      message: "Roadmap updated successfully",
      data: roadmap,
    });

  } catch (error) {

    console.error(
      "Update roadmap controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update roadmap",
    });
  }
};


// =====================================
// DELETE
// =====================================

const deleteRoadmap = async (req, res) => {

  try {

    const roadmap =
      await deleteRoadmapService(
        req.params.id
      );

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "DELETE",
      module: "ROADMAP",
      targetId: roadmap._id,
      description:
        `Roadmap "${roadmap.title}" deleted`,
    });

    return res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully",
    });

  } catch (error) {

    console.error(
      "Delete roadmap controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete roadmap",
    });
  }
};


export {
  createRoadmap,
  getAllRoadmaps,
  getRoadmapById,
  updateRoadmap,
  deleteRoadmap,
};