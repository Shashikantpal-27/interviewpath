import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  FaHome,
  FaUser,
  FaBuilding,
  FaRoute,
  FaMicrophone,
  FaFileAlt,
  FaCode,
  FaSignOutAlt,
  FaChartLine,
  FaBookOpen,
  FaChevronLeft,
  FaChevronRight,
  FaBriefcase,
  FaUsers,
  FaHistory,
} from "react-icons/fa";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          navigate("/login");
          return;
        }

        const response = await api.get("/dashboard");

        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // =====================================================
  // FETCH CURRENT LOGGED-IN USER
  // =====================================================

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await api.get("/auth/me");

        setUser(response.data.user);
      } catch (error) {
        console.error("User fetch error:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =====================================================
  // USER DATA
  // =====================================================

  const userName =
    user?.fullName ||
    user?.name ||
    "User";

  const firstName =
    userName.split(" ")[0];

  const userInitial =
    userName.charAt(0).toUpperCase();

  const profileImage =
    user?.profileImage ||
    user?.image ||
    null;

  // =====================================================
  // DATA
  // =====================================================

  const atsScore = dashboardData?.resume?.atsScore ?? 0;

  const interviewCount =
    dashboardData?.interviews?.count ?? 0;

  const latestInterviewScore =
    dashboardData?.interviews?.latestScore ?? null;

  const latestInterviewRole =
    dashboardData?.interviews?.latestRole ?? null;

  const studyPlanExists =
    dashboardData?.studyPlan?.exists ?? false;

  const studyPlanTopic =
    dashboardData?.studyPlan?.topic ?? null;

  const studyPlanDays =
    dashboardData?.studyPlan?.days ?? 0;

  const studyPlanHours =
    dashboardData?.studyPlan?.hoursPerDay ?? 0;

  // =====================================================
  // ATS STATUS
  // =====================================================

  const atsStatus =
    atsScore >= 80
      ? "Excellent"
      : atsScore >= 60
      ? "Good"
      : atsScore > 0
      ? "Needs Improvement"
      : "Not Analyzed";

  // =====================================================
  // INTERVIEW STATUS
  // =====================================================

  const interviewStatus =
    latestInterviewScore === null
      ? "Not Started"
      : latestInterviewScore >= 8
      ? "Strong"
      : latestInterviewScore >= 6
      ? "Good"
      : "Keep Practicing";

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
    {
      name: "Companies",
      path: "/companies",
      icon: <FaBuilding />,
    },
    {
      name: "Roadmaps",
      path: "/study-planner",
      icon: <FaRoute />,
    },
    {
      name: "AI Mock Interview",
      path: "/mock-interview",
      icon: <FaMicrophone />,
    },
    {
      name: "AI Resume Analyzer",
      path: "/resume-analyzer",
      icon: <FaFileAlt />,
    },
    {
      name: "Coding Practice",
      path: "/coding-practice",
      icon: <FaCode />,
    },
    {
      name: "Role Explorer",
      path: "/role-explorer",
      icon: <FaBriefcase />,
    },
    {
      name: "Interview Community",
      path: "/interview-community",
      icon: <FaUsers />,
    },
    {
      name: "History",
      path: "/history",
      icon: <FaHistory />,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] flex">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          relative
          bg-white
          border-r
          border-[var(--secondary)]
          hidden
          md:flex
          flex-col
          transition-all
          duration-300
          ${sidebarOpen ? "w-64" : "w-20"}
        `}
      >

        {/* Logo */}

        <div className="h-20 px-5 border-b border-[var(--secondary)] flex items-center justify-between">

          {sidebarOpen ? (
            <Link
              to="/dashboard"
              className="text-xl font-bold text-[var(--primary)] whitespace-nowrap"
            >
              InterviewPath AI
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="text-xl font-bold text-[var(--primary)]"
            >
              IP
            </Link>
          )}

          {/* Separate Sidebar Toggle */}

          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="
              w-8
              h-8
              flex
              items-center
              justify-center
              rounded-lg
              border
              border-[var(--secondary)]
              text-gray-500
              hover:text-[var(--primary)]
              hover:bg-[var(--background)]
              transition
            "
            title={
              sidebarOpen
                ? "Hide Sidebar"
                : "Show Sidebar"
            }
          >
            {sidebarOpen ? (
              <FaChevronLeft />
            ) : (
              <FaChevronRight />
            )}
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">

          {navItems.map((item) => {

            const isActive =
              item.path === "/dashboard";

            return (
              <Link
                key={item.name}
                to={item.path}
                title={
                  sidebarOpen
                    ? ""
                    : item.name
                }
                className={`
                  flex
                  items-center
                  ${sidebarOpen
                    ? "gap-3 px-4"
                    : "justify-center px-2"
                  }
                  py-3
                  rounded-xl
                  transition
                  ${
                    isActive
                      ? "bg-[var(--background)] text-[var(--primary)]"
                      : "text-[var(--text)] hover:bg-[var(--background)] hover:text-[var(--primary)]"
                  }
                `}
              >

                <span className="text-lg">
                  {item.icon}
                </span>

                {sidebarOpen && (
                  <span className="text-sm font-medium whitespace-nowrap">
                    {item.name}
                  </span>
                )}

              </Link>
            );
          })}

        </nav>

        {/* Logout */}

        <div className="p-3 border-t border-[var(--secondary)]">

          <button
            onClick={handleLogout}
            title={
              sidebarOpen
                ? ""
                : "Logout"
            }
            className={`
              w-full
              flex
              items-center
              ${
                sidebarOpen
                  ? "gap-3 px-4"
                  : "justify-center px-2"
              }
              py-3
              rounded-xl
              text-[var(--text)]
              hover:bg-[var(--background)]
              hover:text-[var(--primary)]
              transition
            `}
          >

            <FaSignOutAlt />

            {sidebarOpen && (
              <span className="text-sm font-medium">
                Logout
              </span>
            )}

          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="flex-1 min-w-0">

        {/* Top Navbar */}

        <header className="bg-white border-b border-[var(--secondary)] px-6 py-4 flex justify-between items-center">

          <div>

            <p className="text-sm text-gray-500">
              InterviewPath AI
            </p>

            <h2 className="text-xl font-bold text-[var(--text)]">
              Dashboard
            </h2>

          </div>

          {/* User */}

          <div
            onClick={() =>
              navigate("/profile")
            }
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
          >

            <div className="w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-semibold overflow-hidden">

              {profileImage ? (
                <img
                  src={profileImage}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                userInitial
              )}

            </div>

            <div className="hidden sm:block">

              <p className="font-semibold text-[var(--text)]">
                {userName}
              </p>

              <p className="text-xs text-gray-500">
                {user?.role === "admin"
                  ? "Administrator"
                  : "Candidate"}
              </p>

            </div>

          </div>

        </header>

        {/* Dashboard Content */}

        <div className="p-6 md:p-8 max-w-7xl mx-auto">

          {/* WELCOME */}

          <div className="mb-8">

            <span className="inline-block text-sm font-semibold text-[var(--primary)] bg-white border border-[var(--secondary)] px-4 py-2 rounded-full">
              Your Preparation Hub
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mt-5">
              Welcome back, {firstName} 👋
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Let's continue your interview preparation.
            </p>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Resume ATS */}

            <div className="bg-white rounded-2xl border border-[var(--secondary)] p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-center justify-between">

                <p className="text-gray-500 text-sm">
                  Resume ATS Score
                </p>

                <FaFileAlt className="text-[var(--primary)]" />

              </div>

              <div className="flex items-end justify-between mt-3">

                <h2 className="text-3xl font-bold text-[var(--primary)]">
                  {loading
                    ? "..."
                    : `${atsScore}%`}
                </h2>

                <span className="text-sm font-semibold text-[var(--primary)]">
                  {atsStatus}
                </span>

              </div>

              <div className="w-full bg-[var(--background)] rounded-full h-2 mt-5">

                <div
                  className="bg-[var(--primary)] h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      Math.max(atsScore, 0),
                      100
                    )}%`,
                  }}
                />

              </div>

              <p className="text-sm text-gray-500 mt-2">

                {dashboardData?.resume
                  ? "Based on your latest resume analysis."
                  : "Analyze your resume to get your ATS score."}

              </p>

            </div>

            {/* Mock Interviews */}

            <div className="bg-white rounded-2xl border border-[var(--secondary)] p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-center justify-between">

                <p className="text-gray-500 text-sm">
                  Mock Interviews
                </p>

                <FaMicrophone className="text-[var(--primary)]" />

              </div>

              <div className="flex items-end justify-between mt-3">

                <h2 className="text-3xl font-bold text-[var(--text)]">
                  {loading
                    ? "..."
                    : interviewCount}
                </h2>

                <span className="text-sm font-semibold text-[var(--primary)]">
                  {interviewStatus}
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-2">

                {latestInterviewScore !== null
                  ? `Latest score: ${latestInterviewScore}/10`
                  : "Start your first AI interview."}

              </p>

            </div>

            {/* Study Plan */}

            <div className="bg-white rounded-2xl border border-[var(--secondary)] p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-center justify-between">

                <p className="text-gray-500 text-sm">
                  Study Plan
                </p>

                <FaRoute className="text-[var(--primary)]" />

              </div>

              <h2 className="text-xl font-bold text-[var(--text)] mt-3">

                {loading
                  ? "..."
                  : studyPlanExists
                  ? studyPlanTopic
                  : "Not Created"}

              </h2>

              <p className="text-sm text-gray-500 mt-2">

                {studyPlanExists
                  ? `${studyPlanDays} days • ${studyPlanHours} hrs/day`
                  : "Create your personalized study plan."}

              </p>

            </div>

          </div>

          {/* YOUR PROGRESS */}

          <div className="mt-8 bg-white rounded-2xl border border-[var(--secondary)] shadow-sm p-6 md:p-7">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-[var(--text)]">
                Your Progress
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Track your AI-powered preparation activities.
              </p>

            </div>

            <div className="space-y-6">

              <ProgressItem
                title="Resume Analysis"
                description="Analyze your resume"
                current={dashboardData?.resume ? 1 : 0}
                total={1}
                icon={<FaFileAlt />}
              />

              <ProgressItem
                title="Mock Interview"
                description="Complete an AI interview"
                current={interviewCount > 0 ? 1 : 0}
                total={1}
                icon={<FaMicrophone />}
              />

              <ProgressItem
                title="Study Plan"
                description={
                  studyPlanExists
                    ? `Learning ${studyPlanTopic}`
                    : "Create a personalized study plan"
                }
                current={studyPlanExists ? 1 : 0}
                total={1}
                icon={<FaRoute />}
              />

            </div>

          </div>

          {/* LATEST ACTIVITY */}

          <div className="mt-8">

            <div className="mb-5">

              <h2 className="text-xl font-bold text-[var(--text)]">
                Latest Activity
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your most recent preparation activity.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <ActivityCard
                icon={<FaFileAlt />}
                title="Resume Analysis"
                value={
                  dashboardData?.resume
                    ? `${atsScore}% ATS`
                    : "Not analyzed"
                }
                description={
                  dashboardData?.resume
                    ? dashboardData.resume.fileName
                    : "Upload your resume"
                }
              />

              <ActivityCard
                icon={<FaChartLine />}
                title="Latest Interview"
                value={
                  latestInterviewScore !== null
                    ? `${latestInterviewScore}/10`
                    : "Not completed"
                }
                description={
                  latestInterviewRole ||
                  "Start an AI mock interview"
                }
              />

              <ActivityCard
                icon={<FaBookOpen />}
                title="Study Planner"
                value={
                  studyPlanExists
                    ? studyPlanTopic
                    : "Not created"
                }
                description={
                  studyPlanExists
                    ? `${studyPlanDays} days • ${studyPlanHours} hrs/day`
                    : "Create a personalized plan"
                }
              />

            </div>

          </div>

          {/* QUICK ACTIONS */}

          <div className="mt-8">

            <div className="mb-5">

              <h2 className="text-xl font-bold text-[var(--text)]">
                Quick Actions
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Jump directly into your preparation.
              </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <QuickAction
                to="/mock-interview"
                icon={<FaMicrophone />}
                title="AI Mock Interview"
                description="Practice with AI"
                action="Start →"
              />

              <QuickAction
                to="/resume-analyzer"
                icon={<FaFileAlt />}
                title="AI Resume Analyzer"
                description="Check your ATS score"
                action="Analyze →"
              />

              <QuickAction
                to="/study-planner"
                icon={<FaRoute />}
                title="AI Study Planner"
                description="Create your personalized study plan"
                action="Plan →"
              />

              <QuickAction
                to="/coding-practice"
                icon={<FaCode />}
                title="Coding Practice"
                description="Improve your DSA"
                action="Practice →"
              />

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

