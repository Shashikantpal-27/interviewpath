import { useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([
    {
      projectName: "",
      githubLink: "",
      liveDemoLink: "",
      startDate: "",
      endDate: "",
      techStack: "",
      description: "",
    },
  ]);

  // ================= HANDLE CHANGE =================

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedProjects = [...projects];

    updatedProjects[index][name] = value;

    setProjects(updatedProjects);
  };

  // ================= ADD PROJECT =================

  const addProject = () => {
    setProjects([
      ...projects,
      {
        projectName: "",
        githubLink: "",
        liveDemoLink: "",
        startDate: "",
        endDate: "",
        techStack: "",
        description: "",
      },
    ]);
  };

  // ================= REMOVE PROJECT =================

  const removeProject = (index) => {
    const updatedProjects = projects.filter(
      (_, i) => i !== index
    );

    setProjects(updatedProjects);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-2xl font-semibold">
            Projects
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Add your academic, personal or professional projects.
          </p>
        </div>

      </div>


      {/* ================= PROJECTS ================= */}

      <div className="space-y-6">

        {projects.map((project, index) => (

          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-5 bg-gray-50"
          >

            {/* PROJECT HEADER */}

            <div className="flex items-center justify-between mb-5">

              <h3 className="text-lg font-semibold">
                Project {index + 1}
              </h3>

              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 text-sm font-medium hover:text-red-700"
                >
                  Remove
                </button>
              )}

            </div>


            {/* ================= PROJECT NAME ================= */}

            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>

              <input
                type="text"
                name="projectName"
                value={project.projectName}
                onChange={(e) => handleChange(index, e)}
                placeholder="e.g. Job Portal"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
              />

            </div>


            {/* ================= LINKS ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

              {/* GITHUB */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Link
                </label>

                <input
                  type="url"
                  name="githubLink"
                  value={project.githubLink}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="https://github.com/username/project"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                />

              </div>


              {/* LIVE DEMO */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Live Demo Link
                  <span className="text-gray-400 font-normal">
                    {" "}(Optional)
                  </span>
                </label>

                <input
                  type="url"
                  name="liveDemoLink"
                  value={project.liveDemoLink}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="https://yourproject.com"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                />

              </div>

            </div>


            {/* ================= DATES ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

              {/* START DATE */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={project.startDate}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                />

              </div>


              {/* END DATE */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={project.endDate}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                />

              </div>

            </div>


            {/* ================= TECH STACK ================= */}

            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tech Stack Used
              </label>

              <input
                type="text"
                name="techStack"
                value={project.techStack}
                onChange={(e) => handleChange(index, e)}
                placeholder="e.g. React, Node.js, Express, MongoDB"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
              />

              <p className="text-xs text-gray-400 mt-2">
                Separate technologies using commas.
              </p>

            </div>


            {/* ================= DESCRIPTION ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={project.description}
                onChange={(e) => handleChange(index, e)}
                placeholder="Describe your project, your role, key features and what you achieved..."
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] resize-none"
              />

            </div>

          </div>

        ))}

      </div>


      {/* ================= ADD PROJECT BUTTON ================= */}

      <button
        type="button"
        onClick={addProject}
        className="mt-5 w-full border-2 border-dashed border-gray-300 rounded-2xl py-4 text-gray-600 font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300"
      >
        + Add Another Project
      </button>


    </div>
  );
}

export default Projects;