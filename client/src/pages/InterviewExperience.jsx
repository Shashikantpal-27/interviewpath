import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSearch,
  FaBuilding,
  FaUserTie,
  FaCalendarAlt,
} from "react-icons/fa";

function InterviewExperience() {
  const navigate = useNavigate();

  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        company: "Google",
        role: "Software Engineer",
        difficulty: "Hard",
        date: "2026",
        experience:
          "The interview process included DSA, system design and behavioral rounds.",
        rounds: ["Online Assessment", "DSA Interview", "System Design"],
        tips:
          "Focus on data structures, algorithms and communication skills.",
      },
      {
        id: 2,
        company: "Microsoft",
        role: "Software Developer",
        difficulty: "Medium",
        date: "2026",
        experience:
          "Questions focused on problem solving, OOP concepts and projects.",
        rounds: ["Coding Round", "Technical Interview", "HR Round"],
        tips:
          "Prepare DSA fundamentals and explain your projects clearly.",
      },
      {
        id: 3,
        company: "Amazon",
        role: "SDE",
        difficulty: "Hard",
        date: "2026",
        experience:
          "The process focused heavily on coding and leadership principles.",
        rounds: ["Online Test", "Technical Round", "Bar Raiser"],
        tips:
          "Practice DSA and prepare Amazon leadership principles.",
      },
      {
        id: 4,
        company: "Infosys",
        role: "System Engineer",
        difficulty: "Easy",
        date: "2026",
        experience:
          "Basic programming, aptitude and HR questions were asked.",
        rounds: ["Aptitude", "Technical", "HR"],
        tips:
          "Revise programming basics, DBMS and OOP concepts.",
      },
      {
        id: 5,
        company: "TCS",
        role: "Digital Profile",
        difficulty: "Medium",
        date: "2026",
        experience:
          "The interview included programming questions and technical discussion.",
        rounds: ["Coding Test", "Technical Interview", "HR"],
        tips:
          "Practice coding and revise your academic subjects.",
      },
      {
        id: 6,
        company: "Accenture",
        role: "Associate Software Engineer",
        difficulty: "Medium",
        date: "2026",
        experience:
          "The process included aptitude, coding and communication rounds.",
        rounds: ["Assessment", "Technical Interview", "HR"],
        tips:
          "Practice aptitude and prepare your projects.",
      },
      {
        id: 7,
        company: "Wipro",
        role: "Project Engineer",
        difficulty: "Easy",
        date: "2026",
        experience:
          "Questions were mostly based on programming fundamentals.",
        rounds: ["Online Assessment", "Technical Round", "HR"],
        tips:
          "Focus on OOP, DBMS and basic coding.",
      },
    ];

    setExperiences(sampleData);
    setFilteredExperiences(sampleData);
  }, []);

  useEffect(() => {
    const result = experiences.filter((item) =>
      `${item.company} ${item.role} ${item.difficulty}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredExperiences(result);
    setCurrentPage(1);
  }, [search, experiences]);

  const totalPages = Math.ceil(
    filteredExperiences.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentExperiences =
    filteredExperiences.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  const getDifficultyStyle = (difficulty) => {
    if (difficulty === "Easy") {
      return "bg-green-100 text-green-700";
    }

    if (difficulty === "Medium") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* HEADER */}

      <header className="bg-white border-b border-gray-200">

        <div className="max-w-6xl mx-auto px-5 py-5 flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
            title="Go Back"
          >
            <FaArrowLeft />
          </button>

          <div>
            <p className="text-sm text-gray-500">
              Community
            </p>

            <h1 className="text-2xl font-bold text-[var(--text)]">
              Interview Experiences
            </h1>
          </div>

        </div>

      </header>


      <main className="max-w-6xl mx-auto px-5 py-10">

        {/* INTRO */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-[var(--text)]">
            Learn from real interview experiences 💡
          </h2>

          <p className="text-gray-500 mt-3">
            Explore interview experiences shared by students and prepare
            better for your next opportunity.
          </p>

        </div>


        {/* SEARCH */}

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">

          <div className="relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search company, role or difficulty..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-gray-200 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#A53860]"
            />

          </div>

        </div>


        {/* EXPERIENCES */}

        <div className="space-y-5">

          {currentExperiences.map((item) => (

            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition"
            >

              {/* TOP */}

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                  <div className="flex items-center gap-2 text-[#A53860]">

                    <FaBuilding />

                    <span className="font-semibold">
                      {item.company}
                    </span>

                  </div>

                  <h3 className="text-xl font-bold mt-2 text-[var(--text)]">
                    {item.role}
                  </h3>

                </div>

                <div className="flex items-center gap-3">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyStyle(
                      item.difficulty
                    )}`}
                  >
                    {item.difficulty}
                  </span>

                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <FaCalendarAlt />
                    {item.date}
                  </span>

                </div>

              </div>


              {/* EXPERIENCE */}

              <p className="text-gray-600 mt-5 leading-relaxed">
                {item.experience}
              </p>


              {/* ROUNDS */}

              <div className="mt-5">

                <p className="font-semibold text-[var(--text)] mb-3">
                  Interview Rounds
                </p>

                <div className="flex flex-wrap gap-2">

                  {item.rounds.map((round) => (

                    <span
                      key={round}
                      className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600"
                    >
                      {round}
                    </span>

                  ))}

                </div>

              </div>


              {/* TIP */}

              <div className="mt-5 bg-[#FFF5F8] border border-[#F3C7D5] rounded-xl p-4">

                <p className="font-semibold text-[#670D2F]">
                  Preparation Tip
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {item.tips}
                </p>

              </div>

            </div>

          ))}


          {currentExperiences.length === 0 && (

            <div className="text-center py-16 bg-white rounded-xl border">

              <p className="text-gray-500">
                No interview experiences found.
              </p>

            </div>

          )}

        </div>


        {/* PAGINATION */}

        {totalPages > 1 && (

          <div className="flex justify-center items-center gap-2 mt-10">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="px-4 py-2 border rounded-lg disabled:opacity-40"
            >
              ← Previous
            </button>


            {[...Array(totalPages)].map((_, index) => {

              const page = index + 1;

              return (

                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`w-10 h-10 rounded-lg ${
                    currentPage === page
                      ? "bg-[#670D2F] text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {page}
                </button>

              );

            })}


            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="px-4 py-2 border rounded-lg disabled:opacity-40"
            >
              Next →
            </button>

          </div>

        )}

      </main>

    </div>
  );
}

export default InterviewExperience;