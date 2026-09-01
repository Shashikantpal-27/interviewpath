import { useState } from "react";

function ResumeSection() {

  const [fileName, setFileName] = useState("No Resume Selected");

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">

      <h2 className="text-2xl font-bold text-[var(--primary)] border-b border-gray-200 pb-3 mb-6">
        Resume
      </h2>

      <label className="inline-flex items-center px-5 py-3 bg-[var(--primary)] text-white rounded-xl cursor-pointer hover:bg-[var(--accent)] transition">

        Choose Resume

        <input
          type="file"
          accept=".pdf"
          hidden
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setFileName(e.target.files[0].name);
            }
          }}
        />

      </label>

      <p className="mt-4 text-gray-600 font-medium">
        {fileName}
      </p>

    </div>
  );
}

export default ResumeSection;