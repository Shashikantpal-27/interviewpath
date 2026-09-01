function Stats() {
  const stats = [
    {
      value: "10K+",
      label: "Students",
    },
    {
      value: "50+",
      label: "Companies",
    },
    {
      value: "100+",
      label: "Roadmaps",
    },
    {
      value: "1K+",
      label: "Practice Questions",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl border border-[var(--secondary)] hover:shadow-lg transition"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">
                {stat.value}
              </h3>

              <p className="mt-2 text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;