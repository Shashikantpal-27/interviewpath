import Problem from "../models/Problem.js";
import Submission from "../models/Submission.js";

const attachStatus = async (problems, userId) => {
  const submissions = await Submission.find({ userId }).select("problemId passed");

  const statusMap = {};
  submissions.forEach((s) => {
    const id = s.problemId.toString();
    if (s.passed) {
      statusMap[id] = "Solved";
    } else if (!statusMap[id]) {
      statusMap[id] = "Attempted";
    }
  });

  return problems.map((p) => ({
    ...p.toObject(),
    status: statusMap[p._id.toString()] || "Unsolved",
  }));
};

export const getProblems = async (req, res) => {
  try {
    const { search, difficulty, topic, company } = req.query;
    const query = {};

    if (search) query.title = { $regex: search, $options: "i" };
    if (difficulty && difficulty !== "All") query.difficulty = difficulty;
    if (topic && topic !== "All") query.topic = topic;
    if (company && company !== "All") query.companyTags = company;

    const problems = await Problem.find(query).sort({ createdAt: 1 });
    const withStatus = await attachStatus(problems, req.user.id);

    res.json({ success: true, data: withStatus });
  } catch (error) {
    console.error("getProblems error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch problems" });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found" });
    }

    // Only sample test cases go to the client - never the full hidden set
    const sampleTests = (problem.testCases || []).filter((t) => t.isSample);

    res.json({
      success: true,
      data: { ...problem.toObject(), testCases: undefined, sampleTests },
    });
  } catch (error) {
    console.error("getProblemById error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch problem" });
  }
};

export const getProblemStats = async (req, res) => {
  try {
    const problems = await Problem.find();
    const withStatus = await attachStatus(problems, req.user.id);

    const stats = {
      total: withStatus.length,
      solved: withStatus.filter((p) => p.status === "Solved").length,
      attempted: withStatus.filter((p) => p.status === "Attempted").length,
      easy: withStatus.filter((p) => p.difficulty === "Easy").length,
      medium: withStatus.filter((p) => p.difficulty === "Medium").length,
      hard: withStatus.filter((p) => p.difficulty === "Hard").length,
    };
    stats.unsolved = stats.total - stats.solved - stats.attempted;

    res.json({ success: true, data: stats });
  } catch (error) {
    console.error("getProblemStats error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};