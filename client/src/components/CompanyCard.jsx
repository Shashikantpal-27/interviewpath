import { Link } from "react-router-dom";
import { FaBuilding, FaLayerGroup, FaCode } from "react-icons/fa";

const difficultyColor = {
  Easy: "bg-[#FCE5ED] text-[#670D2F]",
  Medium: "bg-[#FFF3CD] text-[#856404]",
  Hard: "bg-[#F8D7DA] text-[#721C24]",
};

function CompanyCard({ company }) {
  return (
    <Link
      to={`/companies/${company._id}`}
      className="group bg-white rounded-2xl border border-[var(--secondary)] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-[var(--background)] flex items-center justify-center overflow-hidden shrink-0">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <FaBuilding className="text-[var(--primary)] text-xl" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-[var(--text)] truncate">{company.name}</h3>
          <p className="text-xs text-gray-500 truncate">{company.industry}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4 line-clamp-2 flex-1">
        {company.description}
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            difficultyColor[company.difficulty] || "bg-gray-100 text-gray-700"
          }`}
        >
          {company.difficulty}
        </span>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--background)] text-[var(--info)] flex items-center gap-1">
          <FaLayerGroup className="text-[10px]" />
          {company.interviewRounds?.length || 0} rounds
        </span>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--background)] text-[var(--primary)] flex items-center gap-1">
          <FaCode className="text-[10px]" />
          {company.codingQuestionsCount ?? 0} Qs
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--secondary)]">
        <p className="text-xs text-gray-500">Popular roles</p>
        <p className="text-sm font-medium text-[var(--text)] truncate">
          {company.popularRoles?.slice(0, 3).join(", ") || "—"}
        </p>
      </div>

      <p className="text-sm font-semibold text-[var(--primary)] mt-4 group-hover:underline">
        View details →
      </p>
    </Link>
  );
}

export default CompanyCard;