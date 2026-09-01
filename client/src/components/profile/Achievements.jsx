function Achievements() {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">

      <h2 className="text-2xl font-semibold mb-5">
        Achievements
      </h2>

      <textarea
        rows="5"
        placeholder="Certifications, Awards, Hackathons..."
        className="border rounded-xl p-3 w-full"
      />

    </div>
  );
}

export default Achievements;