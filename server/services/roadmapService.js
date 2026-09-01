import Roadmap from "../models/Roadmap.js";

// =====================================
// CREATE ROADMAP
// =====================================

const createRoadmap = async (data) => {
  const roadmap = await Roadmap.create(data);
  return roadmap;
};


// =====================================
// GET ALL ROADMAPS
// =====================================

const getAllRoadmaps = async (status) => {

  const filter = {};

  if (status) {
    filter.status = status;
  }

  const roadmaps = await Roadmap.find(filter)
    .populate("roleId", "title")
    .sort({
      createdAt: -1,
    });

  return roadmaps;
};


// =====================================
// GET ROADMAP BY ID
// =====================================

const getRoadmapById = async (id) => {

  const roadmap = await Roadmap.findById(id)
    .populate("roleId", "title");

  return roadmap;
};


// =====================================
// UPDATE ROADMAP
// =====================================

const updateRoadmap = async (id, data) => {

  const roadmap =
    await Roadmap.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    ).populate("roleId", "title");

  return roadmap;
};


// =====================================
// DELETE ROADMAP
// =====================================

const deleteRoadmap = async (id) => {

  const roadmap =
    await Roadmap.findByIdAndDelete(id);

  return roadmap;
};


export {
  createRoadmap,
  getAllRoadmaps,
  getRoadmapById,
  updateRoadmap,
  deleteRoadmap,
};