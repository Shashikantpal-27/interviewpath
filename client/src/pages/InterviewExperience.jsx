import { useEffect, useState } from "react";

const API_URL = "https://interviewpath.onrender.com/api/v1/interview-experiences";
const emptyForm = {
  company: "",
  role: "",
  title: "",
  difficulty: "Medium",
  interviewDate: "",
  rounds: "",
  questions: "",
  preparation: "",
  experience: "",
};

export default function InterviewExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const token = localStorage.getItem("token");

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "success",
      });
    }, 4000);
  };

  const fetchExperiences = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load experiences");
      }

      const result = await response.json();
      setExperiences(result.data || []);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      showToast("Please login first to share your experience.", "error");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit experience");
      }

      // Successful submit ke baad saare fields clear
      setForm({ ...emptyForm });

      // Form open rahega
      setShowForm(true);

      // Success toast
      showToast(
        "Experience submitted successfully! Admin approval ke baad publish hoga.",
        "success"
      );
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredExperiences = experiences.filter((item) => {
    const text = `
      ${item.company?.name || item.company || ""}
      ${item.role?.name || item.role || ""}
      ${item.title || ""}
      ${item.difficulty || ""}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed right-6 top-6 z-50 flex items-center gap-3 rounded-xl px-5 py-4 text-white shadow-lg ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <span className="text-xl">
            {toast.type === "success" ? "✓" : "!"}
          </span>

          <span>{toast.message}</span>

          <button
            type="button"
            onClick={() =>
              setToast({
                show: false,
                message: "",
                type: "success",
              })
            }
            className="ml-3 text-xl font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-10 flex items-center justify-between gap-4">
        <div>
          <p className="text-lg text-gray-500">Community</p>

          <h1 className="text-4xl font-bold text-[#35001b]">
            Interview Experiences
          </h1>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-[#35001b] px-5 py-3 font-semibold text-white transition hover:bg-[#52002b]"
        >
          {showForm ? "Close Form" : "+ Share Your Experience"}
        </button>
      </div>

      {/* Intro */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-[#35001b]">
          Learn from real interview experiences 💡
        </h2>

        <p className="mt-4 text-xl text-gray-500">
          Explore interview experiences shared by students and prepare better
          for your next opportunity.
        </p>
      </div>

      {/* Share Experience Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
        >
          <h2 className="mb-6 text-2xl font-bold text-[#35001b]">
            Share Your Interview Experience
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Company */}
            <div>
              <label className="mb-2 block font-medium">
                Company Name *
              </label>

              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. TCS"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#35001b]"
              />
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block font-medium">
                Role *
              </label>

              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g. Software Developer"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#35001b]"
              />
            </div>

            {/* Title */}
            <div className="md:col-span-2">
              <label className="mb-2 block font-medium">
                Interview Title *
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. TCS Software Developer Interview Experience"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#35001b]"
              />
            </div>

            {/* Interview Date */}
            <div>
              <label className="mb-2 block font-medium">
                Interview Date
              </label>

              <input
                type="date"
                name="interviewDate"
                value={form.interviewDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#35001b]"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="mb-2 block font-medium">
                Difficulty *
              </label>

              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#35001b]"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Rounds */}
          <div className="mt-5">
            <label className="mb-2 block font-medium">
              Interview Rounds *
            </label>

            <textarea
              name="rounds"
              value={form.rounds}
              onChange={handleChange}
              placeholder="e.g. Aptitude, Technical, HR"
              required
              rows={3}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#35001b]"
            />
          </div>

          {/* Questions */}
          <div className="mt-5">
            <label className="mb-2 block font-medium">
              Questions Asked *
            </label>

            <textarea
              name="questions"
              value={form.questions}
              onChange={handleChange}
              placeholder="Write the questions asked during the interview..."
              required
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#35001b]"
            />
          </div>

          {/* Preparation */}
          <div className="mt-5">
            <label className="mb-2 block font-medium">
              Preparation Tips
            </label>

            <textarea
              name="preparation"
              value={form.preparation}
              onChange={handleChange}
              placeholder="How did you prepare?"
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#35001b]"
            />
          </div>

          {/* Experience */}
          <div className="mt-5">
            <label className="mb-2 block font-medium">
              Overall Experience *
            </label>

            <textarea
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="Describe your interview experience..."
              required
              rows={5}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#35001b]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 rounded-xl bg-[#35001b] px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Experience"}
          </button>
        </form>
      )}

      {/* Search */}
      <div className="mb-8 rounded-2xl border border-gray-200 p-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company, role or difficulty..."
          className="w-full rounded-xl border border-gray-300 px-5 py-4 text-lg outline-none focus:border-[#35001b]"
        />
      </div>

      {/* Experiences */}
      {loading ? (
        <div className="py-12 text-center text-xl text-gray-500">
          Loading interview experiences...
        </div>
      ) : filteredExperiences.length === 0 ? (
        <div className="rounded-2xl border border-gray-300 py-24 text-center text-xl text-gray-500">
          No approved interview experiences found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredExperiences.map((item) => (
            <div
              key={item._id || item.id}
              className="rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-bold text-[#35001b]">
                    {item.title ||
                      `${item.company?.name || item.company} Interview Experience`}
                  </h3>

                  <p className="text-gray-600">
                    {item.company?.name || item.company} —{" "}
                    {item.role?.name || item.role}
                  </p>
                </div>

                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                  {item.difficulty}
                </span>
              </div>

              <p className="mb-3">
                <strong>Rounds:</strong> {item.rounds}
              </p>

              <p className="mb-3 whitespace-pre-line">
                <strong>Questions:</strong> {item.questions}
              </p>

              <p className="mb-3 whitespace-pre-line">
                <strong>Preparation:</strong>{" "}
                {item.preparation || "Not provided"}
              </p>

              <p className="whitespace-pre-line text-gray-700">
                {item.experience}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}