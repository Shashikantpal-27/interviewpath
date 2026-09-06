const API_URL =
  `${import.meta.env.VITE_API_URL ||
    "https://interviewpath.onrender.com/api/v1"}/admin`;

const getToken = () => {
  return localStorage.getItem("adminToken");
};


// ================================
// ADMIN LOGIN
// ================================

const adminLogin = async (email, password) => {

  const response = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Login failed"
    );
  }

  return data;
};


// ================================
// DASHBOARD
// ================================

const getDashboard = async () => {

  const response = await fetch(
    `${API_URL}/dashboard`,
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch dashboard"
    );
  }

  return data;
};


// ================================
// ANALYTICS
// ================================

const getAnalytics = async () => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/analytics`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch analytics"
    );
  }

  return data;
};
// ================================
// ADMIN LOGS
// ================================

const getAdminLogs = async () => {

  const response = await fetch(
    `${API_URL}/logs`,
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch admin logs"
    );
  }

  return data;
};

const getAllUsers = async () => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/users`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to fetch users"
    );
  }

  return data;
};

const getUserById = async (id) => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to fetch user"
    );
  }

  return data;
};

const deleteUser = async (id) => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/users/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to delete user"
    );
  }

  return data;
};

const getAllCompanies = async () => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/companies`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to fetch companies"
    );
  }

  return data;
};


const createCompany = async (companyData) => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/companies`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(companyData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to create company"
    );
  }

  return data;
};


const updateCompany = async (
  id,
  companyData
) => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/companies/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(companyData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to update company"
    );
  }

  return data;
};


const deleteCompany = async (id) => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/companies/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to delete company"
    );
  }

  return data;
};


const getAllRoles = async () => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/roles`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to fetch roles"
    );
  }

  return data;
};

const createRole = async (roleData) => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/roles`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(roleData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to create role"
    );
  }

  return data;
};

const updateRole = async (
  id,
  roleData
) => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/roles/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(roleData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to update role"
    );
  }

  return data;
};



const deleteRole = async (id) => {

  const token =
    localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/roles/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to delete role"
    );
  }

  return data;
};

const getAllRoadmaps = async () => {

  const response = await fetch(
    `${API_URL}/roadmaps`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch roadmaps"
    );
  }

  return data;
};


const createRoadmap = async (roadmapData) => {

  const response = await fetch(
    `${API_URL}/roadmaps`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },

      body: JSON.stringify(roadmapData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create roadmap"
    );
  }

  return data;
};


const updateRoadmap = async (
  id,
  roadmapData
) => {

  const response = await fetch(
    `${API_URL}/roadmaps/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },

      body: JSON.stringify(roadmapData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update roadmap"
    );
  }

  return data;
};


const deleteRoadmap = async (id) => {

  const response = await fetch(
    `${API_URL}/roadmaps/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete roadmap"
    );
  }

  return data;
};


const getRoadmapById = async (id) => {

  const response = await fetch(
    `${API_URL}/roadmaps/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch roadmap"
    );
  }

  return data;
};


// =================================
// INTERVIEW EXPERIENCES
// =================================

const getAllInterviewExperiences = async (status = "") => {
  const token = localStorage.getItem("adminToken");

  let url = `${API_URL}/interviews`;

  if (status) {
    url += `?status=${status}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch interview experiences"
    );
  }

  return data;
};


// =================================
// GET INTERVIEW BY ID
// =================================

const getInterviewExperienceById = async (id) => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/interviews/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch interview experience"
    );
  }

  return data;
};


// =================================
// APPROVE
// =================================

const approveInterviewExperience = async (id) => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/interviews/${id}/approve`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to approve interview experience"
    );
  }

  return data;
};


// =================================
// REJECT
// =================================

const rejectInterviewExperience = async (
  id,
  rejectionReason
) => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/interviews/${id}/reject`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        rejectionReason,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to reject interview experience"
    );
  }

  return data;
};


// =================================
// DELETE
// =================================

const deleteInterviewExperience = async (id) => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/interviews/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete interview experience"
    );
  }

  return data;
};

// =================================
// REPORTS
// =================================

const getAllReports = async () => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/reports`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch reports"
    );
  }

  return data;
};


// =================================
// GET REPORT BY ID
// =================================

const getReportById = async (id) => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/reports/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch report"
    );
  }

  return data;
};


// =================================
// RESOLVE REPORT
// =================================

const resolveReport = async (
  id,
  adminAction
) => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/reports/${id}/resolve`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        adminAction,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to resolve report"
    );
  }

  return data;
};


// =================================
// DISMISS REPORT
// =================================

const dismissReport = async (
  id,
  adminAction
) => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/reports/${id}/dismiss`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        adminAction,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to dismiss report"
    );
  }

  return data;
};


// =================================
// SETTINGS
// =================================

const getSettings = async () => {

  const response = await fetch(
    `${API_URL}/settings`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to fetch settings"
    );
  }


  return data;
};


// =================================
// UPDATE SETTINGS
// =================================

const updateSettings = async (
  settingsData
) => {

  const response = await fetch(
    `${API_URL}/settings`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization:
          `Bearer ${getToken()}`,
      },

      body: JSON.stringify(
        settingsData
      ),
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to update settings"
    );
  }


  return data;
};

// =================================
// ADMIN PROFILE
// =================================

const getAdminProfile = async () => {

  const response = await fetch(
    `${API_URL}/profile`,
    {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${getToken()}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to fetch admin profile"
    );
  }

  return data;
};


// =================================
// UPDATE ADMIN PROFILE
// =================================

const updateAdminProfile = async (
  profileData
) => {

  const response = await fetch(
    `${API_URL}/profile`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${getToken()}`,
      },

      body: JSON.stringify(profileData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to update admin profile"
    );
  }

  return data;
};


// =================================
// CHANGE PASSWORD
// =================================

const changeAdminPassword = async (
  currentPassword,
  newPassword
) => {

  const response = await fetch(
    `${API_URL}/profile/password`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${getToken()}`,
      },

      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to change password"
    );
  }

  return data;
};



export {
  adminLogin,
  getDashboard,
  getAnalytics,
  getAllUsers,
  getUserById,
  deleteUser,

  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,

   getAllRoles,
  createRole,
  updateRole,
  deleteRole,

  getAllRoadmaps,
  getRoadmapById,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,

   getAllInterviewExperiences,
  getInterviewExperienceById,
  approveInterviewExperience,
  rejectInterviewExperience,
  deleteInterviewExperience,


getAllReports,
getReportById,
resolveReport,
dismissReport,

getSettings,
  updateSettings,

  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
};