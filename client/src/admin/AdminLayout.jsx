import React from "react";
import {
  Outlet,
  Navigate,
} from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";


function AdminLayout() {

  const token =
    localStorage.getItem("adminToken");


  // ================================
  // PROTECT ADMIN ROUTES
  // ================================

  if (!token) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }


  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}

      <AdminSidebar />


      {/* Main Content */}

      <div className="ml-[250px] min-h-screen">

        {/* Navbar */}

        <AdminNavbar />


        {/* Page Content */}

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}


export default AdminLayout;