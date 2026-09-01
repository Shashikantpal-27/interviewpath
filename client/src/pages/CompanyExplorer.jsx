import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaSearch,
  FaBuilding,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import DashboardLayout from "../components/DashboardLayout";
import CompanyCard from "../components/CompanyCard";
import { getCompanies } from "../services/companyService";


function CompanyExplorer() {

  const [companies, setCompanies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("All");

  const [industry, setIndustry] =
    useState("All");

  const [role, setRole] =
    useState("All");


  // =========================
  // PAGINATION
  // =========================

  const [currentPage, setCurrentPage] =
    useState(1);

  const companiesPerPage = 5;


  // =========================
  // FETCH COMPANIES
  // =========================

  useEffect(() => {

    const fetchCompanies = async () => {

      setLoading(true);
      setError("");

      try {

        const data =
          await getCompanies();

        setCompanies(data || []);

      } catch (err) {

        console.error(
          "Failed to load companies:",
          err
        );

        setError(
          "Could not load companies. Please try again."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchCompanies();

  }, []);


  // =========================
  // FILTER OPTIONS
  // =========================

  const industries = useMemo(
    () => [

      "All",

      ...new Set(
        companies
          .map((company) =>
            company.industry
          )
          .filter(Boolean)
      ),

    ],

    [companies]
  );


  const roles = useMemo(
    () => [

      "All",

      ...new Set(
        companies.flatMap(
          (company) =>
            company.popularRoles || []
        )
      ),

    ],

    [companies]
  );


  const difficulties = [
    "All",
    "Easy",
    "Medium",
    "Hard",
  ];


  // =========================
  // FILTER COMPANIES
  // =========================

  const filtered = useMemo(() => {

    return companies.filter(
      (company) => {

        const matchesSearch =
          (company.name || "")
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );


        const matchesDifficulty =
          difficulty === "All" ||
          company.difficulty ===
            difficulty;


        const matchesIndustry =
          industry === "All" ||
          company.industry ===
            industry;


        const matchesRole =
          role === "All" ||
          (
            company.popularRoles || []
          ).includes(role);


        return (
          matchesSearch &&
          matchesDifficulty &&
          matchesIndustry &&
          matchesRole
        );
      }
    );

  }, [
    companies,
    search,
    difficulty,
    industry,
    role,
  ]);


  // =========================
  // RESET PAGE ON FILTER
  // =========================

  useEffect(() => {

    setCurrentPage(1);

  }, [
    search,
    difficulty,
    industry,
    role,
  ]);


  // =========================
  // PAGINATION CALCULATIONS
  // =========================

  const totalPages =
    Math.ceil(
      filtered.length /
        companiesPerPage
    );


  const indexOfLastCompany =
    currentPage *
    companiesPerPage;


  const indexOfFirstCompany =
    indexOfLastCompany -
    companiesPerPage;


  const currentCompanies =
    filtered.slice(
      indexOfFirstCompany,
      indexOfLastCompany
    );


  // =========================
  // PAGE CHANGE
  // =========================

  const goToPage = (page) => {

    if (
      page >= 1 &&
      page <= totalPages
    ) {

      setCurrentPage(page);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }
  };


  return (

    <DashboardLayout
      active="companies"
      title="Company Explorer"
      subtitle="Explore interview patterns from top companies and prepare accordingly."
    >

      {/* ================= SEARCH + FILTERS ================= */}

      <div className="bg-white rounded-2xl border border-[var(--secondary)] p-5 shadow-sm mb-6">

        <div className="relative mb-4">

          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            placeholder="Search companies by name..."

            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          <Select
            label="Difficulty"
            value={difficulty}
            onChange={setDifficulty}
            options={difficulties}
          />

          <Select
            label="Industry"
            value={industry}
            onChange={setIndustry}
            options={industries}
          />

          <Select
            label="Role"
            value={role}
            onChange={setRole}
            options={roles}
          />

        </div>

      </div>


      {/* ================= LOADING ================= */}

      {loading && (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {Array.from({
            length: 5,
          }).map((_, index) => (

            <div
              key={index}

              className="bg-white rounded-2xl border border-[var(--secondary)] p-6 h-56 animate-pulse"
            />

          ))}

        </div>

      )}


      {/* ================= ERROR ================= */}

      {!loading &&
        error && (

          <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">

            <p className="text-red-600 font-semibold">
              {error}
            </p>

          </div>

        )}


      {/* ================= NO RESULTS ================= */}

      {!loading &&
        !error &&
        filtered.length === 0 && (

          <div className="bg-white rounded-2xl border border-[var(--secondary)] p-10 text-center">

            <FaBuilding
              className="text-4xl text-[var(--secondary)] mx-auto mb-3"
            />

            <p className="text-[var(--text)] font-semibold">
              No companies found
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Try adjusting your search or filters.
            </p>

          </div>

        )}


      {/* ================= COMPANIES ================= */}

      {!loading &&
        !error &&
        filtered.length > 0 && (

          <>

            {/* RESULT COUNT */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">

              <p className="text-sm text-gray-500">

                Showing{" "}

                <span className="font-semibold text-[var(--text)]">
                  {indexOfFirstCompany + 1}
                </span>

                {" "}to{" "}

                <span className="font-semibold text-[var(--text)]">

                  {Math.min(
                    indexOfLastCompany,
                    filtered.length
                  )}

                </span>

                {" "}of{" "}

                <span className="font-semibold text-[var(--text)]">

                  {filtered.length}

                </span>

                {" "}companies

              </p>


              <p className="text-sm text-gray-500">

                Page{" "}

                <span className="font-semibold">
                  {currentPage}
                </span>

                {" "}of{" "}

                <span className="font-semibold">
                  {totalPages}
                </span>

              </p>

            </div>


            {/* COMPANY CARDS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {currentCompanies.map(
                (company) => (

                  <CompanyCard
                    key={company._id}
                    company={company}
                  />

                )
              )}

            </div>


            {/* ================= PAGINATION ================= */}

            {totalPages > 1 && (

              <div className="flex flex-wrap items-center justify-center gap-2 mt-10">


                {/* PREVIOUS */}

                <button

                  onClick={() =>
                    goToPage(
                      currentPage - 1
                    )
                  }

                  disabled={
                    currentPage === 1
                  }

                  className="w-10 h-10 rounded-xl border border-[var(--secondary)] flex items-center justify-center hover:bg-[var(--background)] disabled:opacity-40 disabled:cursor-not-allowed transition"

                  title="Previous Page"
                >

                  <FaChevronLeft />

                </button>


                {/* PAGE NUMBERS */}

                {Array.from(
                  {
                    length:
                      totalPages,
                  },

                  (_, index) =>
                    index + 1
                ).map((page) => (

                  <button

                    key={page}

                    onClick={() =>
                      goToPage(page)
                    }

                    className={`w-10 h-10 rounded-xl transition ${
                      currentPage ===
                      page
                        ? "bg-[var(--primary)] text-white"
                        : "bg-white border border-[var(--secondary)] hover:bg-[var(--background)]"
                    }`}

                  >

                    {page}

                  </button>

                ))}


                {/* NEXT */}

                <button

                  onClick={() =>
                    goToPage(
                      currentPage + 1
                    )
                  }

                  disabled={
                    currentPage ===
                    totalPages
                  }

                  className="w-10 h-10 rounded-xl border border-[var(--secondary)] flex items-center justify-center hover:bg-[var(--background)] disabled:opacity-40 disabled:cursor-not-allowed transition"

                  title="Next Page"
                >

                  <FaChevronRight />

                </button>

              </div>

            )}

          </>

        )}

    </DashboardLayout>

  );
}


// =========================
// SELECT COMPONENT
// =========================

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
          onChange(
            e.target.value
          )
        }

        className="w-full px-4 py-2.5 rounded-xl border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white"
      >

        {options.map((option) => (

          <option
            key={option}
            value={option}
          >

            {option}

          </option>

        ))}

      </select>

    </div>

  );
}


export default CompanyExplorer;