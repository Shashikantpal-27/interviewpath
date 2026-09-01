import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../api/axios";

import {
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
  FaLayerGroup,
  FaTasks,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

function StudyPlanner() {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [days, setDays] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");

  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generatePlan = async () => {
    if (!topic.trim() || !days || !hoursPerDay) {
      setMessage("Please fill in all fields");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login to generate a study plan.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setPlan([]);

      const res = await api.post(
        "/study-planner/generate",
        {
          topic,
          days: Number(days),
          hoursPerDay: Number(hoursPerDay),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlan(res.data.plan || []);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to generate study plan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* NORMAL BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#A53860] transition mb-6"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* AI BADGE */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 bg-white border border-[#F1D5E0] text-[#670D2F] px-4 py-2 rounded-full shadow-sm font-semibold text-sm">
            <FaRobot />
            AI Powered
          </div>
        </div>

        {/* HERO */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            <span className="text-[#670D2F]">AI</span> Study Planner
          </h1>

          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Your personal roadmap to learn anything, the smart way.
          </p>
        </div>

        {/* MAIN FORM */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#FCE5ED] p-6 md:p-10 max-w-5xl mx-auto">

          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Let's build your{" "}
              <span className="text-[#670D2F]">
                personalized study plan 🚀
              </span>
            </h2>
          </div>

          {/* TOPIC */}
          <div className="border border-[#FCE5ED] rounded-2xl p-5 mb-5 bg-white">
            <div className="flex gap-4 items-start">

              <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#FFF7FA] text-[#670D2F] flex items-center justify-center text-2xl">
                <FaBookOpen />
              </div>

              <div className="flex-1">
                <label className="block font-bold text-lg text-gray-900 mb-3">
                  What do you want to study?
                </label>

                <input
                  type="text"
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                    setMessage("");
                  }}
                  placeholder="e.g. Data Structures and Algorithms, System Design, Python"
                  maxLength={100}
                  className="w-full border border-[#F1D5E0] rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A53860] focus:border-[#A53860]"
                />

                <div className="text-right text-xs text-gray-400 mt-1">
                  {topic.length}/100
                </div>
              </div>

            </div>
          </div>

          {/* DAYS + HOURS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* DAYS */}
            <div className="border border-[#FCE5ED] rounded-2xl p-5 bg-white">
              <div className="flex gap-4 items-start">

                <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#FFF7FA] text-[#A53860] flex items-center justify-center text-2xl">
                  <FaCalendarAlt />
                </div>

                <div className="flex-1">
                  <label className="block font-bold text-lg text-gray-900 mb-3">
                    Number of Days
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={days}
                      onChange={(e) => {
                        setDays(e.target.value);
                        setMessage("");
                      }}
                      placeholder="e.g. 30"
                      className="w-full border border-[#F1D5E0] rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#A53860] focus:border-[#A53860]"
                    />

                    <FaCalendarAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A53860]" />
                  </div>
                </div>

              </div>
            </div>

            {/* HOURS */}
            <div className="border border-[#FCE5ED] rounded-2xl p-5 bg-white">
              <div className="flex gap-4 items-start">

                <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#FFF7FA] text-[#A53860] flex items-center justify-center text-2xl">
                  <FaClock />
                </div>

                <div className="flex-1">
                  <label className="block font-bold text-lg text-gray-900 mb-3">
                    Study Hours Per Day
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      step="0.5"
                      value={hoursPerDay}
                      onChange={(e) => {
                        setHoursPerDay(e.target.value);
                        setMessage("");
                      }}
                      placeholder="e.g. 3"
                      className="w-full border border-[#F1D5E0] rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#A53860] focus:border-[#A53860]"
                    />

                    <FaClock className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A53860]" />
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* INFO BOX */}
          <div className="mt-5 bg-[#FFF7FA] border border-[#FCE5ED] rounded-2xl p-5 flex items-start gap-4">

            <div className="text-[#670D2F] text-xl mt-1">
              <FaInfoCircle />
            </div>

            <p className="text-gray-600 leading-relaxed">
              We'll create a day-by-day plan with topics, resources and
              tasks tailored to your goal and available study time.
            </p>

          </div>

          {/* MESSAGE */}
          {message && (
            <div className="mt-5 text-center font-medium text-red-500">
              {message}
            </div>
          )}

          {/* GENERATE BUTTON */}
          <button
            onClick={generatePlan}
            disabled={loading}
            className="w-full mt-6 bg-[#670D2F] hover:bg-[#3A0519] text-white font-bold py-4 rounded-2xl text-lg shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Generating Study Plan..."
              : "Generate Study Plan"}
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            🔒 Your study plan is generated privately for your session.
          </p>

        </div>

        {/* WHAT YOU'LL GET */}
        <div className="mt-14">

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-[#F1D5E0] w-12"></div>

            <h2 className="text-2xl font-bold text-gray-900">
              What you'll get
            </h2>

            <div className="h-px bg-[#F1D5E0] w-12"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="bg-white border border-[#FCE5ED] rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FFF7FA] text-[#670D2F] flex items-center justify-center text-xl">
                <FaCalendarAlt />
              </div>

              <h3 className="font-bold text-lg mt-4">
                Day-by-Day Plan
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Structured roadmap for each day
              </p>
            </div>

            <div className="bg-white border border-[#FCE5ED] rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FFF7FA] text-[#A53860] flex items-center justify-center text-xl">
                <FaLayerGroup />
              </div>

              <h3 className="font-bold text-lg mt-4">
                Topics & Subtopics
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Organized learning with key concepts
              </p>
            </div>

            <div className="bg-white border border-[#FCE5ED] rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FFF7FA] text-[#A53860] flex items-center justify-center text-xl">
                <FaTasks />
              </div>

              <h3 className="font-bold text-lg mt-4">
                Tasks & Practice
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Daily tasks to help you stay consistent
              </p>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                <FaChartLine />
              </div>

              <h3 className="font-bold text-lg mt-4">
                Smart & Balanced
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                AI balances theory, practice and revision
              </p>
            </div>

          </div>
        </div>

        {/* GENERATED PLAN */}
        {plan.length > 0 && (
          <div className="mt-14">

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Your Study Plan
              </h2>

              <p className="text-gray-500 mt-2">
                Personalized plan generated for{" "}
                <span className="font-semibold text-[#670D2F]">
                  {topic}
                </span>
              </p>
            </div>

            <div className="space-y-6">

              {plan.map((dayPlan) => (
                <div
                  key={dayPlan.day}
                  className="bg-white border border-[#FCE5ED] rounded-2xl shadow-md p-6 md:p-8"
                >

                  <div className="flex items-center justify-between mb-6">

                    <h3 className="text-2xl font-bold text-[#670D2F]">
                      Day {dayPlan.day}
                    </h3>

                    <span className="text-sm font-semibold bg-[#FFF7FA] text-[#670D2F] px-4 py-2 rounded-full">
                      {hoursPerDay} hrs
                    </span>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-lg mb-3">
                        <FaLayerGroup className="text-[#670D2F]" />
                        Topics
                      </h4>

                      <ul className="space-y-3">
                        {dayPlan.topics?.map((item, index) => (
                          <li
                            key={index}
                            className="bg-[#FFF7FA] border border-[#FCE5ED] rounded-xl p-3 text-gray-700"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-lg mb-3">
                        <FaTasks className="text-[#670D2F]" />
                        Tasks
                      </h4>

                      <ul className="space-y-3">
                        {dayPlan.tasks?.map((item, index) => (
                          <li
                            key={index}
                            className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default StudyPlanner;