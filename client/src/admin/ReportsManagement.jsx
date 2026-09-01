import React, {
  useEffect,
  useState
} from "react";

import {
  getAllReports,
  getReportById,
  resolveReport,
  dismissReport,
} from "../api/adminApi.js";

function ReportsManagement() {

  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedReport, setSelectedReport] =
    useState(null);


  // =================================
  // FETCH REPORTS
  // =================================

  const fetchReports = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getAllReports();

      setReports(data.data || []);

    } catch (error) {

      console.error(
        "Failed to fetch reports:",
        error
      );

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };


  // =================================
  // LOAD REPORTS
  // =================================

  useEffect(() => {

    fetchReports();

  }, []);


  // =================================
  // VIEW REPORT
  // =================================

  const handleViewReport = async (id) => {

    try {

      const data =
        await getReportById(id);

      setSelectedReport(
        data.data
      );

    } catch (error) {

      console.error(error);

      alert(error.message);

    }
  };


  // =================================
  // RESOLVE REPORT
  // =================================

  const handleResolve = async (id) => {

    const adminAction =
      window.prompt(
        "Enter action taken to resolve this report:"
      );

    if (
      !adminAction ||
      !adminAction.trim()
    ) {
      return;
    }


    const confirmAction =
      window.confirm(
        "Are you sure you want to resolve this report?"
      );

    if (!confirmAction) return;


    try {

      await resolveReport(
        id,
        adminAction.trim()
      );

      alert(
        "Report resolved successfully"
      );

      setSelectedReport(null);

      await fetchReports();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }
  };


  // =================================
  // DISMISS REPORT
  // =================================

  const handleDismiss = async (id) => {

    const adminAction =
      window.prompt(
        "Enter reason/action for dismissing this report:"
      );

    if (
      !adminAction ||
      !adminAction.trim()
    ) {
      return;
    }


    const confirmAction =
      window.confirm(
        "Are you sure you want to dismiss this report?"
      );

    if (!confirmAction) return;


    try {

      await dismissReport(
        id,
        adminAction.trim()
      );

      alert(
        "Report dismissed successfully"
      );

      setSelectedReport(null);

      await fetchReports();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }
  };


  // =================================
  // FILTER
  // =================================

  const filteredReports =
    reports.filter((report) => {

      const reporter =
        report.reportedBy?.fullName ||
        report.reportedBy?.fullName ||
        "";

      const reason =
        report.reason || "";

      const description =
        report.description || "";

      const targetType =
        report.targetType || "";


      const searchText =
        search.toLowerCase();


      const matchesSearch =
        reporter
          .toLowerCase()
          .includes(searchText) ||

        reason
          .toLowerCase()
          .includes(searchText) ||

        description
          .toLowerCase()
          .includes(searchText) ||

        targetType
          .toLowerCase()
          .includes(searchText);


      const matchesStatus =
        statusFilter === "All" ||
        report.status === statusFilter;


      return (
        matchesSearch &&
        matchesStatus
      );

    });


  // =================================
  // COUNTS
  // =================================

  const pendingCount =
    reports.filter(
      (report) =>
        report.status === "pending"
    ).length;


  const resolvedCount =
    reports.filter(
      (report) =>
        report.status === "resolved"
    ).length;


  const dismissedCount =
    reports.filter(
      (report) =>
        report.status === "dismissed"
    ).length;


  // =================================
  // TARGET TYPE FORMAT
  // =================================

  const formatTargetType = (type) => {

    if (!type) return "N/A";

    return type
      .replace(
        /([A-Z])/g,
        " $1"
      )
      .replace(
        /^./,
        (char) =>
          char.toUpperCase()
      );

  };


  // =================================
  // STATUS FORMAT
  // =================================

  const formatStatus = (status) => {

    if (!status) return "N/A";

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );

  };


  return (

    <div>

      {/* ================================= HEADER ================================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Reports Management
        </h1>

        <p className="text-gray-500 mt-1">
          Review and manage reports submitted by users.
        </p>

      </div>


      {/* ================================= STATS ================================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">


        {/* Pending */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Pending Reports
          </p>

          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {pendingCount}
          </p>

        </div>


        {/* Resolved */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Resolved Reports
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {resolvedCount}
          </p>

        </div>


        {/* Dismissed */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Dismissed Reports
          </p>

          <p className="text-3xl font-bold text-gray-600 mt-2">
            {dismissedCount}
          </p>

        </div>

      </div>


      {/* ================================= ERROR ================================= */}

      {error && (

        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">

          {error}

        </div>

      )}


      {/* ================================= SEARCH + FILTER ================================= */}

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">

        <div className="grid md:grid-cols-2 gap-4">


          <input
            type="text"
            placeholder="Search reporter, content or reason..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
          />


          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-800 bg-white"
          >

            <option value="All">
              All Status
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="resolved">
              Resolved
            </option>

            <option value="dismissed">
              Dismissed
            </option>

          </select>

        </div>

      </div>


      {/* ================================= TABLE ================================= */}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Reporter
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Reported Content
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Reason
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
                    Loading reports...
                  </td>

                </tr>

              ) : filteredReports.length > 0 ? (

                filteredReports.map(
                  (report) => {

                    const reporter =
                      report.reportedBy?.fullName ||
                      report.reportedBy?.name ||
                      "Unknown";


                    return (

                      <tr
                        key={report._id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >


                        {/* Reporter */}

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-semibold">

                              {reporter
                                .charAt(0)
                                .toUpperCase()}

                            </div>

                            <span className="font-medium text-gray-800">

                              {reporter}

                            </span>

                          </div>

                        </td>


                        {/* Target */}

                        <td className="px-6 py-4">

                          <div>

                            <p className="text-sm font-medium text-gray-800">

                              {formatTargetType(
                                report.targetType
                              )}

                            </p>

                            <span className="text-xs text-gray-500">

                              ID:{" "}
                              {report.targetId}

                            </span>

                          </div>

                        </td>


                        {/* Reason */}

                        <td className="px-6 py-4">

                          <span className="text-sm text-gray-700">

                            {report.reason}

                          </span>

                        </td>


                        {/* Date */}

                        <td className="px-6 py-4 text-sm text-gray-600">

                          {report.createdAt
                            ? new Date(
                                report.createdAt
                              ).toLocaleDateString()
                            : "N/A"}

                        </td>


                        {/* Status */}

                        <td className="px-6 py-4">

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              report.status ===
                              "pending"
                                ? "bg-yellow-50 text-yellow-700"
                                : report.status ===
                                  "resolved"
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >

                            {formatStatus(
                              report.status
                            )}

                          </span>

                        </td>


                        {/* Action */}

                        <td className="px-6 py-4">

                          <div className="flex justify-center">

                            <button
                              onClick={() =>
                                handleViewReport(
                                  report._id
                                )
                              }
                              className="px-4 py-2 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg"
                            >
                              View
                            </button>

                          </div>

                        </td>

                      </tr>

                    );

                  }
                )

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-500"
                  >
                    No reports found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ================================= REPORT MODAL ================================= */}

      {selectedReport && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] px-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-7">


            {/* Header */}

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Report Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Review the reported content.
                </p>

              </div>


              <button
                onClick={() =>
                  setSelectedReport(null)
                }
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>

            </div>


            {/* Details */}

            <div className="space-y-4">


              {/* Reported By */}

              <div>

                <p className="text-xs text-gray-500">
                  Reported By
                </p>

                <p className="font-semibold text-gray-800 mt-1">

                  {selectedReport.reportedBy?.fullName ||
                    selectedReport.reportedBy?.name ||
                    "Unknown"}

                </p>

                <p className="text-sm text-gray-500">

                  {selectedReport.reportedBy?.email ||
                    ""}

                </p>

              </div>


              {/* Content Type */}

              <div>

                <p className="text-xs text-gray-500">
                  Content Type
                </p>

                <p className="font-semibold text-gray-800 mt-1">

                  {formatTargetType(
                    selectedReport.targetType
                  )}

                </p>

              </div>


              {/* Target ID */}

              <div>

                <p className="text-xs text-gray-500">
                  Target ID
                </p>

                <p className="font-mono text-sm text-gray-700 mt-1 break-all">

                  {selectedReport.targetId}

                </p>

              </div>


              {/* Reason */}

              <div>

                <p className="text-xs text-gray-500">
                  Reason
                </p>

                <p className="font-semibold text-red-600 mt-1">

                  {selectedReport.reason}

                </p>

              </div>


              {/* Description */}

              <div>

                <p className="text-xs text-gray-500">
                  Description
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mt-1 text-sm text-gray-700 leading-6">

                  {selectedReport.description ||
                    "No description provided."}

                </div>

              </div>


              {/* Status */}

              <div>

                <p className="text-xs text-gray-500">
                  Status
                </p>

                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                    selectedReport.status ===
                    "pending"
                      ? "bg-yellow-50 text-yellow-700"
                      : selectedReport.status ===
                        "resolved"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >

                  {formatStatus(
                    selectedReport.status
                  )}

                </span>

              </div>


              {/* Admin Action */}

              {selectedReport.adminAction && (

                <div>

                  <p className="text-xs text-gray-500">
                    Admin Action
                  </p>

                  <div className="bg-blue-50 rounded-lg p-4 mt-1 text-sm text-gray-700">

                    {selectedReport.adminAction}

                  </div>

                </div>

              )}


              {/* Resolved By */}

              {selectedReport.resolvedBy && (

                <div>

                  <p className="text-xs text-gray-500">
                    Handled By
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">

                    {selectedReport.resolvedBy.name ||
                      selectedReport.resolvedBy.email ||
                      "Admin"}

                  </p>

                </div>

              )}

            </div>


            {/* Actions */}

            {selectedReport.status ===
              "pending" && (

              <div className="flex justify-end gap-3 mt-7">


                <button
                  onClick={() =>
                    handleDismiss(
                      selectedReport._id
                    )
                  }
                  className="px-5 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium"
                >
                  Dismiss
                </button>


                <button
                  onClick={() =>
                    handleResolve(
                      selectedReport._id
                    )
                  }
                  className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                >
                  Resolve
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );
}

export default ReportsManagement;