import InterviewExperience from "../models/InterviewExperience.js";


// =====================================
// GET ALL INTERVIEW EXPERIENCES
// =====================================

const getAllInterviewExperiences = async (status) => {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  const experiences = await InterviewExperience.find(filter)
    .populate("userId", "name email")
    .populate("companyId", "name")
    .populate("roleId", "title")
    .sort({
      createdAt: -1,
    });

  return experiences;
};


// =====================================
// GET INTERVIEW EXPERIENCE BY ID
// =====================================

const getInterviewExperienceById = async (id) => {
  const experience = await InterviewExperience.findById(id)
    .populate("userId", "name email")
    .populate("companyId", "name")
    .populate("roleId", "title");

  return experience;
};


// =====================================
// APPROVE
// =====================================

const approveInterviewExperience = async (id) => {
  const experience =
    await InterviewExperience.findByIdAndUpdate(
      id,
      {
        status: "approved",
        rejectionReason: "",
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("userId", "name email")
      .populate("companyId", "name")
      .populate("roleId", "title");

  return experience;
};


// =====================================
// REJECT
// =====================================

const rejectInterviewExperience = async (
  id,
  rejectionReason
) => {
  const experience =
    await InterviewExperience.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        rejectionReason,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("userId", "name email")
      .populate("companyId", "name")
      .populate("roleId", "title");

  return experience;
};


// =====================================
// DELETE
// =====================================

const deleteInterviewExperience = async (id) => {
  const experience =
    await InterviewExperience.findByIdAndDelete(id);

  return experience;
};


export {
  getAllInterviewExperiences,
  getInterviewExperienceById,
  approveInterviewExperience,
  rejectInterviewExperience,
  deleteInterviewExperience,
};