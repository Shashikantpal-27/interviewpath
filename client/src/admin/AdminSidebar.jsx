import React from "react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };
  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Companies", path: "/admin/companies" },
    { name: "Roles", path: "/admin/roles" },
    { name: "Roadmaps", path: "/admin/roadmaps" },
    { name: "Interview Experiences", path: "/admin/interviews" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Analytics", path: "/admin/analytics" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-[250px] bg-white border-r border-gray-200 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-200">

        <h1 className="text-xl font-bold text-[#3A0519]">
          InterviewPath AI
        </h1>

        <p className="text-xs text-gray-500 mt-1">
          ADMIN PANEL
        </p>

      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1">

        {navItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-[#3A0519] text-white"
                  : "text-gray-700 hover:bg-[#FFF7FA] hover:text-[#3A0519]"
              }`
            }
          >
            {item.name}
          </NavLink>

        ))}

      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-200 p-3 space-y-1">

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg text-sm ${
              isActive
                ? "bg-[#3A0519] text-white"
                : "text-gray-700 hover:bg-[#FFF7FA] hover:text-[#3A0519]"
            }`
          }
        >
          Settings
        </NavLink>

        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg text-sm ${
              isActive
                ? "bg-[#3A0519] text-white"
                : "text-gray-700 hover:bg-[#FFF7FA]"
            }`
          }
        >
          Profile
        </NavLink>

       <button
  onClick={handleLogout}
  className="w-full text-left px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-[#FFF7FA] hover:text-[#670D2F]"
>
  Logout
</button>
      </div>

    </aside>
  );
}

export default AdminSidebar;