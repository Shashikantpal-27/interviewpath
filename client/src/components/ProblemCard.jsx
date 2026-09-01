import { Link } from "react-router-dom";

import {
  FaCheckCircle,
  FaClock,
  FaCircle,
} from "react-icons/fa";

const difficultyColor = {
  Easy: "bg-[#FCE5ED] text-[#670D2F]",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

const statusIcon = {
  Solved: <FaCheckCircle className="text-[#A53860]" />,
  Attempted: <FaClock className="text-yellow-600" />,
  Unsolved: <FaCircle className="text-gray-300" />,
};

function ProblemCard({ problem }) {
  const status = problem.status || "Unsolved";

  return (
    <Link
      to={`/coding-practice/${problem._id}`}
      className="flex items-center justify-between gap-4 bg-white rounded-xl border border-[var(--secondary)] p-4 hover:shadow-md hover:-translate-y-0.5 transition"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-lg shrink-0">
          {statusIcon[status]}
        </span>

        <div className="min-w-0">
          <p className="font-semibold text-[var(--text)] truncate">
            {problem.title}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                difficultyColor[problem.difficulty] ||
                "bg-gray-100 text-gray-700"
              }`}
            >
              {problem.difficulty}
            </span>

            <span className="text-xs text-gray-500">
              {problem.topic}
            </span>

            {problem.companyTags?.slice(0, 2).map((c, i) => (
              <span
                key={i}
                className="text-xs bg-[var(--background)] text-[var(--info)] px-2 py-0.5 rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <span className="text-sm font-semibold text-[var(--primary)] shrink-0">
        Solve →
      </span>
    </Link>
  );
}

export default ProblemCard;