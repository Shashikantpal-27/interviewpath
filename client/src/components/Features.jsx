import {
  FaRobot,
  FaCode,
  FaFileAlt,
  FaRoad,
  FaChartLine,
  FaBuilding,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaRoad />,
      title: "Personalized Roadmaps",
      desc: "Follow a structured preparation path based on your target role and career goals.",
      path: "/study-planner",
    },
    {
      icon: <FaCode />,
      title: "Coding Practice",
      desc: "Practice coding problems by topic and difficulty to strengthen your problem-solving skills.",
      path: "/coding-practice",
    },
    {
      icon: <FaFileAlt />,
      title: "AI Resume Analyzer",
      desc: "Analyze your resume and get useful suggestions to improve its quality and ATS readiness.",
      path: "/resume-analyzer",
    },
    {
      icon: <FaBuilding />,
      title: "Company Explorer",
      desc: "Explore company-specific interview patterns, roles, and preparation resources.",
      path: "/companies",
    },
    {
      icon: <FaChartLine />,
      title: "Progress Tracking",
      desc: "Track your preparation journey and understand where you need to improve.",
      path: "/dashboard",
    },
    {
      icon: <FaRobot />,
      title: "AI Mock Interview",
      desc: "Practice realistic interviews with AI and receive feedback on your performance.",
      path: "/mock-interview",
    },
  ];

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <section
      id="features"
      className="py-20 bg-[var(--background)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* HEADING */}
        <div className="text-center max-w-2xl mx-auto">

          <span className="inline-block text-sm font-semibold text-[var(--primary)] bg-white border border-[var(--secondary)] px-4 py-2 rounded-full">
            ⚡ Everything in One Place
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mt-5">
            Everything You Need to Prepare
          </h2>

          <p className="text-[var(--text)] opacity-75 mt-4 text-lg">
            From coding practice to AI interviews, InterviewPath AI helps you
            prepare for every stage of the interview process.
          </p>

        </div>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">

          {features.map((feature) => (
            <button
              key={feature.title}
              type="button"
              onClick={() => handleFeatureClick(feature.path)}
              className="group bg-white rounded-2xl p-7 border border-[var(--secondary)] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left cursor-pointer"
            >

              {/* ICON */}
              <div className="w-14 h-14 rounded-xl bg-[var(--background)] flex items-center justify-center text-[var(--primary)] text-2xl group-hover:bg-[var(--primary)] group-hover:text-white transition duration-300">
                {feature.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-[var(--text)] mt-6">
                {feature.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-500 mt-3 leading-7">
                {feature.desc}
              </p>

              {/* LEARN MORE */}
              <div className="mt-5 text-[var(--primary)] font-semibold text-sm group-hover:translate-x-1 transition">
                Learn more →
              </div>

            </button>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;