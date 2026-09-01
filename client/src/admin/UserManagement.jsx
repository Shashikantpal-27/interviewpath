import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
} from "../api/adminApi.js";

function UserManagement() {

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =================================
  // FETCH USERS
  // =================================

  const fetchUsers = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await getAllUsers();

      /*
        Backend response expected:

        {
          success: true,
          data: [...]
        }
      */

      setUsers(response.data || []);

    } catch (error) {

      console.error(
        "Fetch users error:",
        error
      );

      setError(
        error.message ||
        "Failed to fetch users"
      );

    } finally {

      setLoading(false);

    }
  };


  // =================================
  // LOAD USERS WHEN PAGE OPENS
  // =================================

  useEffect(() => {

    fetchUsers();

  }, []);


  // =================================
  // DELETE USER
  // =================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this user?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      await deleteUser(id);

      // Remove deleted user
      // from current UI

      setUsers((previousUsers) =>
        previousUsers.filter(
          (user) =>
            user._id !== id
        )
      );

    } catch (error) {

      console.error(
        "Delete user error:",
        error
      );

      alert(
        error.message ||
        "Failed to delete user"
      );

    }
  };


  // =================================
  // SEARCH
  // =================================

  const filteredUsers =
    users.filter((user) => {

      const name =
        user.fullName || "";

      const email =
        user.email || "";

      return (
        name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    });


  // =================================
  // LOADING
  // =================================

  if (loading) {

    return (

      <div className="flex justify-center items-center min-h-[400px]">

        <p className="text-gray-500">
          Loading users...
        </p>

      </div>

    );
  }


  // =================================
  // ERROR
  // =================================

  if (error) {

    return (

      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5">

        <p className="font-medium">
          {error}
        </p>


        <button
          onClick={fetchUsers}
          className="mt-3 px-4 py-2 bg-red-800 text-white rounded-lg"
        >
          Retry
        </button>

      </div>

    );
  }


  return (

    <div>

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            User Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all registered users of InterviewPath AI.
          </p>

        </div>


        <div className="bg-red-50 text-red-800 px-4 py-2 rounded-lg text-sm font-medium">

          Total Users: {users.length}

        </div>

      </div>


      {/* ================= SEARCH ================= */}

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
          />


          <button
            onClick={() =>
              setSearch("")
            }
            className="px-5 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Clear
          </button>

        </div>

      </div>


      {/* ================= USER TABLE ================= */}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  User
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Email
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Joined
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredUsers.length > 0 ? (

                filteredUsers.map((user) => (

                  <tr
                    key={user._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    {/* USER */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-semibold">

                          {(
                            user.fullName ||
                            "U"
                          )
                            .charAt(0)
                            .toUpperCase()}

                        </div>


                        <span className="font-medium text-gray-800">

                          {user.fullName}

                        </span>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td className="px-6 py-4 text-sm text-gray-600">

                      {user.email}

                    </td>


                    {/* ROLE */}

                    <td className="px-6 py-4">

                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">

                        {user.role}

                      </span>

                    </td>


                    {/* JOINED */}

                    <td className="px-6 py-4 text-sm text-gray-600">

                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "-"}

                    </td>


                    {/* DELETE */}

                    <td className="px-6 py-4 text-center">

                      <button
                        onClick={() =>
                          handleDelete(
                            user._id
                          )
                        }
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-12 text-gray-500"
                  >

                    No users found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default UserManagement;