import Marquee from "react-fast-marquee";
import {
  SiGoogle,
  SiMicrosoft,
  SiAmazon,
  SiMeta,
  SiNetflix,
  SiAdobe,
  SiOracle,
  SiIbm,
  SiInfosys,
  SiAccenture,
} from "react-icons/si";

const companies = [
  { icon: <SiGoogle />, name: "Google" },
  { icon: <SiMicrosoft />, name: "Microsoft" },
  { icon: <SiAmazon />, name: "Amazon" },
  { icon: <SiMeta />, name: "Meta" },
  { icon: <SiAdobe />, name: "Adobe" },
  { icon: <SiNetflix />, name: "Netflix" },
  { icon: <SiOracle />, name: "Oracle" },
  { icon: <SiIbm />, name: "IBM" },
  { icon: <SiInfosys />, name: "Infosys" },
  { icon: <SiAccenture />, name: "Accenture" },
];

function CompaniesMarquee() {
  return (
    <section className="py-12 bg-white">

      <h2 className="text-center text-3xl font-bold mb-8 text-[var(--primary)]">
        Top Companies
      </h2>

      <Marquee
        speed={50}
        pauseOnHover
        gradient
        gradientColor="#CBEEF3"
      >
        {companies.map((company, index) => (
          <div
            key={index}
            className="mx-10 flex items-center gap-3 text-4xl text-gray-700 hover:text-[var(--primary)] transition"
          >
            {company.icon}
            <span className="text-xl font-semibold">
              {company.name}
            </span>
          </div>
        ))}
      </Marquee>

    </section>
  );
}

export default CompaniesMarquee;