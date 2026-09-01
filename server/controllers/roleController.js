import {
  createRole as createRoleService,
  getAllRoles as getAllRolesService,
  getRoleById as getRoleByIdService,
  updateRole as updateRoleService,
  deleteRole as deleteRoleService,
} from "../services/roleService.js";

import { createAdminLog } from "../services/adminLogService.js";


// =================================
// CREATE
// =================================

const createRole = async (req, res) => {
  try {

    const role =
      await createRoleService(
        req.body
      );

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role creation failed",
      });
    }

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "CREATE",
      module: "ROLE",
      targetId: role._id,
      description:
        `Role "${role.title}" created`,
    });

    return res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });

  } catch (error) {

    console.error(
      "Create role controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message ||
        "Failed to create role",
    });
  }
};


// =================================
// GET ALL
// =================================

const getAllRoles = async (req, res) => {
  try {

    const roles =
      await getAllRolesService();

    return res.status(200).json({
      success: true,
      data: roles,
    });

  } catch (error) {

    console.error(
      "Get roles controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch roles",
    });
  }
};


// =================================
// GET BY ID
// =================================

const getRoleById = async (req, res) => {
  try {

    const role =
      await getRoleByIdService(
        req.params.id
      );

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: role,
    });

  } catch (error) {

    console.error(
      "Get role controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch role",
    });
  }
};


// =================================
// UPDATE
// =================================

const updateRole = async (req, res) => {
  try {

    const role =
      await updateRoleService(
        req.params.id,
        req.body
      );

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "UPDATE",
      module: "ROLE",
      targetId: role._id,
      description:
        `Role "${role.title}" updated`,
    });

    return res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: role,
    });

  } catch (error) {

    console.error(
      "Update role controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update role",
    });
  }
};


// =================================
// DELETE
// =================================

const deleteRole = async (req, res) => {
  try {

    const role =
      await deleteRoleService(
        req.params.id
      );

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    await createAdminLog({
      adminId: req.admin.adminId,
      action: "DELETE",
      module: "ROLE",
      targetId: role._id,
      description:
        `Role "${role.title}" deleted`,
    });

    return res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });

  } catch (error) {

    console.error(
      "Delete role controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete role",
    });
  }
};


export {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};