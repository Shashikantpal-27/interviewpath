import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCode,
  FaServer,
  FaLayerGroup,
  FaChartBar,
  FaBrain,
  FaRobot,
  FaCloud,
  FaShieldAlt,
} from "react-icons/fa";

function RoleExplorer() {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Frontend Developer",
      icon: <FaCode />,
      description:
        "Build modern, responsive and interactive user interfaces.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      path: "/study-planner",
    },
    {
      title: "Backend Developer",
      icon: <FaServer />,
      description:
        "Build APIs, databases and server-side applications.",
      skills: ["Node.js", "Express", "MongoDB", "SQL"],
      path: "/study-planner",
    },
    {
      title: "Full Stack Developer",
      icon: <FaLayerGroup />,
      description:
        "Work on both frontend and backend applications.",
      skills: ["React", "Node.js", "Express", "MongoDB"],
      path: "/study-planner",
    },
    {
      title: "Data Analyst",
      icon: <FaChartBar />,
      description:
        "Analyze data and generate meaningful business insights.",
      skills: ["SQL", "Excel", "Python", "Power BI"],
      path: "/study-planner",
    },
    {
      title: "Data Scientist",
      icon: <FaBrain />,
      description:
        "Use data, statistics and machine learning to solve problems.",
      skills: ["Python", "Pandas", "Machine Learning", "Statistics"],
      path: "/study-planner",
    },
    {
      title: "AI / ML Engineer",
      icon: <FaRobot />,
      description:
        "Build intelligent systems using AI and machine learning.",
      skills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow"],
      path: "/study-planner",
    },
    {
      title: "DevOps Engineer",
      icon: <FaCloud />,
      description:
        "Manage deployment, cloud infrastructure and automation.",
      skills: ["Docker", "AWS", "CI/CD", "Linux"],
      path: "/study-planner",
    },
    {
      title: "Cyber Security Engineer",
      icon: <FaShieldAlt />,
      description:
        "Protect systems, networks and applications from threats.",
      skills: ["Networking", "Linux", "Security", "Ethical Hacking"],
      path: "/study-planner",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* HEADER */}

      <header className="bg-white border-b border-[var(--secondary)] px-5 md:px-10 py-5">

        <div className="max-w-7xl mx-auto flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="
              w-10
              h-10
              rounded-lg
              border
              border-[var(--secondary)]
              flex
              items-center
              justify-center
              text-gray-600
              hover:bg-[var(--background)]
              hover:text-[var(--primary)]
              transition
            "
            title="Go Back"
          >
            <FaArrowLeft />
          </button>

          <div>

            <p className="text-sm text-gray-500">
              Career Preparation
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text)]">
              Role Explorer
            </h1>

          </div>

        </div>

      </header>

      {/* CONTENT */}

      <main className="max-w-7xl mx-auto px-5 md:px-10 py-10">

        {/* HERO */}

        <div className="mb-10">

          <span className="
            inline-block
            px-4
            py-2
            rounded-full
            text-sm
            text-[var(--primary)]
            bg-white
            border
            border-[var(--secondary)]
          ">
            Explore Your Career
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mt-5">

            Find the right role for you 🚀

          </h2>

          <p className="text-gray-500 text-lg mt-3 max-w-2xl">

            Explore different technology careers, understand required
            skills and start preparing for your dream role.

          </p>

        </div>

        {/* ROLE GRID */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        ">

          {roles.map((role) => (

            <div
              key={role.title}
              className="
                bg-white
                border
                border-[var(--secondary)]
                rounded-2xl
                p-6
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition
                flex
                flex-col
              "
            >

              {/* ICON */}

              <div className="
                w-14
                h-14
                rounded-xl
                bg-[var(--background)]
                text-[var(--primary)]
                flex
                items-center
                justify-center
                text-2xl
              ">
                {role.icon}
              </div>

              {/* TITLE */}

              <h3 className="
                text-xl
                font-bold
                text-[var(--text)]
                mt-5
              ">
                {role.title}
              </h3>

              {/* DESCRIPTION */}

              <p className="
                text-sm
                text-gray-500
                mt-3
                leading-relaxed
              ">
                {role.description}
              </p>

              {/* SKILLS */}

              <div className="mt-5">

                <p className="
                  text-sm
                  font-semibold
                  text-[var(--text)]
                  mb-3
                ">
                  Key Skills
                </p>

                <div className="flex flex-wrap gap-2">

                  {role.skills.map((skill) => (

                    <span
                      key={skill}
                      className="
                        text-xs
                        px-3
                        py-1
                        rounded-full
                        bg-[var(--background)]
                        text-[var(--primary)]
                      "
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

              {/* BUTTON */}

              <button
                onClick={() =>
                  navigate(role.path)
                }
                className="
                  mt-6
                  w-full
                  py-3
                  rounded-xl
                  border
                  border-[var(--primary)]
                  text-[var(--primary)]
                  hover:bg-[var(--primary)]
                  hover:text-white
                  transition
                  font-medium
                "
              >
                Explore Roadmap →
              </button>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default RoleExplorer;