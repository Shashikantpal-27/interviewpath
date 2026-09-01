import React, { useEffect, useState } from "react";

import {
  getAdminProfile,
  updateAdminProfile,
} from "../api/adminApi.js";


function AdminProfile() {

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Admin",
  });

  const [editing, setEditing] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);


  // =================================
  // FETCH ADMIN PROFILE
  // =================================

  useEffect(() => {
    fetchAdminProfile();
  }, []);


  const fetchAdminProfile = async () => {

    try {

      setLoading(true);

      const response =
        await getAdminProfile();

      const data = response.data;

      setAdmin({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        role: data.role || "Admin",
      });

    } catch (error) {

      console.error(
        "Failed to fetch admin profile:",
        error
      );

      setMessage(
        error.message ||
        "Failed to load admin profile"
      );

    } finally {

      setLoading(false);

    }
  };


  // =================================
  // HANDLE INPUT
  // =================================

  const handleChange = (e) => {

    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });

  };


  // =================================
  // SAVE PROFILE
  // =================================

  const handleSave = async () => {

    try {

      const response =
        await updateAdminProfile({
          name: admin.name,
          email: admin.email,
        });


      setAdmin({
        ...admin,
        name: response.data.name,
        email: response.data.email,
      });


      setEditing(false);

      setMessage(
        "Profile updated successfully."
      );


      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {

      console.error(error);

      setMessage(
        error.message ||
        "Failed to update profile"
      );

    }
  };


  // =================================
  // LOADING
  // =================================

  if (loading) {

    return (
      <div className="p-6">
        <p className="text-gray-500">
          Loading admin profile...
        </p>
      </div>
    );

  }


  return (
    <div>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Admin Profile
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your administrator profile information.
        </p>

      </div>


      {/* MESSAGE */}

      {message && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-lg">
          {message}
        </div>
      )}


      {/* PROFILE CARD */}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">


        {/* PROFILE HEADER */}

        <div className="bg-red-800 px-8 py-8">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-white text-red-800 flex items-center justify-center text-3xl font-bold">

              {admin.name
                ? admin.name.charAt(0).toUpperCase()
                : "A"}

            </div>


            <div>

              <h2 className="text-2xl font-bold text-white">

                {admin.name || "Admin"}

              </h2>

              <p className="text-red-100 mt-1">

                {admin.role}

              </p>

            </div>

          </div>

        </div>


        {/* PROFILE DETAILS */}

        <div className="p-8">

          <div className="grid md:grid-cols-2 gap-6">


            {/* NAME */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={admin.name}
                disabled={!editing}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg outline-none ${
                  editing
                    ? "border-gray-300 focus:ring-2 focus:ring-red-800"
                    : "border-gray-200 bg-gray-50"
                }`}
              />

            </div>


            {/* EMAIL */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={admin.email}
                disabled={!editing}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg outline-none ${
                  editing
                    ? "border-gray-300 focus:ring-2 focus:ring-red-800"
                    : "border-gray-200 bg-gray-50"
                }`}
              />

            </div>


            {/* PHONE */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={admin.phone}
                disabled={!editing}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={`w-full px-4 py-3 border rounded-lg outline-none ${
                  editing
                    ? "border-gray-300 focus:ring-2 focus:ring-red-800"
                    : "border-gray-200 bg-gray-50"
                }`}
              />

            </div>


            {/* ROLE */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>

              <input
                type="text"
                value={admin.role}
                disabled
                className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg outline-none"
              />

            </div>

          </div>


          {/* BUTTONS */}

          <div className="flex justify-end gap-3 mt-8">

            {!editing ? (

              <button
                onClick={() => setEditing(true)}
                className="px-6 py-3 bg-red-800 hover:bg-red-900 text-white rounded-lg font-medium"
              >
                Edit Profile
              </button>

            ) : (

              <>
                <button
                  onClick={() => {
                    setEditing(false);
                    fetchAdminProfile();
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-red-800 hover:bg-red-900 text-white rounded-lg font-medium"
                >
                  Save Changes
                </button>
              </>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminProfile;