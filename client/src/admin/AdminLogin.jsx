import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaUserShield,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGraduationCap,
  FaLock,
} from "react-icons/fa";

import { adminLogin } from "../api/adminApi.js";


function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();


  // =========================
  // ADMIN LOGIN
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email || !password) {

      toast.error(
        "Please enter email and password"
      );

      return;

    }

    try {

      setLoading(true);

      const data =
        await adminLogin(
          email,
          password
        );


      // =========================
      // SAVE ADMIN TOKEN
      // =========================

      localStorage.setItem(
        "adminToken",
        data.token
      );


      // =========================
      // SAVE ADMIN DATA
      // =========================

      localStorage.setItem(
        "admin",
        JSON.stringify(
          data.admin
        )
      );


      toast.success(
        "Admin login successful 🎉"
      );


      navigate("/admin");


    } catch (error) {

      toast.error(
        error.message ||
        "Admin login failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 lg:p-8">


      <div className="w-full max-w-6xl min-h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">


        {/* =====================================
            LEFT SIDE - ADMIN INFORMATION
        ===================================== */}

        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#2D0A3D] via-[#4A1459] to-[#670D2F] text-white p-12 relative overflow-hidden">


          {/* Background */}

          <div className="absolute w-80 h-80 rounded-full bg-white/5 -top-32 -left-24" />

          <div className="absolute w-96 h-96 rounded-full bg-white/5 -bottom-48 -right-32" />


          {/* Branding */}

          <div className="relative z-10 flex items-center gap-3">

            <div className="w-12 h-12 bg-white text-[#670D2F] rounded-2xl flex items-center justify-center text-2xl shadow-lg">

              <FaGraduationCap />

            </div>


            <div>

              <h1 className="text-2xl font-bold">

                InterviewPath AI

              </h1>

              <p className="text-white/70 text-sm">

                Administration Portal

              </p>

            </div>

          </div>


          {/* Main Content */}

          <div className="relative z-10">

            <div className="w-20 h-20 rounded-3xl bg-white/15 flex items-center justify-center text-4xl mb-8">

              <FaUserShield />

            </div>


            <p className="text-white/60 font-medium mb-3">

              SECURE ADMIN ACCESS

            </p>


            <h2 className="text-5xl font-bold leading-tight">

              Manage the platform

              <span className="block text-pink-200">

                with confidence.

              </span>

            </h2>


            <p className="text-white/75 text-lg mt-6 leading-relaxed max-w-lg">

              Access the InterviewPath AI administration panel
              to manage users, companies, roles, roadmaps,
              interview experiences and platform analytics.

            </p>


            <div className="flex items-center gap-3 mt-10 text-white/70">

              <FaLock />

              <span>

                Authorized administrators only

              </span>

            </div>

          </div>


          {/* Bottom */}

          <div className="relative z-10 text-sm text-white/50">

            InterviewPath AI • Admin Portal

          </div>

        </div>



        {/* =====================================
            RIGHT SIDE - ADMIN LOGIN FORM
        ===================================== */}

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">


          <div className="w-full max-w-md">


            {/* Mobile Branding */}

            <div className="lg:hidden flex items-center gap-3 mb-10">

              <div className="w-12 h-12 bg-[#670D2F] text-white rounded-xl flex items-center justify-center text-xl">

                <FaUserShield />

              </div>


              <div>

                <h1 className="font-bold text-xl text-gray-900">

                  InterviewPath AI

                </h1>

                <p className="text-sm text-gray-500">

                  Administration Portal

                </p>

              </div>

            </div>



            {/* Heading */}

            <div className="mb-8">

              <div className="w-14 h-14 rounded-2xl bg-[#670D2F]/10 text-[#670D2F] flex items-center justify-center text-2xl mb-5">

                <FaUserShield />

              </div>


              <h1 className="text-4xl font-bold text-gray-900">

                Admin Login

              </h1>


              <p className="text-gray-500 mt-3">

                Sign in to access the administration dashboard.

              </p>

            </div>



            {/* ================= FORM ================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >


              {/* EMAIL */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Admin Email

                </label>


                <input
                  type="email"

                  placeholder="Enter admin email"

                  value={email}

                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }

                  required

                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#670D2F] focus:border-transparent transition"
                />

              </div>



              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Password

                </label>


                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }

                    placeholder="Enter password"

                    value={password}

                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }

                    required

                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 pr-12 outline-none focus:ring-2 focus:ring-[#670D2F] focus:border-transparent transition"
                  />


                  <button
                    type="button"

                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }

                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#670D2F] transition"
                  >

                    {showPassword
                      ? <FaEyeSlash />
                      : <FaEye />
                    }

                  </button>

                </div>

              </div>



              {/* LOGIN BUTTON */}

              <button
                type="submit"

                disabled={loading}

                className="w-full bg-[#670D2F] hover:bg-[#4A1459] text-white font-semibold py-3.5 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >

                {loading
                  ? "Signing in..."
                  : (
                    <>
                      Access Admin Panel
                      <FaArrowRight />
                    </>
                  )
                }

              </button>


            </form>



            {/* SECURITY NOTE */}

            <div className="mt-6 flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">

              <FaLock className="text-[#670D2F] mt-1" />

              <p className="text-sm text-gray-500">

                This area is restricted to authorized
                InterviewPath AI administrators.

              </p>

            </div>



            {/* BACK TO USER LOGIN */}

            <div className="text-center mt-7">

              <Link
                to="/login"

                className="inline-flex items-center gap-2 text-[#670D2F] font-semibold hover:underline"
              >

                ← Back to User Login

              </Link>

            </div>


          </div>

        </div>


      </div>

    </div>

  );

}


export default AdminLogin;