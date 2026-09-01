import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch, FaCode } from "react-icons/fa";
import DashboardLayout from "../components/DashboardLayout";
import ProblemCard from "../components/ProblemCard";
import { getProblems } from "../services/problemService";

function StatBox({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--secondary)] p-5 shadow-sm">
      <p className="text-xs text-gray-500">{label}</p>

      <p
        className={`text-2xl font-bold mt-1 ${
          color || "text-[var(--text)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function CodingPractice() {
  const [searchParams] = useSearchParams();
  const companyFromUrl = searchParams.get("company") || "All";

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [company, setCompany] = useState(companyFromUrl);
  const [status, setStatus] = useState("All");

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getProblems();
        setProblems(data || []);
      } catch (err) {
        console.error("Failed to load problems:", err);
        setError("Could not load coding questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const topics = useMemo(
    () => [
      "All",
      ...new Set(problems.map((p) => p.topic).filter(Boolean)),
    ],
    [problems]
  );

  const companies = useMemo(
    () => [
      "All",
      ...new Set(
        problems.flatMap((p) => p.companyTags || [])
      ),
    ],
    [problems]
  );

  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const statuses = [
    "All",
    "Solved",
    "Attempted",
    "Unsolved",
  ];

  const filtered = problems.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDifficulty =
      difficulty === "All" ||
      p.difficulty === difficulty;

    const matchesTopic =
      topic === "All" ||
      p.topic === topic;

    const matchesCompany =
      company === "All" ||
      (p.companyTags || []).includes(company);

    const matchesStatus =
      status === "All" ||
      (p.status || "Unsolved") === status;

    return (
      matchesSearch &&
      matchesDifficulty &&
      matchesTopic &&
      matchesCompany &&
      matchesStatus
    );
  });

  const stats = useMemo(() => {
    const total = problems.length;

    const solved = problems.filter(
      (p) => p.status === "Solved"
    ).length;

    const attempted = problems.filter(
      (p) => p.status === "Attempted"
    ).length;

    const unsolved =
      total - solved - attempted;

    const easy = problems.filter(
      (p) => p.difficulty === "Easy"
    ).length;

    const medium = problems.filter(
      (p) => p.difficulty === "Medium"
    ).length;

    const hard = problems.filter(
      (p) => p.difficulty === "Hard"
    ).length;

    return {
      total,
      solved,
      attempted,
      unsolved,
      easy,
      medium,
      hard,
    };
  }, [problems]);

  const progressPct =
    stats.total > 0
      ? Math.round(
          (stats.solved / stats.total) * 100
        )
      : 0;

  return (
    <DashboardLayout
      active="coding"
      title="Coding Practice"
      subtitle="Sharpen your DSA skills with real interview-style problems."
    >
      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">

        <StatBox
          label="Total"
          value={loading ? "…" : stats.total}
        />

        <StatBox
          label="Solved"
          value={loading ? "…" : stats.solved}
          color="text-[#A53860]"
        />

        <StatBox
          label="Attempted"
          value={loading ? "…" : stats.attempted}
          color="text-[#A53860]"
        />

        <StatBox
          label="Unsolved"
          value={loading ? "…" : stats.unsolved}
          color="text-gray-500"
        />

        <StatBox
          label="Easy"
          value={loading ? "…" : stats.easy}
          color="text-[#A53860]"
        />

        <StatBox
          label="Medium"
          value={loading ? "…" : stats.medium}
          color="text-[#670D2F]"
        />

        <StatBox
          label="Hard"
          value={loading ? "…" : stats.hard}
          color="text-[#670D2F]"
        />

      </div>

      {/* PROGRESS */}
      <div className="bg-white rounded-2xl border border-[var(--secondary)] p-6 shadow-sm mb-6">

        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-[var(--text)]">
            Overall Progress
          </p>

          <p className="text-sm font-semibold text-[#A53860]">
            {progressPct}%
          </p>
        </div>

        <div className="w-full bg-[#FCE5ED] rounded-full h-2">
          <div
            className="bg-[#670D2F] h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

      </div>

      {/* SEARCH + FILTERS */}
      <div className="bg-white rounded-2xl border border-[var(--secondary)] p-5 shadow-sm mb-6">

        <div className="relative mb-4">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A53860]" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search coding questions..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[#A53860]"
          />

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

          <Select
            label="Difficulty"
            value={difficulty}
            onChange={setDifficulty}
            options={difficulties}
          />

          <Select
            label="Topic"
            value={topic}
            onChange={setTopic}
            options={topics}
          />

          <Select
            label="Company"
            value={company}
            onChange={setCompany}
            options={companies}
          />

          <Select
            label="Status"
            value={status}
            onChange={setStatus}
            options={statuses}
          />

        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="space-y-3">

          {Array.from({ length: 6 }).map(
            (_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[var(--secondary)] h-16 animate-pulse"
              />
            )
          )}

        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="bg-[#FFF7FA] rounded-2xl border border-[#F1D5E0] p-8 text-center">

          <p className="text-[#A53860] font-semibold">
            {error}
          </p>

        </div>
      )}

      {/* NO RESULTS */}
      {!loading &&
        !error &&
        filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-[var(--secondary)] p-10 text-center">

            <FaCode className="text-4xl text-[#A53860] mx-auto mb-3" />

            <p className="text-[var(--text)] font-semibold">
              No questions found
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Try adjusting your search or filters.
            </p>

          </div>
        )}

      {/* RESULTS */}
      {!loading &&
        !error &&
        filtered.length > 0 && (
          <>

            <p className="text-sm text-gray-500 mb-3">
              {filtered.length} questions found
            </p>

            <div className="space-y-3">

              {filtered.map((p) => (
                <ProblemCard
                  key={p._id}
                  problem={p}
                />
              ))}

            </div>

          </>
        )}

    </DashboardLayout>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="text-xs font-semibold text-gray-500 block mb-1">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full px-4 py-2.5 rounded-xl border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[#A53860] bg-white"
      >

        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
          >
            {opt}
          </option>
        ))}

      </select>

    </div>
  );
}

export default CodingPractice;