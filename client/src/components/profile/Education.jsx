const emptyEducation = {
  degree: "",
  college: "",
  field: "",
  startYear: "",
  endYear: "",
  percentage: "",
};

function Education({ education, setProfile }) {
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setProfile((prev) => {
      const updatedEducation = [...prev.education];

      updatedEducation[index] = {
        ...updatedEducation[index],
        [name]: value,
      };

      return {
        ...prev,
        education: updatedEducation,
      };
    });
  };

  const addEducation = () => {
    setProfile((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { ...emptyEducation },
      ],
    }));
  };

  const removeEducation = (index) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Education
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Add your educational qualifications.
        </p>
      </div>

      <div className="space-y-6">
        {education.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-5 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold">
                Education {index + 1}
              </h3>

              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="degree"
                value={item.degree}
                onChange={(e) => handleChange(index, e)}
                placeholder="Degree (B.Tech, MCA, etc.)"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                name="college"
                value={item.college}
                onChange={(e) => handleChange(index, e)}
                placeholder="College / University"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                name="field"
                value={item.field}
                onChange={(e) => handleChange(index, e)}
                placeholder="Field of Study"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                name="percentage"
                value={item.percentage}
                onChange={(e) => handleChange(index, e)}
                placeholder="CGPA / Percentage"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3"
              />

              <input
                type="number"
                name="startYear"
                value={item.startYear}
                onChange={(e) => handleChange(index, e)}
                placeholder="Start Year"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3"
              />

              <input
                type="number"
                name="endYear"
                value={item.endYear}
                onChange={(e) => handleChange(index, e)}
                placeholder="End Year"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addEducation}
        className="mt-5 w-full border-2 border-dashed border-gray-300 rounded-2xl py-4 text-gray-600 font-medium"
      >
        + Add Another Education
      </button>
    </div>
  );
}

export default Education;