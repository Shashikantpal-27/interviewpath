import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../api/axios";

function MockInterview() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");

  const [interviewType, setInterviewType] =
    useState("Technical");

  const [questionType, setQuestionType] =
    useState("Descriptive");

  const [difficulty, setDifficulty] =
    useState("Medium");

  const [experienceLevel, setExperienceLevel] =
    useState("Fresher");

  const [questionCount, setQuestionCount] =
    useState(5);

  const [focusAreas, setFocusAreas] = useState([]);

  const availableFocusAreas = [
    "DSA",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "System Design",
  ];

  const [questionId, setQuestionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");

  const [previousQuestions, setPreviousQuestions] =
    useState([]);

  const [questionNumber, setQuestionNumber] =
    useState(0);

  const [history, setHistory] = useState([]);

  const [evaluation, setEvaluation] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [finished, setFinished] =
    useState(false);

  const toggleFocusArea = (area) => {
    setFocusAreas((prev) =>
      prev.includes(area)
        ? prev.filter((item) => item !== area)
        : [...prev, area]
    );
  };

  const startInterview = async () => {
    if (!role.trim()) {
      setError("Please enter your target role.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/interview/start",
        {
          role,
          company,
          interviewType,
          questionType,
          difficulty,
          experienceLevel,
          questionCount,
          focusAreas,
          previousQuestions: [],
        }
      );

      const newQuestion =
        response.data.question;

      setQuestionId(response.data.questionId);
      setQuestion(newQuestion);

      setOptions(
        response.data.options || []
      );

      setPreviousQuestions([
        newQuestion,
      ]);

      setQuestionNumber(1);
      setAnswer("");
      setHistory([]);
      setEvaluation(null);
      setFinished(false);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to start the interview."
      );
    } finally {
      setLoading(false);
    }
  };

  const getNextQuestion = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/interview/start",
        {
          role,
          company,
          interviewType,
          questionType,
          difficulty,
          experienceLevel,
          questionCount,
          focusAreas,
          previousQuestions,
        }
      );

      const newQuestion =
        response.data.question;

      setQuestionId(response.data.questionId);
      setQuestion(newQuestion);

      setOptions(
        response.data.options || []
      );

      setPreviousQuestions((prev) => [
        ...prev,
        newQuestion,
      ]);

      setQuestionNumber((prev) => prev + 1);
      setAnswer("");

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to generate the next question."
      );
    } finally {
      setLoading(false);
    }
  };

  const generateFinalEvaluation = async (
    responses
  ) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/interview/final-evaluation",
        {
          role,
          company,
          interviewType,
          questionType,
          difficulty,
          experienceLevel,
          focusAreas,
          responses,
        }
      );

      setEvaluation(
        response.data.evaluation
      );

      setFinished(true);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to generate final interview evaluation."
      );
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) {
      setError(
        questionType === "MCQ"
          ? "Please select an option."
          : "Please provide an answer."
      );
      return;
    }

    if (!questionId) {
      setError(
        "Question information is missing. Please restart the interview."
      );
      return;
    }

    setError("");

    const currentResponse = {
      questionId,
      question,
      answer,
    };

    const updatedHistory = [
      ...history,
      currentResponse,
    ];

    setHistory(updatedHistory);
    setAnswer("");

    if (
      questionNumber >=
      Number(questionCount)
    ) {
      await generateFinalEvaluation(
        updatedHistory
      );
      return;
    }

    await getNextQuestion();
  };

  const finishInterviewEarly = async () => {
    if (history.length === 0) {
      setError(
        "Please answer at least one question first."
      );
      return;
    }

    await generateFinalEvaluation(history);
  };

  const startNewInterview = () => {
    setRole("");
    setCompany("");

    setInterviewType("Technical");
    setQuestionType("Descriptive");
    setDifficulty("Medium");
    setExperienceLevel("Fresher");
    setQuestionCount(5);
    setFocusAreas([]);

    setQuestionId(null);
    setQuestion("");
    setOptions([]);
    setAnswer("");
    setPreviousQuestions([]);
    setQuestionNumber(0);
    setHistory([]);
    setEvaluation(null);
    setLoading(false);
    setError("");
    setFinished(false);
  };

  if (finished && evaluation) {
    return (
      <div className="min-h-screen bg-white px-4 py-10">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 bg-[#FCE5ED] text-[#670D2F] rounded-full text-sm font-semibold">
              Interview Completed
            </span>

            <h1 className="text-4xl font-bold text-gray-900 mt-4">
              Interview Summary
            </h1>

            <p className="text-gray-500 mt-2">
              {role}
              {company && ` • ${company}`}
            </p>
          </div>

          <div className="bg-white border rounded-3xl shadow-sm p-8 text-center mb-6">
            <p className="text-gray-500">
              Overall Score
            </p>

            <p className="text-6xl font-bold text-[#A53860] mt-3">
              {evaluation.overallScore}/10
            </p>

            <p className="text-gray-500 mt-3">
              {history.length} question
              {history.length !== 1 ? "s" : ""} answered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <ScoreCard
              title="Technical Knowledge"
              score={evaluation.technicalScore}
            />

            <ScoreCard
              title="Problem Solving"
              score={evaluation.problemSolvingScore}
            />

            <ScoreCard
              title="Communication"
              score={evaluation.communicationScore}
            />
          </div>

          <div className="bg-white border rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold mb-5">
              Interview Configuration
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Info
                label="Interview Type"
                value={interviewType}
              />

              <Info
                label="Question Format"
                value={questionType}
              />

              <Info
                label="Difficulty"
                value={difficulty}
              />

              <Info
                label="Experience"
                value={experienceLevel}
              />

              <Info
                label="Question Count"
                value={questionCount}
              />

              <Info
                label="Focus Areas"
                value={
                  focusAreas.length
                    ? focusAreas.join(", ")
                    : "General"
                }
              />
            </div>
          </div>

          <ResultSection
            title="Strengths"
            items={evaluation.strengths}
          />

          <ResultSection
            title="Areas to Improve"
            items={evaluation.weakAreas}
          />

          <ResultSection
            title="Recommendations"
            items={evaluation.recommendations}
          />

          <div className="bg-white border rounded-2xl shadow-sm p-6 mt-6">
            <h2 className="text-2xl font-bold">
              Overall Feedback
            </h2>

            <p className="text-gray-600 leading-relaxed mt-4">
              {evaluation.overallFeedback}
            </p>
          </div>

          <div className="bg-white border rounded-2xl shadow-sm p-6 mt-6">
            <h2 className="text-2xl font-bold mb-5">
              Interview Responses
            </h2>

            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-5 bg-gray-50"
                >
                  <p className="font-semibold text-gray-900">
                    Question {index + 1}
                  </p>

                  <p className="text-gray-600 mt-2">
                    {item.question}
                  </p>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Your Answer
                    </p>

                    <p className="text-gray-700 mt-1">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startNewInterview}
            className="w-full mt-6 bg-[#670D2F] hover:bg-[#3A0519] text-white py-4 rounded-xl font-semibold"
          >
            Start New Interview
          </button>
        </div>
      </div>
    );
  }

  if (question) {
    return (
      <div className="min-h-screen bg-white px-4 py-10">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 bg-[#FCE5ED] text-[#670D2F] rounded-full text-sm font-semibold">
              AI Mock Interview
            </span>

            <h1 className="text-4xl font-bold text-gray-900 mt-4">
              Question {questionNumber}
            </h1>

            <p className="text-gray-500 mt-2">
              {role}
              {company && ` • ${company}`}
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-5 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">
                Interview Progress
              </span>

              <span className="font-semibold">
                {questionNumber} / {questionCount}
              </span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-[#A53860] rounded-full transition-all"
                style={{
                  width: `${Math.min(
                    (questionNumber /
                      Number(questionCount)) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className="bg-white border rounded-2xl shadow-sm p-6">

            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 rounded-full bg-[#FCE5ED] text-[#670D2F] text-xs font-semibold">
                {interviewType}
              </span>

              <span className="px-3 py-1 rounded-full bg-[#FFF0F5] text-[#A53860] text-xs font-semibold">
                {questionType}
              </span>

              <span className="px-3 py-1 rounded-full bg-[#EF88AD] text-[#3A0519] text-xs font-semibold">
                {difficulty}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-3">
              Interview Question
            </p>

            <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
              {question}
            </h2>

            {questionType === "MCQ" && (
              <div className="mt-6 space-y-3">
                {options.length > 0 ? (
                  options.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      disabled={loading}
                      onClick={() => {
                        setAnswer(option);
                        setError("");
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition ${
                        answer === option
                          ? "border-[#A53860] bg-[#FFF7FA] text-[#670D2F]"
                          : "border-[#F1D5E0] hover:border-[#A53860]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 font-semibold text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>

                        <span className="pt-1">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No MCQ options were returned.
                  </p>
                )}
              </div>
            )}

            {questionType !== "MCQ" &&
              questionType !== "Coding" && (
                <textarea
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setError("");
                  }}
                  rows={8}
                  placeholder="Type your answer here..."
                  className="w-full mt-6 border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#A53860] resize-none"
                />
              )}

            {questionType === "Coding" && (
              <textarea
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setError("");
                }}
                rows={14}
                placeholder="// Write your code here..."
                className="w-full mt-6 bg-gray-900 text-green-300 border border-gray-700 rounded-xl p-5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#A53860] resize-none"
              />
            )}

            {error && (
              <p className="text-red-500 mt-4">
                {error}
              </p>
            )}

            <button
              onClick={submitAnswer}
              disabled={
                loading || !answer.trim()
              }
              className="w-full mt-5 bg-[#670D2F] hover:bg-[#3A0519] text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Saving Answer..."
                : questionNumber >=
                  Number(questionCount)
                ? "Finish Interview"
                : "Submit Answer →"}
            </button>

            {history.length > 0 &&
              questionNumber <
                Number(questionCount) && (
                <button
                  onClick={finishInterviewEarly}
                  disabled={loading}
                  className="w-full mt-3 bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-semibold disabled:opacity-50"
                >
                  {loading
                    ? "Generating Final Report..."
                    : "Finish Interview Early"}
                </button>
              )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* NORMAL BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#A53860] font-semibold transition mb-6"
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="flex justify-center">
          <span className="px-4 py-2 rounded-full bg-[#FFF7FA] border border-[#EF88AD] text-[#670D2F] text-sm font-semibold shadow-sm">
            🤖 AI Powered
          </span>
        </div>

        <div className="text-center mt-5">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            <span className="text-[#A53860]">
              AI
            </span>{" "}
            Mock Interview
          </h1>

          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Customize your interview and practice exactly what you need.
          </p>
        </div>

        <div className="bg-white border border-[#F1D5E0] rounded-3xl shadow-xl p-6 md:p-10 mt-10">

          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Configure Your Interview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                Target Role
              </label>

              <input
                type="text"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setError("");
                }}
                placeholder="e.g. MERN Stack Developer"
                className="w-full border border-[#F1D5E0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A53860]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                Target Company
                <span className="text-gray-400 text-sm ml-2">
                  Optional
                </span>
              </label>

              <input
                type="text"
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
                }
                placeholder="e.g. Amazon"
                className="w-full border border-[#F1D5E0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A53860]"
              />
            </div>
          </div>

          <div className="mt-7">
            <label className="block font-semibold text-gray-900 mb-3">
              Interview Type
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "Technical",
                "Coding",
                "Behavioral",
                "System Design",
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setInterviewType(type);

                    if (type === "Coding") {
                      setQuestionType("Coding");
                    }

                    if (
                      type === "Behavioral" ||
                      type === "System Design"
                    ) {
                      setQuestionType(
                        "Descriptive"
                      );
                    }
                  }}
                  className={`py-3 rounded-xl border font-semibold transition ${
                    interviewType === type
                      ? "bg-[#670D2F] text-white border-[#670D2F]"
                      : "bg-white text-gray-700 border-[#F1D5E0] hover:border-[#A53860]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <label className="block font-semibold text-gray-900 mb-3">
              Question Format
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                "MCQ",
                "Descriptive",
                "Coding",
              ].map((type) => {
                const disabled =
                  interviewType === "Coding" &&
                  type !== "Coding";

                const disabledByType =
                  (
                    interviewType ===
                      "Behavioral" ||
                    interviewType ===
                      "System Design"
                  ) &&
                  type !== "Descriptive";

                const isDisabled =
                  disabled || disabledByType;

                return (
                  <button
                    key={type}
                    type="button"
                    disabled={isDisabled}
                    onClick={() =>
                      setQuestionType(type)
                    }
                    className={`py-3 rounded-xl border font-semibold transition ${
                      questionType === type
                        ? "bg-[#670D2F] text-white border-[#670D2F]"
                        : isDisabled
                        ? "bg-[#FFF7FA] text-gray-400 border-[#F1D5E0] cursor-not-allowed"
                        : "bg-white text-gray-700 border-[#F1D5E0] hover:border-[#A53860]"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A53860]"
              >
                <option value="Easy">
                  Easy
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Hard">
                  Hard
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                Experience Level
              </label>

              <select
                value={experienceLevel}
                onChange={(e) =>
                  setExperienceLevel(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A53860]"
              >
                <option value="Fresher">
                  Fresher
                </option>

                <option value="0–2 Years">
                  0–2 Years
                </option>

                <option value="2–5 Years">
                  2–5 Years
                </option>

                <option value="5+ Years">
                  5+ Years
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                Number of Questions
              </label>

              <select
                value={questionCount}
                onChange={(e) =>
                  setQuestionCount(
                    Number(e.target.value)
                  )
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A53860]"
              >
                <option value={5}>
                  5 Questions
                </option>

                <option value={10}>
                  10 Questions
                </option>

                <option value={15}>
                  15 Questions
                </option>
              </select>
            </div>
          </div>

          <div className="mt-7">
            <label className="block font-semibold text-gray-900 mb-3">
              Focus Areas
            </label>

            <div className="flex flex-wrap gap-3">
              {availableFocusAreas.map(
                (area) => {
                  const selected =
                    focusAreas.includes(area);

                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() =>
                        toggleFocusArea(area)
                      }
                      className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
                        selected
                          ? "bg-[#FCE5ED] text-[#670D2F] border-[#EF88AD]"
                          : "bg-white text-gray-600 border-[#F1D5E0] hover:border-[#A53860]"
                      }`}
                    >
                      {selected ? "✓ " : ""}
                      {area}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {error && (
            <p className="text-center text-red-500 font-medium mt-6">
              {error}
            </p>
          )}

          <button
            onClick={startInterview}
            disabled={loading}
            className="w-full mt-8 bg-[#670D2F] hover:bg-[#3A0519] text-white py-4 rounded-2xl font-bold text-lg shadow-lg disabled:opacity-50"
          >
            {loading
              ? "Generating Question..."
              : "✨ Start AI Interview"}
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            Your configuration is used to personalize the interview.
          </p>

        </div>
      </div>
    </div>
  );
}

function ResultSection({
  title,
  items,
}) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6 mt-6">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <div className="space-y-3 mt-4">
        {items?.length ? (
          items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 border rounded-xl p-4 text-gray-700"
            >
              {item}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No data available.
          </p>
        )}
      </div>
    </div>
  );
}

function ScoreCard({
  title,
  score,
}) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6 text-center">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <p className="text-4xl font-bold text-[#A53860] mt-2">
        {score ?? 0}/10
      </p>
    </div>
  );
}

function Info({
  label,
  value,
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="font-semibold text-gray-800 mt-1">
        {value}
      </p>
    </div>
  );
}

export default MockInterview;