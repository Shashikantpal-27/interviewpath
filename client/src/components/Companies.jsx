function Companies() {
  const companies = [
    {
      name: "Google",
      description: "DSA & problem solving",
    },
    {
      name: "Microsoft",
      description: "DSA & core CS",
    },
    {
      name: "Amazon",
      description: "DSA & system design",
    },
    {
      name: "Meta",
      description: "DSA & problem solving",
    },
    {
      name: "Adobe",
      description: "DSA & technical rounds",
    },
    {
      name: "Netflix",
      description: "Technical preparation",
    },
  ];

  return (
    <section
      id="companies"
      className="py-20 bg-[var(--background)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">

          <span className="inline-block text-sm font-semibold text-[var(--primary)] bg-white border border-[var(--secondary)] px-4 py-2 rounded-full">
            🎯 Company Focused
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mt-5">
            Prepare for Top Companies
          </h2>

          <p className="text-[var(--text)] opacity-75 mt-4 text-lg">
            Understand company-specific interview patterns and prepare
            smarter for your target role.
          </p>

        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-14">

          {companies.map((company) => (
            <div
              key={company.name}
              className="group bg-white border border-[var(--secondary)] rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >

              {/* Company Icon */}
              <div className="w-14 h-14 mx-auto rounded-xl bg-[var(--background)] flex items-center justify-center text-xl font-bold text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition">
                {company.name.charAt(0)}
              </div>

              {/* Company Name */}
              <h3 className="text-lg font-bold text-[var(--text)] mt-5">
                {company.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 mt-2">
                {company.description}
              </p>

              {/* Arrow */}
              <div className="mt-4 text-[var(--primary)] font-semibold text-sm opacity-0 group-hover:opacity-100 transition">
                Explore →
              </div>

            </div>
          ))}

        </div>

        {/* Bottom Text */}
        <div className="text-center mt-10">
          <button className="text-[var(--primary)] font-semibold hover:underline">
            Explore all companies →
          </button>
        </div>

      </div>
    </section>
  );
}

export default Companies;