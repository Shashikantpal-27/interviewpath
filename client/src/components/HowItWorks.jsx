function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description:
        "Tell us about your skills, experience, and career goals.",
    },
    {
      number: "02",
      title: "Choose Your Target",
      description:
        "Select the role and companies you want to prepare for.",
    },
    {
      number: "03",
      title: "Prepare with AI",
      description:
        "Practice coding, mock interviews, resumes, and company questions.",
    },
    {
      number: "04",
      title: "Track Your Progress",
      description:
        "Monitor your preparation and identify areas that need improvement.",
    },
  ];

  return (
    <section
      id="roadmaps"
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">

          <span className="inline-block text-sm font-semibold text-[var(--primary)] bg-[var(--background)] border border-[var(--secondary)] px-4 py-2 rounded-full">
             Simple Preparation Process
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mt-5">
            How InterviewPath AI Works
          </h2>

          <p className="text-[var(--text)] opacity-75 mt-4 text-lg">
            Follow a simple path from preparation to interview readiness.
          </p>

        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-[var(--background)] rounded-2xl p-7 border border-[var(--secondary)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >

              {/* Number */}
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[var(--text)] mt-6">
                {step.title}
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;