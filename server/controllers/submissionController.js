import Problem from "../models/Problem.js";
import Submission from "../models/Submission.js";
import { executeCode, isJudge0Configured } from "../utils/judge0.js";

const runAgainstTestCases = async ({ code, language, testCases }) => {
  let passedCount = 0;
  let lastOutput = "";

  for (const test of testCases) {
    const result = await executeCode({ code, language, stdin: test.input });

    if (result.compileOutput) {
      return {
        passed: false,
        output: `Compilation Error:\n${result.compileOutput}`,
        testResults: { passed: passedCount, total: testCases.length },
      };
    }

    if (result.stderr) {
      lastOutput = `Runtime Error:\n${result.stderr}`;
      continue;
    }

    const actual = (result.stdout || "").trim();
    const expected = (test.expectedOutput || "").trim();
    lastOutput = result.stdout || "";

    if (actual === expected) {
      passedCount += 1;
    }
  }

  return {
    passed: passedCount === testCases.length && testCases.length > 0,
    output: lastOutput,
    testResults: { passed: passedCount, total: testCases.length },
  };
};

export const runCode = async (req, res) => {
  try {
    if (!isJudge0Configured()) {
      return res.status(503).json({
        success: false,
        message:
          "Code execution API is not configured yet. Add JUDGE0_API_URL to server/.env (see setup instructions).",
      });
    }

    const { code, language } = req.body;
    if (!code || !language) {
      return res.status(400).json({ success: false, message: "code and language are required" });
    }

    const problem = await Problem.findById(req.params.id).select("+testCases");
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found" });
    }

    const sampleTests = problem.testCases.filter((t) => t.isSample);
    const testsToRun = sampleTests.length > 0 ? sampleTests : problem.testCases.slice(0, 1);

    const result = await runAgainstTestCases({ code, language, testCases: testsToRun });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("runCode error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to run code" });
  }
};

export const submitCode = async (req, res) => {
  try {
    if (!isJudge0Configured()) {
      return res.status(503).json({
        success: false,
        message:
          "Code execution API is not configured yet. Add JUDGE0_API_URL to server/.env (see setup instructions).",
      });
    }

    const { code, language } = req.body;
    if (!code || !language) {
      return res.status(400).json({ success: false, message: "code and language are required" });
    }

    const problem = await Problem.findById(req.params.id).select("+testCases");
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found" });
    }

    if (!problem.testCases || problem.testCases.length === 0) {
      return res.status(400).json({ success: false, message: "This problem has no test cases configured" });
    }

    const result = await runAgainstTestCases({ code, language, testCases: problem.testCases });

    const submission = await Submission.create({
      userId: req.user.id,
      problemId: problem._id,
      language,
      code,
      mode: "submit",
      passed: result.passed,
      output: result.output,
      testResults: result.testResults,
    });

    res.json({ success: true, data: { ...result, submissionId: submission._id } });
  } catch (error) {
    console.error("submitCode error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to submit code" });
  }
};