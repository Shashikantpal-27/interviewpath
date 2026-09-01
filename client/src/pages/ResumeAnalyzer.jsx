import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import {
  FaUpload,
  FaFilePdf,
  FaLock,
  FaBullseye,
  FaChartLine,
  FaLightbulb,
  FaExclamationTriangle,
  FaPen,
  FaRocket,
  FaArrowLeft,
} from "react-icons/fa";

function ResumeAnalyzer() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    if (selectedFile.type !== "application/pdf") {
      setMessage("Only PDF files are allowed.");
      return false;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setMessage("Resume size must be less than 5 MB.");
      return false;
    }

    return true;
  };

  const handleFile = (selectedFile) => {
    if (!validateFile(selectedFile)) {
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage("");
    setAnalysis(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please upload your resume.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login to analyze your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setMessage("");
      setAnalysis(null);

      const res = await api.post(
        "/resume/analyze",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(res.data.analysis);
      setMessage("Resume analyzed successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to analyze resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* NORMAL BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#A53860] transition mb-6"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* AI Badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 bg-white border border-[#F1D5E0] text-[#A53860] px-4 py-2 rounded-full shadow-sm text-sm font-semibold">
            ✨ AI Powered
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            <span className="text-[#A53860]">
              AI
            </span>{" "}
            Resume Analyzer
          </h1>

          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Upload your resume and get AI-powered feedback to stand out.
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#F1D5E0] p-6 md:p-10">

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF7FA] text-[#A53860] flex items-center justify-center text-2xl">
              <FaUpload />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Upload Resume
              </h2>

              <p className="text-gray-500">
                Upload your resume in PDF format for best results.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 md:p-14 text-center cursor-pointer transition ${
                isDragging
                  ? "border-[#A53860] bg-[#FFF7FA]"
                  : "border-[#F1D5E0] bg-white hover:bg-[#FFF7FA]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-16 h-16 mx-auto rounded-full bg-[#FCE5ED] text-[#A53860] flex items-center justify-center text-2xl mb-4">
                <FaUpload />
              </div>

              {file ? (
                <>
                  <div className="flex items-center justify-center gap-2 text-[#670D2F] font-semibold text-lg">
                    <FaFilePdf />
                    {file.name}
                  </div>

                  <p className="text-gray-500 mt-2">
                    Click to choose a different file
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xl font-semibold text-gray-800">
                    Drag & drop your resume here
                  </p>

                  <p className="text-gray-400 my-2">
                    or
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="border border-[#EF88AD] text-[#A53860] px-6 py-2.5 rounded-xl font-semibold hover:bg-[#FFF7FA] transition"
                  >
                    Choose File
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
              <FaFilePdf />
              Supports PDF files up to 5MB
            </div>

            {message && (
              <p
                className={`text-center mt-4 font-medium ${
                  message.includes("successfully")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-[#670D2F] hover:bg-[#3A0519] text-white font-bold py-4 rounded-2xl text-lg shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Analyzing Resume..."
                : "Analyze Resume"}
            </button>

            <p className="text-center text-sm text-gray-400 mt-4 flex items-center justify-center gap-2">
              <FaLock />
              Your resume is processed securely for analysis.
            </p>

          </form>
        </div>

        {/* What You'll Get */}
        <div className="mt-14">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-[#F1D5E0] w-12" />

            <h2 className="text-2xl font-bold text-gray-900">
              What you'll get
            </h2>

            <div className="h-px bg-[#F1D5E0] w-12" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

            <FeatureCard
              icon={<FaBullseye />}
              title="ATS Score"
              description="Get your resume score out of 100"
              iconBg="bg-[#FFF7FA]"
              iconColor="text-[#A53860]"
            />

            <FeatureCard
              icon={<FaChartLine />}
              title="Skills Analysis"
              description="Identify your top skills and strengths"
              iconBg="bg-green-50"
              iconColor="text-[#A53860]"
            />

            <FeatureCard
              icon={<FaLightbulb />}
              title="Strengths"
              description="Know what makes your resume stand out"
              iconBg="bg-orange-50"
              iconColor="text-[#A53860]"
            />

            <FeatureCard
              icon={<FaExclamationTriangle />}
              title="Missing Keywords"
              description="Find important keywords you're missing"
              iconBg="bg-red-50"
              iconColor="text-red-500"
            />

            <FeatureCard
              icon={<FaPen />}
              title="Suggestions"
              description="Get AI-powered suggestions to improve your resume"
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
            />

          </div>
        </div>

        {/* Tip */}
        <div className="mt-6 bg-white border border-[#F1D5E0] rounded-2xl shadow-sm p-5 flex items-center gap-4">

          <div className="w-12 h-12 shrink-0 rounded-full bg-[#FCE5ED] text-[#A53860] flex items-center justify-center">
            ✨
          </div>

          <p className="text-gray-600 leading-relaxed">
            <span className="font-bold text-gray-900">
              Tip:
            </span>{" "}
            For better results, make sure your resume includes relevant
            skills, experience, and achievements.
          </p>

          <FaRocket className="ml-auto text-[#A53860] text-3xl hidden sm:block" />
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="mt-14">

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Resume Analysis
              </h2>

              <p className="text-gray-500 mt-2">
                Here is the AI-generated analysis of your resume.
              </p>
            </div>

            <div className="space-y-6">

              {/* ATS Score */}
              <div className="bg-white rounded-3xl shadow-lg border border-[#F1D5E0] p-8 text-center">

                <h3 className="text-2xl font-bold text-gray-900">
                  ATS Score
                </h3>

                <div className="text-6xl font-bold text-[#A53860] mt-4">
                  {analysis.atsScore}/100
                </div>

                <div className="w-full max-w-xl mx-auto bg-gray-100 rounded-full h-3 mt-6">
                  <div
                    className="bg-[#A53860] h-3 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        Math.max(
                          Number(analysis.atsScore) || 0,
                          0
                        ),
                        100
                      )}%`,
                    }}
                  />
                </div>

              </div>

              <ResultSection
                title="Skills Found"
                items={analysis.skillsFound}
              />

              <ResultSection
                title="Strengths"
                items={analysis.strengths}
              />

              <ResultSection
                title="Missing Keywords"
                items={analysis.missingKeywords}
              />

              <ResultSection
                title="Areas for Improvement"
                items={analysis.improvements}
              />

              <ResultSection
                title="Suggestions"
                items={analysis.suggestions}
              />

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  iconBg,
  iconColor,
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

      <div
        className={`w-12 h-12 rounded-full ${iconBg} ${iconColor} flex items-center justify-center text-lg`}
      >
        {icon}
      </div>

      <h3 className="font-bold text-gray-900 mt-4">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2 leading-relaxed">
        {description}
      </p>

    </div>
  );
}

function ResultSection({
  title,
  items,
}) {
  return (
    <div className="bg-white border border-[#F1D5E0] rounded-3xl shadow-lg p-6 md:p-8">

      <h3 className="text-2xl font-bold text-gray-900 mb-5">
        {title}
      </h3>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-gray-700"
            >
              {item}
            </div>
          ))}

        </div>
      ) : (
        <p className="text-gray-500">
          No data available.
        </p>
      )}

    </div>
  );
}

export default ResumeAnalyzer;