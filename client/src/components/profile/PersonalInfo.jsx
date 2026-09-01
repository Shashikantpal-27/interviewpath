function PersonalInfo() {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">
        
      <h2 className="text-2xl font-semibold mb-5">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input placeholder="Full Name" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"/>

        <input placeholder="Phone Number" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"/>   

        <input placeholder="Email" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"/>

        <input placeholder="City" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"/>

        <input placeholder="State" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"/>

        <input type="date" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 transition-all duration-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"/>

      </div>
    </div>
  );
}

export default PersonalInfo;