import InterviewExperience from "../models/InterviewExperience.js";
import Comment from "../models/Comment.js";
import Company from "../models/Company.js";
import Role from "../models/Role.js";

// =====================================
// GET APPROVED INTERVIEW EXPERIENCES
// =====================================

const getApprovedExperiences = async (req, res) => {
  try {
    const experiences = await InterviewExperience.find({
      status: "approved",
    })
      .populate("userId", "fullName email")
      .populate("companyId", "name")
      .populate("roleId", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error("Get approved experiences error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch interview experiences",
    });
  }
};

// =====================================
// CREATE INTERVIEW EXPERIENCE
// =====================================

const createExperience = async (req, res) => {
  try {
    const {
      company,
      role,
      title,
      experience,
      interviewDate,
      difficulty,
    } = req.body;

    // Required fields
    if (!company || !role || !title || !experience) {
      return res.status(400).json({
        success: false,
        message: "Company, role, title and experience are required",
      });
    }

    // Company name se actual Company document find karo
    const companyData = await Company.findOne({
      name: company.trim(),
    });

    if (!companyData) {
      return res.status(404).json({
        success: false,
        message:
          "Company not found. Please enter a company name that exists in the database.",
      });
    }

    // Role title se actual Role document find karo
    const roleData = await Role.findOne({
      title: role.trim(),
    });

    if (!roleData) {
      return res.status(404).json({
        success: false,
        message:
          "Role not found. Please enter a role that exists in the database.",
      });
    }

    // Difficulty ko lowercase mein convert karo
    const normalizedDifficulty = difficulty
      ? difficulty.toLowerCase()
      : "medium";

    const newExperience = await InterviewExperience.create({
      userId: req.user.id,
      companyId: companyData._id,
      roleId: roleData._id,
      title: title.trim(),
      experience: experience.trim(),
      interviewDate: interviewDate || undefined,
      difficulty: normalizedDifficulty,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Interview experience submitted for approval",
      data: newExperience,
    });
  } catch (error) {
    console.error("Create experience error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit interview experience",
    });
  }
};

// =====================================
// LIKE / UNLIKE EXPERIENCE
// =====================================

const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const experience = await InterviewExperience.findById(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Interview experience not found",
      });
    }

    const alreadyLiked = experience.likes.some(
      (like) => like.toString() === userId.toString()
    );

    if (alreadyLiked) {
      experience.likes = experience.likes.filter(
        (like) => like.toString() !== userId.toString()
      );
    } else {
      experience.likes.push(userId);
    }

    await experience.save();

    return res.status(200).json({
      success: true,
      liked: !alreadyLiked,
      likesCount: experience.likes.length,
    });
  } catch (error) {
    console.error("Toggle like error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update like",
    });
  }
};

// =====================================
// GET COMMENTS
// =====================================

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      postId: req.params.id,
    })
      .populate("userId", "fullName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("Get comments error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};

// =====================================
// CREATE COMMENT
// =====================================

const createComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const experience = await InterviewExperience.findOne({
      _id: req.params.id,
      status: "approved",
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Interview experience not found",
      });
    }

    const comment = await Comment.create({
      postId: req.params.id,
      userId: req.user.id,
      text: text.trim(),
    });

    const populatedComment = await comment.populate(
      "userId",
      "fullName email"
    );

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: populatedComment,
    });
  } catch (error) {
    console.error("Create comment error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};

export {
  getApprovedExperiences,
  createExperience,
  toggleLike,
  getComments,
  createComment,
};