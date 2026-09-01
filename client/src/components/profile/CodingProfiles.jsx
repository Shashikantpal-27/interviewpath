function CodingProfiles() {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">

      <h2 className="text-2xl font-semibold mb-5">
        Coding Profiles
      </h2>

      <div className="space-y-4">

        <input placeholder="GitHub" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]" />

        <input placeholder="LinkedIn" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"/>

        <input placeholder="LeetCode" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"/>   

        <input placeholder="GeeksforGeeks" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"/>

      </div>

    </div>
  );
}

export default CodingProfiles;