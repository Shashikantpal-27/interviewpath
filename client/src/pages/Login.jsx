import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGraduationCap,
  FaCode,
  FaBuilding,
  FaUserShield,
  FaCheckCircle,
} from "react-icons/fa";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";


function Login() {

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // =========================
  // LOGIN
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await api.post(
        "/auth/login",
        formData
      );

      login(
        res.data.token,
        res.data.user
      );

      toast.success(
        "Login Successful 🎉"
      );

      navigate("/home");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 lg:p-8">


      <div className="w-full max-w-6xl min-h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">


        {/* =========================================
            LEFT SIDE - INTERVIEWPATH AI INFO
        ========================================= */}

        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#670D2F] via-[#8A1C46] to-[#A53860] text-white p-12 relative overflow-hidden">


          {/* Background circles */}

          <div className="absolute w-72 h-72 rounded-full bg-white/5 -top-24 -left-24" />

          <div className="absolute w-96 h-96 rounded-full bg-white/5 -bottom-48 -right-32" />


          {/* Logo */}

          <div className="relative z-10">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 bg-white text-[#670D2F] rounded-2xl flex items-center justify-center text-2xl shadow-lg">

                <FaGraduationCap />

              </div>


              <div>

                <h1 className="text-2xl font-bold">

                  InterviewPath AI

                </h1>

                <p className="text-white/70 text-sm">

                  Your Smart Interview Companion

                </p>

              </div>

            </div>

          </div>


          {/* Main content */}

          <div className="relative z-10">

            <p className="text-white/70 font-medium mb-3">

              PREPARE • PRACTICE • SUCCEED

            </p>


            <h2 className="text-5xl font-bold leading-tight">

              Your journey to the

              <span className="block text-pink-200">

                dream job starts here.

              </span>

            </h2>


            <p className="text-white/75 text-lg mt-6 leading-relaxed max-w-lg">

              InterviewPath AI helps you prepare smarter with
              personalized roadmaps, coding practice, mock interviews,
              company-wise preparation and AI-powered tools.

            </p>


            {/* Features */}

            <div className="space-y-4 mt-10">


              <Feature
                icon={<FaBuilding />}
                text="Company-wise interview preparation"
              />


              <Feature
                icon={<FaCode />}
                text="Coding practice and problem solving"
              />


              <Feature
                icon={<FaCheckCircle />}
                text="Personalized learning roadmap"
              />


            </div>

          </div>


          {/* Bottom */}

          <div className="relative z-10 text-sm text-white/60">

            Build skills. Gain confidence. Crack interviews.

          </div>

        </div>



        {/* =========================================
            RIGHT SIDE - LOGIN FORM
        ========================================= */}

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">


          <div className="w-full max-w-md">


            {/* Mobile Logo */}

            <div className="lg:hidden flex items-center gap-3 mb-10">

              <div className="w-12 h-12 bg-[#670D2F] text-white rounded-xl flex items-center justify-center text-xl">

                <FaGraduationCap />

              </div>


              <div>

                <h1 className="font-bold text-xl text-gray-900">

                  InterviewPath AI

                </h1>

                <p className="text-sm text-gray-500">

                  Your Smart Interview Companion

                </p>

              </div>

            </div>



            {/* Heading */}

            <div>

              <h2 className="text-4xl font-bold text-gray-900">

                Welcome Back 👋

              </h2>


              <p className="text-gray-500 mt-3">

                Login to continue your interview preparation journey.

              </p>

            </div>



            {/* ================= FORM ================= */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >


              {/* EMAIL */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Email Address

                </label>


                <input
                  type="email"
                  name="email"

                  value={formData.email}

                  onChange={handleChange}

                  placeholder="Enter your email"

                  required

                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#A53860] focus:border-transparent transition"
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

                    name="password"

                    value={formData.password}

                    onChange={handleChange}

                    maxLength={20}

                    placeholder="Enter your password"

                    required

                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 pr-12 outline-none focus:ring-2 focus:ring-[#A53860] focus:border-transparent transition"
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



              {/* REMEMBER / FORGOT */}

              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">

                  <input
                    type="checkbox"

                    className="accent-[#670D2F]"
                  />

                  Remember me

                </label>


                <Link
                  to="/forgot-password"

                  className="text-[#A53860] font-medium hover:underline"
                >

                  Forgot Password?

                </Link>

              </div>



              {/* LOGIN BUTTON */}

              <button
                type="submit"

                disabled={loading}

                className="w-full bg-[#670D2F] hover:bg-[#8A1C46] text-white font-semibold py-3.5 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >

                {loading ? (

                  "Logging in..."

                ) : (

                  <>
                    Login
                    <FaArrowRight />
                  </>

                )}

              </button>


            </form>



            {/* DIVIDER */}

            <div className="flex items-center gap-4 my-7">

              <div className="flex-1 h-px bg-gray-200" />

              <span className="text-sm text-gray-400">

                OR

              </span>

              <div className="flex-1 h-px bg-gray-200" />

            </div>



            {/* ================= ADMIN LOGIN ================= */}

            <Link
              to="/admin/login"

              className="w-full border-2 border-[#670D2F] text-[#670D2F] hover:bg-[#670D2F] hover:text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            >

              <FaUserShield />

              Login as Administrator

            </Link>



            {/* SIGNUP */}

            <p className="text-center text-gray-600 mt-7">

              Don't have an account?{" "}

              <Link
                to="/signup"

                className="text-[#A53860] font-semibold hover:underline"
              >

                Create Account

              </Link>

            </p>


          </div>

        </div>


      </div>

    </div>

  );

}


// =========================================
// FEATURE COMPONENT
// =========================================

function Feature({
  icon,
  text,
}) {

  return (

    <div className="flex items-center gap-4">

      <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-lg">

        {icon}

      </div>


      <p className="text-white/90">

        {text}

      </p>

    </div>

  );

}


export default Login;