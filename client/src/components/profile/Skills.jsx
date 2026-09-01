import { useState } from "react";

function Skills() {
  const [skills, setSkills] = useState([
    {
      name: "",
      category: "Programming Languages",
      proficiency: "Intermediate",
    },
  ]);

  // ================= HANDLE CHANGE =================

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedSkills = [...skills];

    updatedSkills[index][name] = value;

    setSkills(updatedSkills);
  };

  // ================= ADD SKILL =================

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        name: "",
        category: "Programming Languages",
        proficiency: "Intermediate",
      },
    ]);
  };

  // ================= REMOVE SKILL =================

  const removeSkill = (index) => {
    const updatedSkills = skills.filter(
      (_, i) => i !== index
    );

    setSkills(updatedSkills);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">

      {/* ================= HEADER ================= */}

      <div className="mb-6">

        <h2 className="text-2xl font-semibold">
          Skills
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Add the technical and professional skills you have.
        </p>

      </div>


      {/* ================= SKILLS ================= */}

      <div className="space-y-4">

        {skills.map((skill, index) => (

          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-5 bg-gray-50"
          >

            {/* ================= TOP ================= */}

            <div className="flex items-center justify-between mb-4">

              <h3 className="font-semibold text-gray-700">
                Skill {index + 1}
              </h3>

              {skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-500 text-sm font-medium hover:text-red-700"
                >
                  Remove
                </button>
              )}

            </div>


            {/* ================= SKILL NAME ================= */}

            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill Name
              </label>

              <input
                type="text"
                name="name"
                value={skill.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="e.g. React.js"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
              />

            </div>


            {/* ================= CATEGORY + PROFICIENCY ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* CATEGORY */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={skill.category}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                >

                  <option value="Programming Languages">
                    Programming Languages
                  </option>

                  <option value="Frontend">
                    Frontend
                  </option>

                  <option value="Backend">
                    Backend
                  </option>

                  <option value="Database">
                    Database
                  </option>

                  <option value="DevOps & Cloud">
                    DevOps & Cloud
                  </option>

                  <option value="Tools">
                    Tools
                  </option>

                  <option value="Data Science & ML">
                    Data Science & ML
                  </option>

                  <option value="Soft Skills">
                    Soft Skills
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              {/* PROFICIENCY */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proficiency
                </label>

                <select
                  name="proficiency"
                  value={skill.proficiency}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                >

                  <option value="Beginner">
                    Beginner
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Advanced">
                    Advanced
                  </option>

                  <option value="Expert">
                    Expert
                  </option>

                </select>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* ================= ADD SKILL ================= */}

      <button
        type="button"
        onClick={addSkill}
        className="mt-5 w-full border-2 border-dashed border-gray-300 rounded-2xl py-4 text-gray-600 font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300"
      >
        + Add Another Skill
      </button>


    </div>
  );
}

export default Skills;