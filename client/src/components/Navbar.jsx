import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaTachometerAlt,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaUserShield,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully 👋");

    setOpen(false);

    navigate("/login");
  };

  return (
    <nav className="w-full bg-[var(--secondary)] shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 py-3">

        {/* Logo */}

        <Link
          to="/home"
          className="text-2xl font-bold text-[var(--primary)] cursor-pointer"
        >
          InterviewPath AI
        </Link>

        {/* Menu */}

        <ul className="hidden md:flex items-center gap-7 font-medium text-gray-700">

          <li>
            <a
              href="#home"
              className="hover:text-[var(--primary)] cursor-pointer transition"
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="#features"
              className="hover:text-[var(--primary)] cursor-pointer transition"
            >
              Features
            </a>
          </li>

          <li>
            <a
              href="#companies"
              className="hover:text-[var(--primary)] cursor-pointer transition"
            >
              Companies
            </a>
          </li>

          <li>
            <a
              href="#roadmaps"
              className="hover:text-[var(--primary)] cursor-pointer transition"
            >
              Roadmaps
            </a>
          </li>

          <li>
            <a
              href="#about"
              className="hover:text-[var(--primary)] cursor-pointer transition"
            >
              About
            </a>
          </li>

        </ul>

        {/* Profile Dropdown */}

        <div className="relative">

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition"
          >

            <FaUserCircle className="text-2xl text-[var(--primary)]" />

            <span className="hidden sm:block font-semibold text-gray-700">
              Profile
            </span>

            <FaChevronDown
              className={`text-xs text-gray-600 transition-transform duration-200 ${open ? "rotate-180" : ""
                }`}
            />

          </button>

          {/* Dropdown */}

          {open && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">

              {/* My Profile */}

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-[var(--background)] hover:text-[var(--primary)] cursor-pointer transition"
              >
                <FaUser />
                <span>My Profile</span>
              </Link>

              {/* Dashboard */}

              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-[var(--background)] hover:text-[var(--primary)] cursor-pointer transition"
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>

              {/* Divider */}

              <div className="border-t border-gray-100"></div>
              {/* Admin Login */}

              <Link
                to="/admin/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-[var(--background)] hover:text-[var(--primary)] cursor-pointer transition"
              >
                <FaUserShield />
                <span>Login as Admin</span>
              </Link>


              {/* Sign Out */}

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-3 text-left text-red-600 hover:bg-red-50 cursor-pointer transition"
              >
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;