// =====================================================
// PROGRESS ITEM
// =====================================================

function ProgressItem({
  title,
  description,
  current,
  total,
  icon,
}) {
  const percentage =
    total > 0
      ? (current / total) * 100
      : 0;

  return (
    <div>

      <div className="flex justify-between items-center mb-2">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[var(--background)] text-[var(--primary)] flex items-center justify-center">
            {icon}
          </div>

          <div>

            <p className="font-semibold text-[var(--text)]">
              {title}
            </p>

            <p className="text-sm text-gray-500">
              {description}
            </p>

          </div>

        </div>

        <span className="text-sm font-semibold">
          {current} / {total}
        </span>

      </div>

      <div className="w-full bg-[var(--background)] rounded-full h-2">

        <div
          className="bg-[var(--primary)] h-2 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

// =====================================================
// ACTIVITY CARD
// =====================================================

function ActivityCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--secondary)] p-6 shadow-sm hover:shadow-md transition">

      <div className="w-12 h-12 rounded-xl bg-[var(--background)] text-[var(--primary)] flex items-center justify-center text-xl">
        {icon}
      </div>

      <h3 className="font-semibold text-gray-500 text-sm mt-5">
        {title}
      </h3>

      <p className="text-xl font-bold text-[var(--text)] mt-2">
        {value}
      </p>

      <p className="text-sm text-gray-500 mt-2">
        {description}
      </p>

    </div>
  );
}

// =====================================================
// QUICK ACTION
// =====================================================

function QuickAction({
  to,
  icon,
  title,
  description,
  action,
}) {
  return (
    <Link
      to={to}
      className="group bg-white p-6 rounded-2xl border border-[var(--secondary)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
    >

      <div className="w-12 h-12 rounded-xl bg-[var(--background)] flex items-center justify-center text-[var(--primary)] text-xl group-hover:bg-[var(--primary)] group-hover:text-white transition">
        {icon}
      </div>

      <h3 className="font-bold text-[var(--text)] mt-5">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        {description}
      </p>

      <p className="text-sm font-semibold text-[var(--primary)] mt-4">
        {action}
      </p>

    </Link>
  );
}

export default Dashboard;