import React, { useEffect, useState } from "react";

import {
  getAllInterviewExperiences,
  approveInterviewExperience,
  rejectInterviewExperience,
  deleteInterviewExperience,
} from "../api/adminApi.js";
function InterviewExperienceManagement() {

  // Temporary data
  // Later MongoDB/API se aayega

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedExperience, setSelectedExperience] =
    useState(null);


  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus = (id, newStatus) => {

    setExperiences(
      experiences.map((experience) =>
        experience.id === id
          ? {
            ...experience,
            status: newStatus,
          }
          : experience
      )
    );

    setSelectedExperience(null);
  };


  // =========================
  // APPROVE
  // =========================

  const handleApprove = async (id) => {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this interview experience?"
    );

    if (!confirmApprove) return;

    try {
      await approveInterviewExperience(id);

      alert("Interview experience approved successfully");

      setSelectedExperience(null);

      await fetchExperiences();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };


  // =========================
  // REJECT
  // =========================

  const handleReject = async (id) => {
    const rejectionReason = window.prompt(
      "Enter rejection reason:"
    );

    if (!rejectionReason || !rejectionReason.trim()) {
      return;
    }

    try {
      await rejectInterviewExperience(
        id,
        rejectionReason.trim()
      );

      alert("Interview experience rejected successfully");

      setSelectedExperience(null);

      await fetchExperiences();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview experience?"
    );

    if (!confirmDelete) return;

    try {
      await deleteInterviewExperience(id);

      alert("Interview experience deleted successfully");

      setSelectedExperience(null);

      await fetchExperiences();

    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };
  // =========================
  // FILTER
  // =========================

  const filteredExperiences = experiences.filter(
    (experience) => {

      const candidate =
        experience.userId?.name || "";

      const company =
        experience.companyId?.name || "";

      const role =
        experience.roleId?.title || "";

      const matchesSearch =
        candidate
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        company
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        role
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        experience.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  // =========================
  // STATUS COUNTS
  // =========================

  const pendingCount = experiences.filter(
    (item) => item.status === "pending"
  ).length;

  const approvedCount = experiences.filter(
    (item) => item.status === "approved"
  ).length;

  const rejectedCount = experiences.filter(
    (item) => item.status === "rejected"
  ).length;

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllInterviewExperiences();

      setExperiences(data.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch interview experiences:",
        error
      );

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);


  return (
    <div>

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Interview Experience Management
        </h1>

        <p className="text-gray-500 mt-1">
          Review, approve and reject interview experiences submitted by users.
        </p>

      </div>


      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {/* Pending */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Pending
          </p>

          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {pendingCount}
          </p>

        </div>


        {/* Approved */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Approved
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {approvedCount}
          </p>

        </div>


        {/* Rejected */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Rejected
          </p>

          <p className="text-3xl font-bold text-red-600 mt-2">
            {rejectedCount}
          </p>

        </div>

      </div>


      {/* ================= SEARCH + FILTER ================= */}

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search candidate, company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
          />


          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-800 bg-white"
          >
            <option value="All">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

        </div>

      </div>


      {/* ================= TABLE ================= */}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Candidate
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Company
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-500"
                  >
                    Loading interview experiences...
                  </td>
                </tr>

              ) : filteredExperiences.length > 0 ? (

                filteredExperiences.map((experience) => (

                  <tr
                    key={experience._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-semibold">
                          {experience.userId?.name?.charAt(0) || "U"}
                        </div>

                        <span className="font-medium text-gray-800">
                          {experience.userId?.name || "Unknown"}
                        </span>

                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {experience.companyId?.name || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {experience.roleId?.title || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {experience.interviewDate
                        ? new Date(
                          experience.interviewDate
                        ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${experience.status === "pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : experience.status === "approved"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                      >
                        {experience.status}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-center">

                      <button
                        onClick={() =>
                          setSelectedExperience(experience)
                        }
                        className="px-4 py-2 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg"
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-500"
                  >
                    No interview experiences found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ================= VIEW MODAL ================= */}

      {selectedExperience && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] px-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-7">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Interview Experience
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Submitted by {selectedExperience.userId?.name || "Unknown"}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedExperience(null)
                }
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>

            </div>


            {/* Basic Details */}

            <div className="grid md:grid-cols-2 gap-4 mb-6">

              <div className="bg-gray-50 rounded-lg p-4">

                <p className="text-xs text-gray-500">
                  Company
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {selectedExperience.companyId?.name || "N/A"}
                </p>

              </div>


              <div className="bg-gray-50 rounded-lg p-4">

                <p className="text-xs text-gray-500">
                  Role
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {selectedExperience.roleId?.title || "N/A"}
                </p>

              </div>


              <div className="bg-gray-50 rounded-lg p-4">

                <p className="text-xs text-gray-500">
                  Submitted Date
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {selectedExperience.interviewDate
                    ? new Date(
                      selectedExperience.interviewDate
                    ).toLocaleDateString()
                    : "N/A"}
                </p>

              </div>


              <div className="bg-gray-50 rounded-lg p-4">

                <p className="text-xs text-gray-500">
                  Status
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {selectedExperience.status}
                </p>

              </div>

            </div>


            {/* Difficulty */}

            <div className="mb-6">

              <h3 className="font-semibold text-gray-800 mb-3">
                Interview Difficulty
              </h3>

              <div className="bg-gray-50 rounded-lg p-4">

                <span className="capitalize font-medium text-gray-700">
                  {selectedExperience.difficulty || "N/A"}
                </span>

              </div>

            </div>
            {selectedExperience.rejectionReason && (
              <div className="mb-6">

                <h3 className="font-semibold text-gray-800 mb-3">
                  Rejection Reason
                </h3>

                <div className="bg-red-50 text-red-700 rounded-lg p-4">
                  {selectedExperience.rejectionReason}
                </div>

              </div>
            )}

            {/* Experience */}

            <div className="mb-6">

              <h3 className="font-semibold text-gray-800 mb-3">
                Candidate Experience
              </h3>

              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-6">
                {selectedExperience.experience}
              </div>

            </div>


            {/* Actions */}

            {selectedExperience.status === "pending" && (

              <div className="flex justify-end gap-3">

                <button
                  onClick={() =>
                    handleDelete(selectedExperience._id)
                  }
                  className="px-5 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    handleReject(
                      selectedExperience._id
                    )
                  }
                  className="px-5 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium"
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    handleApprove(
                      selectedExperience._id
                    )
                  }
                  className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                >
                  Approve
                </button>


              </div>


            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default InterviewExperienceManagement;