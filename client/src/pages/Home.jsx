import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Companies from "../components/Companies";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Stats />
      <Companies />
      <HowItWorks />
      <Features />
    </div>
  );
}

export default Home;