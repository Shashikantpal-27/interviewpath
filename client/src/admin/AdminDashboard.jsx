import { useEffect, useState } from "react";
import { getDashboard } from "../api/adminApi.js";


function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const response = await getDashboard();

        setDashboard(response.data);

      } catch (error) {

        console.error(
          "Dashboard error:",
          error
        );

        setError(error.message);

      } finally {

        setLoading(false);

      }
    };


    loadDashboard();

  }, []);


  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">
          Loading dashboard...
        </p>
      </div>
    );
  }


  // ================================
  // ERROR
  // ================================

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-5 rounded-xl">
        {error}
      </div>
    );
  }


  return (
    <div>

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of InterviewPath AI
        </p>

      </div>


      {/* ================================= */}
      {/* STATISTICS */}
      {/* ================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


        {/* USERS */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500">
            Total Users
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {dashboard?.totalUsers ?? 0}
          </h2>

        </div>


        {/* ADMINS */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500">
            Total Admins
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {dashboard?.totalAdmins ?? 0}
          </h2>

        </div>


        {/* COMPANIES */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500">
            Total Companies
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {dashboard?.totalCompanies ?? 0}
          </h2>

        </div>


        {/* ROLES */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500">
            Total Roles
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {dashboard?.totalRoles ?? 0}
          </h2>

        </div>


        {/* ROADMAPS */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500">
            Total Roadmaps
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {dashboard?.totalRoadmaps ?? 0}
          </h2>

        </div>


        {/* PENDING INTERVIEWS */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500">
            Pending Interviews
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {dashboard?.pendingInterviewExperiences ?? 0}
          </h2>

        </div>


        {/* PENDING REPORTS */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500">
            Pending Reports
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {dashboard?.pendingReports ?? 0}
          </h2>

        </div>


        {/* APPROVED INTERVIEWS */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500">
            Approved Interviews
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {dashboard?.approvedInterviewExperiences ?? 0}
          </h2>

        </div>

      </div>


      {/* ================================= */}
      {/* RECENT ACTIVITIES */}
      {/* ================================= */}

      <div className="bg-white rounded-2xl shadow-sm mt-8">

        <div className="p-6 border-b">

          <h2 className="text-xl font-bold text-gray-800">
            Recent Admin Activities
          </h2>

        </div>


        <div className="p-6">

          {dashboard?.recentActivities?.length === 0 ? (

            <p className="text-gray-500">
              No recent activities found.
            </p>

          ) : (

            <div className="space-y-4">

              {dashboard?.recentActivities?.map(
                (activity) => (

                  <div
                    key={activity._id}
                    className="border-b pb-4 last:border-b-0"
                  >

                    <div className="flex justify-between">

                      <div>

                        <p className="font-semibold text-gray-800">
                          {activity.action}
                        </p>

                        <p className="text-sm text-gray-500">
                          {activity.description}
                        </p>

                      </div>

                      <span className="text-sm text-gray-400">
                        {activity.module}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}


export default AdminDashboard;