import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaBuilding,
  FaLayerGroup,
  FaDatabase,
  FaServer,
  FaCubes,
  FaProjectDiagram,
  FaComments,
  FaCode,
} from "react-icons/fa";
import DashboardLayout from "../components/DashboardLayout";
import { getCompanyById } from "../services/companyService";

const topicIcons = {
  DSA: <FaLayerGroup />,
  DBMS: <FaDatabase />,
  OS: <FaServer />,
  OOP: <FaCubes />,
  "System Design": <FaProjectDiagram />,
  Behavioral: <FaComments />,
};

function CompanyDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getCompanyById(id);
        setCompany(data);
      } catch (err) {
        console.error("Failed to load company:", err);
        setError("Could not load this company's details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout active="companies" title="Company Explorer">
        <div className="bg-white rounded-2xl border border-[var(--secondary)] p-10 animate-pulse h-64" />
      </DashboardLayout>
    );
  }

  if (error || !company) {
    return (
      <DashboardLayout active="companies" title="Company Explorer">
        <div className="bg-white rounded-2xl border border-red-200 p-10 text-center">
          <p className="text-red-600 font-semibold">{error || "Company not found."}</p>
          <Link to="/companies" className="text-[var(--primary)] font-semibold mt-3 inline-block">
            ← Back to Company Explorer
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const progressSolved = company.progress?.solved ?? 0;
  const progressTotal = company.progress?.total ?? company.codingQuestionsCount ?? 0;
  const progressPct = progressTotal > 0 ? Math.round((progressSolved / progressTotal) * 100) : 0;

  return (
    <DashboardLayout active="companies" title="Company Explorer">
      <Link
        to="/companies"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] mb-5"
      >
        <FaArrowLeft /> Back to Company Explorer
      </Link>

      {/* HEADER */}
      <div className="bg-white rounded-2xl border border-[var(--secondary)] p-6 md:p-8 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-16 h-16 rounded-xl bg-[var(--background)] flex items-center justify-center overflow-hidden shrink-0">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-2" />
            ) : (
              <FaBuilding className="text-[var(--primary)] text-2xl" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text)]">{company.name}</h1>
            <p className="text-gray-500 mt-1">{company.industry} • {company.difficulty} difficulty</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs text-gray-500">Preparation progress</p>
            <p className="text-2xl font-bold text-[var(--primary)]">{progressPct}%</p>
          </div>
        </div>
        <p className="text-gray-600 mt-5">{company.overview || company.description}</p>

        <div className="w-full bg-[var(--background)] rounded-full h-2 mt-5">
          <div
            className="bg-[var(--primary)] h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: process + topics */}
        <div className="lg:col-span-2 space-y-6">
          {/* INTERVIEW PROCESS */}
          <section className="bg-white rounded-2xl border border-[var(--secondary)] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--text)] mb-4">Interview Process</h2>
            <div className="space-y-4">
              {(company.interviewRounds || []).map((round, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text)]">{round.name}</p>
                    <p className="text-sm text-gray-500">{round.description}</p>
                  </div>
                </div>
              ))}
              {(!company.interviewRounds || company.interviewRounds.length === 0) && (
                <p className="text-sm text-gray-500">No round details available yet.</p>
              )}
            </div>
          </section>

          {/* TOPICS */}
          <section className="bg-white rounded-2xl border border-[var(--secondary)] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--text)] mb-4">Topics Covered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(company.topics || {}).map(([key, values]) => (
                <div key={key} className="border border-[var(--secondary)] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[var(--primary)] font-semibold mb-2">
                    {topicIcons[key] || <FaCode />}
                    {key}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(values || []).map((v, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[var(--background)] text-[var(--text)] px-2.5 py-1 rounded-full"
                      >
                        {v}
                      </span>
                    ))}
                    {(!values || values.length === 0) && (
                      <span className="text-xs text-gray-400">No topics listed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BEHAVIORAL */}
          {company.behavioralQuestions?.length > 0 && (
            <section className="bg-white rounded-2xl border border-[var(--secondary)] p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[var(--text)] mb-4">Behavioral Questions</h2>
              <ul className="space-y-2 list-disc list-inside text-gray-600">
                {company.behavioralQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* RIGHT: roles + coding questions */}
        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-[var(--secondary)] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--text)] mb-4">Popular Roles</h2>
            <div className="flex flex-wrap gap-2">
              {(company.popularRoles || []).map((r, i) => (
                <span
                  key={i}
                  className="text-sm bg-[var(--background)] text-[var(--primary)] px-3 py-1.5 rounded-full font-medium"
                >
                  {r}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-[var(--secondary)] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--text)] mb-3">Coding Questions</h2>
            <p className="text-3xl font-bold text-[var(--primary)]">{company.codingQuestionsCount ?? 0}</p>
            <p className="text-sm text-gray-500 mt-1">questions tagged for this company</p>
            <Link
              to={`/coding-practice?company=${encodeURIComponent(company.name)}`}
              className="mt-5 block text-center bg-[var(--primary)] text-white font-semibold py-2.5 rounded-xl hover:bg-[var(--accent)] transition"
            >
              Practice {company.name} Questions
            </Link>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CompanyDetails;
