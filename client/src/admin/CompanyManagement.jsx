import React, {
  useEffect,
  useState
} from "react";

import {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../api/adminApi.js";

function CompanyManagement() {

 const [companies, setCompanies] = useState([]);

const [loading, setLoading] = useState(true);

const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingCompany, setEditingCompany] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    website: "",
    description: "",
  });

  const fetchCompanies = async () => {

  try {

    setLoading(true);
    setError("");

    const response =
      await getAllCompanies();

    setCompanies(
      response.data || []
    );

  } catch (error) {

    console.error(
      "Fetch companies error:",
      error
    );

    setError(
      error.message ||
      "Failed to fetch companies"
    );

  } finally {

    setLoading(false);
  }
};

useEffect(() => {

  fetchCompanies();

}, []);


  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


  // =========================
  // OPEN ADD MODAL
  // =========================

  const handleAddCompany = () => {

    setEditingCompany(null);

    setFormData({
      name: "",
      industry: "",
      website: "",
      description: "",
    });

    setShowModal(true);
  };


  // =========================
  // OPEN EDIT MODAL
  // =========================
const handleEditCompany = (company) => {

  setEditingCompany(company);

  setFormData({
    name: company.name || "",
    industry: company.industry || "",
    website: company.website || "",
    description: company.description || "",
  });

  setShowModal(true);
};


  // =========================
  // SAVE COMPANY
  // =========================

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (
    !formData.name ||
    !formData.industry
  ) {

    alert(
      "Company name and industry are required."
    );

    return;
  }


  try {

    // =========================
    // UPDATE
    // =========================

    if (editingCompany) {

      const response =
        await updateCompany(
          editingCompany._id,
          formData
        );

      setCompanies(
        companies.map((company) =>
          company._id ===
          editingCompany._id
            ? response.data
            : company
        )
      );

    }

    // =========================
    // CREATE
    // =========================

    else {

      const response =
        await createCompany(
          formData
        );

      setCompanies([
        response.data,
        ...companies,
      ]);

    }


    // Close modal

    setShowModal(false);

    setEditingCompany(null);


    // Reset form

    setFormData({
      name: "",
      industry: "",
      website: "",
      description: "",
    });


  } catch (error) {

    console.error(
      "Save company error:",
      error
    );

    alert(
      error.message ||
      "Failed to save company"
    );
  }
};
  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {

  const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this company?"
    );

  if (!confirmDelete) {
    return;
  }


  try {

    await deleteCompany(id);


    setCompanies(
      (previousCompanies) =>
        previousCompanies.filter(
          (company) =>
            company._id !== id
        )
    );

  } catch (error) {

    console.error(
      "Delete company error:",
      error
    );

    alert(
      error.message ||
      "Failed to delete company"
    );
  }
};
  // =========================
  // SEARCH
  // =========================

  const filteredCompanies = companies.filter(
    (company) =>
      company.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      company.industry
        .toLowerCase()
        .includes(search.toLowerCase())
  );


  return (
    <div>

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Company Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage companies available on InterviewPath AI.
          </p>

        </div>


        <button
          onClick={handleAddCompany}
          className="px-5 py-3 bg-red-800 hover:bg-red-900 text-white rounded-lg font-medium transition"
        >
          + Add Company
        </button>

      </div>


      {/* ================= SEARCH ================= */}

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">

        <input
          type="text"
          placeholder="Search company or industry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
        />

      </div>


      {/* ================= COMPANY TABLE ================= */}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Company
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Industry
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Website
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Description
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredCompanies.length > 0 ? (

                filteredCompanies.map((company) => (

                  <tr
                    key={company._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >

                    {/* Company */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-lg bg-red-100 text-red-800 flex items-center justify-center font-bold">
                          {company.name.charAt(0)}
                        </div>

                        <span className="font-medium text-gray-800">
                          {company.name}
                        </span>

                      </div>

                    </td>


                    {/* Industry */}

                    <td className="px-6 py-4">

                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {company.industry}
                      </span>

                    </td>


                    {/* Website */}

                    <td className="px-6 py-4">

                      <a
                        href={company.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-red-800 hover:underline text-sm"
                      >
                        Visit
                      </a>

                    </td>


                    {/* Description */}

                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      {company.description}
                    </td>


                    {/* Actions */}

                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            handleEditCompany(company)
                          }
                          className="px-3 py-2 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(company._id)
                          }
                          className="px-3 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-12 text-gray-500"
                  >
                    No companies found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ================= MODAL ================= */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] px-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-7">

            {/* Modal Header */}

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold text-gray-800">

                {editingCompany
                  ? "Edit Company"
                  : "Add Company"}

              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>

            </div>


            {/* Form */}

            <form onSubmit={handleSubmit}>

              {/* Company Name */}

              <div className="mb-4">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Google"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-800"
                />

              </div>


              {/* Industry */}

              <div className="mb-4">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>

                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. Technology"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-800"
                />

              </div>


              {/* Website */}

              <div className="mb-4">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>

                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-800"
                />

              </div>


              {/* Description */}

              <div className="mb-6">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Company description..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-800 resize-none"
                />

              </div>


              {/* Buttons */}

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 bg-red-800 hover:bg-red-900 text-white rounded-lg"
                >
                  {editingCompany
                    ? "Update Company"
                    : "Add Company"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default CompanyManagement;