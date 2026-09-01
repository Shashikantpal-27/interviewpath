import { Link } from "react-router-dom";
import heroImage from "../assets/fifo.avif";

function Hero() {
  return (
    <section
      id="home"
      className="bg-[var(--background)] min-h-[calc(100vh-73px)] flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 py-16 md:py-20">

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div>

            {/* Badge */}
            <span className="inline-flex items-center bg-white border border-[var(--secondary)] text-[var(--primary)] px-5 py-2 rounded-full font-semibold shadow-sm">
              ✨ Smart Interview Preparation Platform
            </span>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-7 leading-tight text-[var(--text)]">

              Crack Your
              <br />

              <span>
                Dream Job with
              </span>

              <br />

              <span className="text-[var(--primary)]">
                InterviewPath AI
              </span>

            </h1>

            {/* Description */}
            <p className="text-[var(--text)] opacity-80 mt-6 text-lg leading-8 max-w-xl">
              Prepare smarter with personalized roadmaps, company-wise
              preparation, AI mock interviews, coding practice and resume
              analysis — everything you need in one place.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-9">

              <Link
                to="/signup"
                className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg transition hover:-translate-y-1"
              >
                Start Preparing →
              </Link>

              <a
                href="#features"
                className="border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-white font-semibold px-7 py-3.5 rounded-xl transition"
              >
                Explore Features
              </a>

            </div>

            {/* Small Trust Text */}
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-[var(--text)] opacity-75">

              <span>✓ Personalized Preparation</span>

              <span>✓ AI Powered</span>

              <span>✓ Company Focused</span>

            </div>

          </div>

          {/* Right Content */}
          <div className="relative">

            {/* Background decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--secondary)] rounded-full opacity-30 blur-2xl"></div>

            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-[var(--info)] rounded-full opacity-20 blur-3xl"></div>

            {/* Main Card */}
            <div className="relative bg-white rounded-3xl border border-white shadow-2xl p-5 md:p-7">

              <img
                src={heroImage}
                alt="InterviewPath AI interview preparation"
                className="w-full h-[300px] md:h-[390px] object-contain rounded-2xl"
              />

              

                </div>

              </div>

            </div>

          </div>

        

      
    </section>
  );
}

export default Hero;