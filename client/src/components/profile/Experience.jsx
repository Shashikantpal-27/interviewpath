import { useState } from "react";

function Experience() {
  const [experiences, setExperiences] = useState([
    {
      companyName: "",
      role: "",
      experienceType: "Internship",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      paymentStatus: "Paid",
      certificateLink: "",
      description: "",
    },
  ]);

  // ================= HANDLE CHANGE =================

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    const updatedExperiences = [...experiences];

    updatedExperiences[index][name] =
      type === "checkbox" ? checked : value;

    // If currently working, clear end date
    if (name === "currentlyWorking" && checked) {
      updatedExperiences[index].endDate = "";
    }

    setExperiences(updatedExperiences);
  };

  // ================= ADD EXPERIENCE =================

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        companyName: "",
        role: "",
        experienceType: "Internship",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        paymentStatus: "Paid",
        certificateLink: "",
        description: "",
      },
    ]);
  };

  // ================= REMOVE EXPERIENCE =================

  const removeExperience = (index) => {
    const updatedExperiences = experiences.filter(
      (_, i) => i !== index
    );

    setExperiences(updatedExperiences);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">

      {/* ================= HEADER ================= */}

      <div className="mb-6">

        <h2 className="text-2xl font-semibold">
          Experience
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Add your internships, work experience, or training.
        </p>

      </div>


      {/* ================= EXPERIENCE LIST ================= */}

      <div className="space-y-6">

        {experiences.map((experience, index) => (

          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-5 bg-gray-50"
          >

            {/* ================= EXPERIENCE HEADER ================= */}

            <div className="flex items-center justify-between mb-5">

              <h3 className="text-lg font-semibold text-gray-800">
                Experience {index + 1}
              </h3>

              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 text-sm font-medium hover:text-red-700"
                >
                  Remove
                </button>
              )}

            </div>


            {/* ================= COMPANY + ROLE ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

              {/* COMPANY */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  value={experience.companyName}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g. Google"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                />

              </div>


              {/* ROLE */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role / Job Title
                </label>

                <input
                  type="text"
                  name="role"
                  value={experience.role}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g. Software Developer Intern"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                />

              </div>

            </div>


            {/* ================= EXPERIENCE TYPE ================= */}

            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Type
              </label>

              <select
                name="experienceType"
                value={experience.experienceType}
                onChange={(e) => handleChange(index, e)}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
              >

                <option value="Internship">
                  Internship
                </option>

                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Contract">
                  Contract
                </option>

                <option value="Freelance">
                  Freelance
                </option>

                <option value="Training">
                  Training
                </option>

                <option value="Volunteer">
                  Volunteer
                </option>

              </select>

            </div>


            {/* ================= DATE ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

              {/* START DATE */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={experience.startDate}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
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
                  value={experience.endDate}
                  disabled={experience.currentlyWorking}
                  onChange={(e) => handleChange(index, e)}
                  className={`w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] ${
                    experience.currentlyWorking
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-white"
                  }`}
                />

              </div>

            </div>


            {/* ================= CURRENTLY WORKING ================= */}

            <div className="mb-4">

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={experience.currentlyWorking}
                  onChange={(e) => handleChange(index, e)}
                  className="w-4 h-4 accent-[var(--primary)]"
                />

                <span className="text-sm text-gray-700">
                  I am currently working here
                </span>

              </label>

            </div>


            {/* ================= PAID / UNPAID ================= */}

            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status
              </label>

              <div className="flex gap-6">

                <label className="flex items-center gap-2 cursor-pointer">

                  <input
                    type="radio"
                    name={`paymentStatus-${index}`}
                    value="Paid"
                    checked={experience.paymentStatus === "Paid"}
                    onChange={() =>
                      handleChange(index, {
                        target: {
                          name: "paymentStatus",
                          value: "Paid",
                        },
                      })
                    }
                    className="accent-[var(--primary)]"
                  />

                  <span className="text-sm text-gray-700">
                    Paid
                  </span>

                </label>


                <label className="flex items-center gap-2 cursor-pointer">

                  <input
                    type="radio"
                    name={`paymentStatus-${index}`}
                    value="Unpaid"
                    checked={
                      experience.paymentStatus === "Unpaid"
                    }
                    onChange={() =>
                      handleChange(index, {
                        target: {
                          name: "paymentStatus",
                          value: "Unpaid",
                        },
                      })
                    }
                    className="accent-[var(--primary)]"
                  />

                  <span className="text-sm text-gray-700">
                    Unpaid
                  </span>

                </label>

              </div>

            </div>


            {/* ================= CERTIFICATE ================= */}

            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">

                Certificate Link

                <span className="text-gray-400 font-normal">
                  {" "}(Optional)
                </span>

              </label>

              <input
                type="url"
                name="certificateLink"
                value={experience.certificateLink}
                onChange={(e) => handleChange(index, e)}
                placeholder="https://drive.google.com/..."
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
              />

            </div>


            {/* ================= DESCRIPTION ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={experience.description}
                onChange={(e) => handleChange(index, e)}
                placeholder="Describe your responsibilities, work, achievements and contributions..."
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] resize-none"
              />

            </div>

          </div>

        ))}

      </div>


      {/* ================= ADD MORE ================= */}

      <button
        type="button"
        onClick={addExperience}
        className="mt-5 w-full border-2 border-dashed border-gray-300 rounded-2xl py-4 text-gray-600 font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300"
      >
        + Add Another Experience
      </button>

    </div>
  );
}

export default Experience;