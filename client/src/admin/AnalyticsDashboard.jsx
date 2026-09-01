import React, { useEffect, useState } from "react";
import { getAnalytics } from "../api/adminApi.js";

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAnalytics();

      setAnalytics(data.data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6 text-gray-500">
        No analytics data available.
      </div>
    );
  }

  return (
    <div>

      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of platform activity and statistics.
        </p>
      </div>


      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Users
          </p>

          <p className="text-3xl font-bold text-gray-800 mt-2">
            {analytics.totalUsers || 0}
          </p>
        </div>


        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Companies
          </p>

          <p className="text-3xl font-bold text-gray-800 mt-2">
            {analytics.totalCompanies || 0}
          </p>
        </div>


        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Roles
          </p>

          <p className="text-3xl font-bold text-gray-800 mt-2">
            {analytics.totalRoles || 0}
          </p>
        </div>


        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Roadmaps
          </p>

          <p className="text-3xl font-bold text-gray-800 mt-2">
            {analytics.totalRoadmaps || 0}
          </p>
        </div>

      </div>


      {/* OTHER ANALYTICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Interview Experiences
          </h2>

          <p className="text-gray-600">
            Total:{" "}
            <span className="font-semibold">
              {analytics.totalInterviewExperiences || 0}
            </span>
          </p>
        </div>


        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Reports
          </h2>

          <p className="text-gray-600">
            Total:{" "}
            <span className="font-semibold">
              {analytics.totalReports || 0}
            </span>
          </p>
        </div>

      </div>

    </div>
  );
}

export default AnalyticsDashboard;