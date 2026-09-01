import Role from "../models/Role.js";
import Company from "../models/Company.js";


// =================================
// CREATE ROLE
// =================================

const createRole = async (data) => {

  const role = await Role.create(data);

  return role;
};


// =================================
// GET ALL ROLES
// =================================

const getAllRoles = async () => {

  const roles = await Role.find()
    .populate(
      "companyId",
      "name"
    )
    .sort({
      createdAt: -1,
    });

  return roles;
};


// =================================
// GET ROLE BY ID
// =================================

const getRoleById = async (id) => {

  const role = await Role.findById(id)
    .populate(
      "companyId",
      "name"
    );

  return role;
};


// =================================
// UPDATE ROLE
// =================================

const updateRole = async (
  id,
  data
) => {

  const role =
    await Role.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "companyId",
      "name"
    );

  return role;
};


// =================================
// DELETE ROLE
// =================================

const deleteRole = async (id) => {

  const role =
    await Role.findByIdAndDelete(id);

  return role;
};


export {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};