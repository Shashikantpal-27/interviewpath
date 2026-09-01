import React, { useEffect, useState } from "react";

import {
  getSettings,
  updateSettings,
} from "../api/adminApi.js";

function Settings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "InterviewPath AI",
    siteDescription:
      "AI-powered interview preparation platform",
    maintenanceMode: false,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newUser: true,
    newReport: true,
    newExperience: true,
  });

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);

  // =========================
  // GENERAL SETTINGS
  // =========================

  const fetchSettings = async () => {
  try {
    setLoading(true);

    const response = await getSettings();

    const settings = response.data;

    setGeneralSettings({
      siteName: settings.siteName || "",
      siteDescription:
        settings.siteDescription || "",
      maintenanceMode:
        settings.maintenanceMode || false,
    });

    setNotificationSettings({
      newUser:
        settings.notifications?.newUser ?? true,

      newReport:
        settings.notifications?.newReport ?? true,

      newExperience:
        settings.notifications?.newExperience ?? true,
    });

  } catch (error) {

    console.error(
      "Failed to fetch settings:",
      error
    );

    setMessage(
      error.message ||
      "Failed to load settings"
    );

  } finally {

    setLoading(false);

  }
};
useEffect(() => {
  fetchSettings();
}, []);

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;

    setGeneralSettings({
      ...generalSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // =========================
  // NOTIFICATION SETTINGS
  // =========================

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;

    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    });
  };

  // =========================
  // SAVE SETTINGS
  // =========================

  const handleSave = async () => {
  try {

    setSaving(true);

    const settingsData = {
      siteName:
        generalSettings.siteName,

      siteDescription:
        generalSettings.siteDescription,

      maintenanceMode:
        generalSettings.maintenanceMode,

      notifications: {
        newUser:
          notificationSettings.newUser,

        newReport:
          notificationSettings.newReport,

        newExperience:
          notificationSettings.newExperience,
      },
    };


    const response =
      await updateSettings(
        settingsData
      );


    // Update UI with backend response

    const settings = response.data;

    setGeneralSettings({
      siteName:
        settings.siteName,

      siteDescription:
        settings.siteDescription,

      maintenanceMode:
        settings.maintenanceMode,
    });


    setNotificationSettings({
      newUser:
        settings.notifications?.newUser ?? true,

      newReport:
        settings.notifications?.newReport ?? true,

      newExperience:
        settings.notifications?.newExperience ?? true,
    });


    setMessage(
      "Settings saved successfully."
    );


    setTimeout(() => {
      setMessage("");
    }, 3000);

  } catch (error) {

    console.error(
      "Failed to save settings:",
      error
    );

    setMessage(
      error.message ||
      "Failed to save settings"
    );

  } finally {

    setSaving(false);

  }
};

  return (
    <div>
      {loading && (
  <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-700 px-5 py-3 rounded-lg">
    Loading settings...
  </div>
)}

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your platform and admin preferences.
        </p>

      </div>


      {/* ================= SUCCESS MESSAGE ================= */}

      {message && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-lg">
          {message}
        </div>
      )}


      {/* ================= GENERAL SETTINGS ================= */}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">

        <div className="mb-6">

          <h2 className="text-lg font-semibold text-gray-800">
            General Settings
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Configure basic platform information.
          </p>

        </div>


        {/* Site Name */}

        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Name
          </label>

          <input
            type="text"
            name="siteName"
            value={generalSettings.siteName}
            onChange={handleGeneralChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
          />

        </div>


        {/* Site Description */}

        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Description
          </label>

          <textarea
            name="siteDescription"
            value={generalSettings.siteDescription}
            onChange={handleGeneralChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 resize-none"
          />

        </div>


        {/* Maintenance Mode */}

        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">

          <div>

            <p className="font-medium text-gray-800">
              Maintenance Mode
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Temporarily disable access to the platform.
            </p>

          </div>


          <label className="relative inline-flex items-center cursor-pointer">

            <input
              type="checkbox"
              name="maintenanceMode"
              checked={generalSettings.maintenanceMode}
              onChange={handleGeneralChange}
              className="sr-only peer"
            />

            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-red-800 transition"></div>

            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>

          </label>

        </div>

      </div>


      {/* ================= NOTIFICATION SETTINGS ================= */}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">

        <div className="mb-6">

          <h2 className="text-lg font-semibold text-gray-800">
            Notification Settings
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Choose which activities should notify the administrator.
          </p>

        </div>


        {/* New User */}

        <div className="flex items-center justify-between py-4 border-b border-gray-100">

          <div>

            <p className="font-medium text-gray-800">
              New User
            </p>

            <p className="text-sm text-gray-500">
              Notify when a new user registers.
            </p>

          </div>

          <input
            type="checkbox"
            name="newUser"
            checked={notificationSettings.newUser}
            onChange={handleNotificationChange}
            className="w-5 h-5 accent-red-800 cursor-pointer"
          />

        </div>


        {/* New Report */}

        <div className="flex items-center justify-between py-4 border-b border-gray-100">

          <div>

            <p className="font-medium text-gray-800">
              New Report
            </p>

            <p className="text-sm text-gray-500">
              Notify when a user submits a report.
            </p>

          </div>

          <input
            type="checkbox"
            name="newReport"
            checked={notificationSettings.newReport}
            onChange={handleNotificationChange}
            className="w-5 h-5 accent-red-800 cursor-pointer"
          />

        </div>


        {/* New Interview Experience */}

        <div className="flex items-center justify-between py-4">

          <div>

            <p className="font-medium text-gray-800">
              New Interview Experience
            </p>

            <p className="text-sm text-gray-500">
              Notify when a new experience requires approval.
            </p>

          </div>

          <input
            type="checkbox"
            name="newExperience"
            checked={notificationSettings.newExperience}
            onChange={handleNotificationChange}
            className="w-5 h-5 accent-red-800 cursor-pointer"
          />

        </div>

      </div>


      {/* ================= SECURITY ================= */}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">

        <div className="mb-6">

          <h2 className="text-lg font-semibold text-gray-800">
            Security
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage administrator security settings.
          </p>

        </div>


        <div className="flex items-center justify-between py-4 border-b border-gray-100">

          <div>

            <p className="font-medium text-gray-800">
              Change Password
            </p>

            <p className="text-sm text-gray-500">
              Update your administrator password.
            </p>

          </div>

          <button
            onClick={() => alert("Password change will be connected to backend later.")}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Change Password
          </button>

        </div>


        <div className="flex items-center justify-between py-4">

          <div>

            <p className="font-medium text-gray-800">
              Session Management
            </p>

            <p className="text-sm text-gray-500">
              Manage active administrator sessions.
            </p>

          </div>

          <button
            onClick={() => alert("Session management will be connected to backend later.")}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Manage Sessions
          </button>

        </div>

      </div>


      {/* ================= SAVE ================= */}

      <div className="flex justify-end">

       <button
  onClick={handleSave}
  disabled={saving || loading}
  className="px-6 py-3 bg-red-800 hover:bg-red-900 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {saving
    ? "Saving..."
    : "Save Settings"}
</button>

      </div>

    </div>
  );
}

export default Settings;