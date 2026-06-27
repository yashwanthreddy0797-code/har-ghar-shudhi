import Image from "next/image";

const GOLD = "#b89550";
const FOREST = "#1a2421";

type Certification = {
  id: string;
  title: string;
  description: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  logoClassName: string;
  ring?: boolean;
  href?: string;
};

const TOP_ROW: Certification[] = [
  {
    id: "ayush",
    title: "Ayush",
    description:
      "Licensed by the Ministry of Ayush for authentic Ayurvedic formulations.",
    logo: "/certifications/ayush-premium.png",
    logoWidth: 100,
    logoHeight: 130,
    logoClassName: "h-[4.5rem] w-auto sm:h-20",
    ring: true,
    href: "/certifications/ayush-license.pdf",
  },
  {
    id: "fssc",
    title: "FSSC 22000",
    description:
      "Globally recognized food safety certification ensuring the highest standards of food safety.",
    logo: "/certifications/fssc-22000.png",
    logoWidth: 220,
    logoHeight: 46,
    logoClassName: "h-10 w-auto sm:h-11",
  },
  {
    id: "gmp-certified",
    title: "GMP Certified",
    description:
      "Good Manufacturing Practices followed at every step for consistent quality.",
    logo: "/certifications/gmp-certified.png",
    logoWidth: 120,
    logoHeight: 114,
    logoClassName: "h-[4.5rem] w-auto sm:h-20",
    ring: true,
  },
  {
    id: "iso",
    title: "ISO 22000",
    description:
      "International standard for food safety management systems.",
    logo: "/certifications/iso-22000.png",
    logoWidth: 120,
    logoHeight: 120,
    logoClassName: "h-[4.5rem] w-auto sm:h-20",
    ring: true,
  },
];

const BOTTOM_ROW: Certification[] = [
  {
    id: "fssai",
    title: "FSSAI",
    description:
      "Certified by the Food Safety and Standards Authority of India.",
    logo: "/certifications/fssai.png",
    logoWidth: 160,
    logoHeight: 80,
    logoClassName: "h-12 w-auto sm:h-14",
  },
  {
    id: "haccp",
    title: "HACCP",
    description:
      "Hazard Analysis and Critical Control Point system for proactive food safety.",
    logo: "/certifications/haccp.png",
    logoWidth: 120,
    logoHeight: 114,
    logoClassName: "h-[4.5rem] w-auto sm:h-20",
    ring: true,
  },
  {
    id: "nmr-tested",
    title: "NMR Certified",
    description:
      "NMR spectroscopy verified for purity and authenticity of every batch.",
    logo: "/certifications/nmr-tested.png",
    logoWidth: 120,
    logoHeight: 120,
    logoClassName: "h-[4.5rem] w-auto sm:h-20",
    ring: true,
  },
];

function LotusEmblem() {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a962]/50 sm:w-16" />
      <svg viewBox="0 0 32 32" className="h-7 w-7 text-[#c9a962]" fill="currentColor">
        <path d="M16 4c-2 4-6 6-6 10a6 6 0 0 0 12 0c0-4-4-6-6-10Z" opacity="0.9" />
        <path d="M16 8c-1.5 2.5-4 4-4 6.5a4 4 0 0 0 8 0c0-2.5-2.5-4-4-6.5Z" opacity="0.55" />
        <circle cx="16" cy="18" r="2.5" opacity="0.75" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a962]/50 sm:w-16" />
    </div>
  );
}

function CertificationLogo({ cert }: { cert: Certification }) {
  const image = (
    <Image
      src={cert.logo}
      alt={`${cert.title} certification logo`}
      width={cert.logoWidth}
      height={cert.logoHeight}
      unoptimized
      className={cert.logoClassName}
    />
  );

  if (cert.ring) {
    return (
      <div
        className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-[#c9a962]/35 bg-white/50 shadow-[0_6px_24px_rgba(184,149,80,0.1)] sm:h-24 sm:w-24"
      >
        {image}
      </div>
    );
  }

  return (
    <div className="flex h-[5.5rem] items-center justify-center sm:h-24">
      {image}
    </div>
  );
}

function CertificationItem({ cert }: { cert: Certification }) {
  const content = (
    <>
      <CertificationLogo cert={cert} />
      <h3
        className="mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b89550] sm:text-xs"
      >
        {cert.title}
      </h3>
      <p className="mt-2.5 max-w-[15rem] font-sans text-[12px] leading-[1.65] text-[#6b7280] sm:text-[13px]">
        {cert.description}
      </p>
    </>
  );

  if (cert.href) {
    return (
      <a
        href={cert.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center text-center transition-opacity hover:opacity-90"
        aria-label={`${cert.title} — open license document`}
      >
        {content}
      </a>
    );
  }

  return <div className="flex flex-col items-center text-center">{content}</div>;
}

export default function CertificatesProofSection({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      aria-labelledby="proof-heading"
      className={`certificates-proof-section relative z-20 overflow-visible bg-white px-6 pt-14 pb-8 md:px-10 md:pt-16 md:pb-10 lg:px-12 lg:pt-16 lg:pb-10 ${className}`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="overflow-visible pt-2 text-center">
          <LotusEmblem />

          <h2 id="proof-heading" className="mt-5 overflow-visible">
            <span
              className="block overflow-visible pb-0.5 font-display text-[2rem] font-medium leading-[1.15] tracking-[0.02em] sm:text-[2.35rem] md:text-[2.65rem]"
              style={{ color: FOREST }}
            >
              GOOD FOOD
            </span>
            <span
              className="mt-1 block overflow-visible font-display text-[2rem] font-medium leading-[1.15] tracking-[0.02em] sm:text-[2.35rem] md:text-[2.65rem]"
              style={{ color: GOLD }}
            >
              BACKED BY PROOF
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-md font-sans text-[12px] leading-relaxed text-[#6b7280] sm:text-[13px]">
            Every ingredient. Every process. Every time.
            <br />
            Certified for your trust, backed by science.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
          {TOP_ROW.map((cert) => (
            <li key={cert.id}>
              <CertificationItem cert={cert} />
            </li>
          ))}
        </ul>

        <ul
          className="mt-10 grid grid-cols-1 gap-10 border-t border-[#c9a962]/15 pt-10 sm:mt-12 sm:grid-cols-3 sm:gap-8 sm:pt-12 lg:mt-12 lg:gap-10 lg:pt-12"
        >
          {BOTTOM_ROW.map((cert, index) => (
            <li
              key={cert.id}
              className={`flex flex-col items-center px-4 sm:px-6 ${
                index > 0 ? "sm:border-l sm:border-[#d4cfc4]/80" : ""
              }`}
            >
              <CertificationItem cert={cert} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
