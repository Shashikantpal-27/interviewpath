import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaLightbulb,
  FaPlay,
  FaPaperPlane,
  FaExpand,
  FaCompress,
  FaTimes,
} from "react-icons/fa";

import DashboardLayout from "../components/DashboardLayout";
import CodeEditor from "../components/CodeEditor";

import {
  getProblemById,
  runCode,
  submitCode,
} from "../services/problemService";

const LANGUAGES = [
  "JavaScript",
  "Python",
  "C++",
  "Java",
];

const STARTER = {
  JavaScript:
    "function solve() {\n  // your code here\n}\n",

  Python:
    "def solve():\n    # your code here\n    pass\n",

  "C++":
    "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // your code here\n    return 0;\n}\n",

  Java:
    "public class Main {\n    public static void main(String[] args) {\n        // your code here\n    }\n}\n",
};

const difficultyColor = {
  Easy: "text-[#670D2F] bg-[#FCE5ED]",
  Medium: "text-[#A53860] bg-[#FFF0F5]",
  Hard: "text-[#3A0519] bg-[#EF88AD]",
};

function ProblemDetail() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [language, setLanguage] =
    useState("JavaScript");

  const [code, setCode] =
    useState(STARTER.JavaScript);

  const [showHints, setShowHints] =
    useState(false);

  const [running, setRunning] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [runError, setRunError] =
    useState("");

  const [isFullscreen, setIsFullscreen] =
    useState(false);

  // ================= FETCH PROBLEM =================

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      setError("");

      try {
        const data =
          await getProblemById(id);

        setProblem(data);
      } catch (err) {
        console.error(
          "Failed to load problem:",
          err
        );

        setError(
          "Could not load this problem."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  // ================= ESC FULLSCREEN =================

  useEffect(() => {
    const handleEscape = (event) => {
      if (
        event.key === "Escape" &&
        isFullscreen
      ) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isFullscreen]);

  // ================= LANGUAGE CHANGE =================

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(STARTER[lang]);
    setResult(null);
    setRunError("");
  };

  // ================= RUN CODE =================

  const handleRun = async () => {
    setRunning(true);
    setRunError("");
    setResult(null);

    try {
      const res = await runCode(id, {
        code,
        language,
      });

      setResult(res.data);
    } catch (err) {
      console.error("Run failed:", err);

      setRunError(
        err.response?.data?.message ||
          "Could not run code. Please try again."
      );
    } finally {
      setRunning(false);
    }
  };

  // ================= SUBMIT CODE =================

  const handleSubmit = async () => {
    setSubmitting(true);
    setRunError("");
    setResult(null);

    try {
      const res = await submitCode(id, {
        code,
        language,
      });

      setResult(res.data);
    } catch (err) {
      console.error("Submit failed:", err);

      setRunError(
        err.response?.data?.message ||
          "Could not submit code. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <DashboardLayout
        active="coding"
        title="Coding Practice"
      >
        <div className="bg-white rounded-2xl border border-[var(--secondary)] p-10 animate-pulse h-64" />
      </DashboardLayout>
    );
  }

  // ================= ERROR =================

  if (error || !problem) {
    return (
      <DashboardLayout
        active="coding"
        title="Coding Practice"
      >
        <div className="bg-white rounded-2xl border border-red-200 p-10 text-center">

          <p className="text-red-600 font-semibold">
            {error || "Problem not found."}
          </p>

          <Link
            to="/coding-practice"
            className="text-[var(--primary)] font-semibold mt-3 inline-block"
          >
            ← Back to Coding Practice
          </Link>

        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      active="coding"
      title="Coding Practice"
    >

      {/* BACK BUTTON */}

      <Link
        to="/coding-practice"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] mb-5"
      >
        <FaArrowLeft />
        Back to Coding Practice
      </Link>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ================= LEFT PROBLEM ================= */}

        <div className="bg-white rounded-2xl border border-[var(--secondary)] p-6 shadow-sm space-y-5 max-h-[85vh] overflow-y-auto">

          {/* TITLE */}

          <div>

            <div className="flex items-center gap-3 mb-2 flex-wrap">

              <h1 className="text-xl font-bold text-[var(--text)]">
                {problem.title}
              </h1>

              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  difficultyColor[
                    problem.difficulty
                  ]
                }`}
              >
                {problem.difficulty}
              </span>

            </div>


            {/* TAGS */}

            <div className="flex flex-wrap gap-2">

              <span className="text-xs bg-[var(--background)] text-[var(--info)] px-2.5 py-1 rounded-full">
                {problem.topic}
              </span>

              {(problem.companyTags || []).map(
                (company, index) => (
                  <span
                    key={index}
                    className="text-xs bg-[var(--background)] text-[var(--primary)] px-2.5 py-1 rounded-full"
                  >
                    {company}
                  </span>
                )
              )}

            </div>

          </div>


          {/* DESCRIPTION */}

          <div>

            <h2 className="font-semibold text-[var(--text)] mb-1">
              Description
            </h2>

            <p className="text-gray-600 whitespace-pre-line">
              {problem.description}
            </p>

          </div>


          {/* EXAMPLES */}

          {problem.examples?.length > 0 && (

            <div>

              <h2 className="font-semibold text-[var(--text)] mb-2">
                Examples
              </h2>

              <div className="space-y-3">

                {problem.examples.map(
                  (example, index) => (

                    <div
                      key={index}
                      className="bg-[var(--background)] rounded-xl p-4 text-sm font-mono"
                    >

                      <p>
                        <span className="font-semibold">
                          Input:
                        </span>{" "}
                        {example.input}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Output:
                        </span>{" "}
                        {example.output}
                      </p>

                      {example.explanation && (
                        <p className="mt-1 text-gray-600 font-sans">
                          {example.explanation}
                        </p>
                      )}

                    </div>

                  )
                )}

              </div>

            </div>

          )}


          {/* CONSTRAINTS */}

          {problem.constraints?.length > 0 && (

            <div>

              <h2 className="font-semibold text-[var(--text)] mb-1">
                Constraints
              </h2>

              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">

                {problem.constraints.map(
                  (constraint, index) => (
                    <li key={index}>
                      {constraint}
                    </li>
                  )
                )}

              </ul>

            </div>

          )}


          {/* HINTS */}

          {problem.hints?.length > 0 && (

            <div>

              <button
                onClick={() =>
                  setShowHints(!showHints)
                }
                className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
              >
                <FaLightbulb />

                {showHints
                  ? "Hide Hints"
                  : "Show Hints"}

              </button>


              {showHints && (

                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mt-2">

                  {problem.hints.map(
                    (hint, index) => (
                      <li key={index}>
                        {hint}
                      </li>
                    )
                  )}

                </ul>

              )}

            </div>

          )}

        </div>


        {/* ================= RIGHT EDITOR ================= */}

        <div className="space-y-4">

          {/* LANGUAGE SELECT */}

          <div className="flex flex-wrap gap-2">

            {LANGUAGES.map((lang) => (

              <button
                key={lang}
                onClick={() =>
                  handleLanguageChange(lang)
                }
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  language === lang
                    ? "bg-[var(--primary)] text-white"
                    : "bg-white border border-[var(--secondary)] text-[var(--text)] hover:bg-[var(--background)]"
                }`}
              >
                {lang}
              </button>

            ))}

          </div>


          {/* ================= CODE EDITOR ================= */}

          <div className="bg-white rounded-2xl border border-[var(--secondary)] overflow-hidden">

            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--secondary)]">

              <h3 className="font-semibold text-[var(--text)]">
                Code Editor
              </h3>

              <button
                onClick={() =>
                  setIsFullscreen(true)
                }
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--secondary)] hover:bg-[var(--background)] transition"
                title="Open Full Screen"
              >
                <FaExpand />
              </button>

            </div>

            <div className="p-2">
              <CodeEditor
                code={code}
                onChange={setCode}
                language={language}
              />
            </div>

          </div>


          {/* ================= ACTION BUTTONS ================= */}

          <div className="flex gap-3">

            <button
              onClick={handleRun}
              disabled={
                running || submitting
              }
              className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-[var(--primary)] text-[var(--primary)] font-semibold py-3 rounded-xl hover:bg-[var(--background)] transition disabled:opacity-50"
            >
              <FaPlay />

              {running
                ? "Running..."
                : "Run Code"}

            </button>


            <button
              onClick={handleSubmit}
              disabled={
                running || submitting
              }
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--primary)] text-white font-semibold py-3 rounded-xl hover:bg-[var(--accent)] transition disabled:opacity-50"
            >
              <FaPaperPlane />

              {submitting
                ? "Submitting..."
                : "Submit"}

            </button>

          </div>


          {/* RUN ERROR */}

          {runError && (

            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
              {runError}
            </div>

          )}


          {/* RESULT */}

          {result && (

            <div
              className={`rounded-xl p-4 border ${
                result.passed
                  ? "bg-green-50 border-green-200"
                  : "bg-yellow-50 border-yellow-200"
              }`}
            >

              <p
                className={`font-semibold ${
                  result.passed
                    ? "text-green-700"
                    : "text-yellow-700"
                }`}
              >
                {result.passed
                  ? "✓ All test cases passed"
                  : "Some test cases failed"}
              </p>


              {result.output && (

                <pre className="text-xs font-mono mt-2 whitespace-pre-wrap text-gray-700">
                  {result.output}
                </pre>

              )}


              {result.testResults && (

                <p className="text-sm text-gray-600 mt-2">

                  {result.testResults.passed}/
                  {result.testResults.total} test cases passed

                </p>

              )}

            </div>

          )}

        </div>

      </div>


      {/* ================= FULLSCREEN EDITOR ================= */}

      {isFullscreen && (

        <div className="fixed inset-0 z-[9999] bg-white p-4 flex flex-col">

          {/* FULLSCREEN HEADER */}

          <div className="flex items-center justify-between border-b pb-3 mb-3">

            <div className="flex items-center gap-3">

              <h2 className="text-lg font-bold text-[var(--text)]">
                Code Editor
              </h2>

              <span className="text-sm text-gray-500">
                {problem.title}
              </span>

            </div>


            <div className="flex items-center gap-2">

              <select
                value={language}
                onChange={(e) =>
                  handleLanguageChange(
                    e.target.value
                  )
                }
                className="border border-gray-200 rounded-lg px-3 py-2 outline-none"
              >

                {LANGUAGES.map((lang) => (

                  <option
                    key={lang}
                    value={lang}
                  >
                    {lang}
                  </option>

                ))}

              </select>


              <button
                onClick={() =>
                  setIsFullscreen(false)
                }
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100"
                title="Exit Full Screen"
              >
                <FaCompress />
              </button>

            </div>

          </div>


          {/* EDITOR */}

          <div className="flex-1 min-h-0">

            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
            />

          </div>


          {/* FULLSCREEN ACTIONS */}

          <div className="flex gap-3 pt-4">

            <button
              onClick={handleRun}
              disabled={
                running || submitting
              }
              className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-[var(--primary)] text-[var(--primary)] font-semibold py-3 rounded-xl disabled:opacity-50"
            >
              <FaPlay />

              {running
                ? "Running..."
                : "Run Code"}

            </button>


            <button
              onClick={handleSubmit}
              disabled={
                running || submitting
              }
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--primary)] text-white font-semibold py-3 rounded-xl disabled:opacity-50"
            >
              <FaPaperPlane />

              {submitting
                ? "Submitting..."
                : "Submit"}

            </button>

          </div>


          {/* FULLSCREEN RESULT */}

          {runError && (

            <div className="mt-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
              {runError}
            </div>

          )}

        </div>

      )}

    </DashboardLayout>
  );
}

export default ProblemDetail;