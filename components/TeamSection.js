"use client";

import { usePathname } from "next/navigation";

/* -------- Helpers -------- */
const SUPPORTED_LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "en";
const getLocaleFromPath = (pathname = "/") => {
  const first = pathname.split("/").filter(Boolean)[0];
  return SUPPORTED_LOCALES.includes(first) ? first : DEFAULT_LOCALE;
};

/* -------- Translations -------- */
const T = {
  da: {
    heading: "Mød vores team",
    intro: (
      <>
        Hos Vertex Global <span className="font-bold">er vi mere end bare et digitalt bureau.</span>{" "}
        Vi elsker at være en del af denne rejse. At mærke friheden og at der{" "}
        <span className="font-bold">ingen grænser er for kreativiteten.</span>
      </>
    ),
    members: [
      { role: "CFO & Medstifter", name: "Julieta Z.", imgAlt: "Julieta står på en altan" },
      { role: "CEO & Medstifter", name: "Paolo B.", imgAlt: "Paolo sidder og arbejder på en café" },
      { role: "Community Manager", name: "Julian M.", imgAlt: "Julian står og læner sig op ad en dør" },
    ],
    ctaTitle: "Vil du være en del af dette?",
    ctaDesc:
      "Vi vokser, og måske er du den gnist, vi har brug for. Designere, udviklere, content-folk: hvis du mærker energien, så lad os tale sammen!",
    ctaBtn: "Bliv en del af teamet",
  },

  en: {
    heading: "Meet Our Team",
    intro: (
      <>
        At Vertex Global <span className="font-bold">we’re more than just a digital agency.</span>{" "}
        We love to be part of this adventure. Feeling freedom and that there’s{" "}
        <span className="font-bold">no ceiling for creativity.</span>
      </>
    ),
    members: [
      { role: "CFO & Co - Founder", name: "Julieta Z.", imgAlt: "Julieta standing on a balcony" },
      { role: "CEO & Co - Founder", name: "Paolo B.", imgAlt: "Paolo sitting and working at a cafe" },
      { role: "Community Manager", name: "Julian M.", imgAlt: "Julian standing and leaning against a door" },
    ],
    ctaTitle: "More about our Team.",
    ctaDesc:
      "A multidisciplinary group of strategists, designers, developers, and marketers working across global offices in Mumbai, New york and London.",
    ctaBtn: "Join the Team",
  },
};

/* -------- Component -------- */
export default function TeamSection() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const t = T[locale] ?? T[DEFAULT_LOCALE];

  return (
    <section className="relative h-fit w-full bg-white" id="team">
      <div className="relative py-4 lg:py-16 lg:pb-8 lg:pt-24 px-6 sm:px-8 lg:px-32 h-fit w-full max-w-maximum lg:max-h-[1050px] mx-auto justify-center items-center flex flex-col xl:flex-row">
        {/* Left content */}
        <div className="xl:w-320 pb-8 xl:pr-10">
          <h2 className="font-domine font-bold text-4xl lg:text-5xl text-[#020617] max-lg:text-center">
            {t.heading}
          </h2>
          <p className="font-poppins font-normal text-xl text-[#353845] pt-16">
            {t.intro}
          </p>
        </div>

        {/* Team members grid */}
        <div className="md:flex flex-row grid grid-cols-2 items-center justify-center">
          {t.members.map((m, i) => (
            <div key={i} className="flex flex-col items-center justify-start w-full group relative">
              <div
                className="w-[calc(100%+5vh)] p-2 rounded-full bg-white active:z-30 focus:z-30 relative"
                tabIndex={0}
              >
                <img
                  alt={m.imgAlt}
                  src={
                    i === 0
                      ? "https://www.bona-agency.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fjulieta.201b22e6.jpg&w=3840&q=75"
                      : i === 1
                      ? "https://www.bona-agency.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpaolo.4fd924d1.jpeg&w=1920&q=75"
                      : "https://www.bona-agency.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fjulian.6a4b916b.jpg&w=3840&q=75"
                  }
                  className="rounded-full object-cover w-full h-full aspect-square"
                  loading="lazy"
                />
              </div>
              <h3 className="font-poppins font-normal text-sm text-black">{m.role}</h3>
              <h3 className="font-poppins font-medium text-lg lg:text-2xl text-black">{m.name}</h3>
            </div>
          ))}

          {/* Call to action */}
          <div className="flex flex-col items-center justify-start w-full max-md:pt-8">
            <div
              className="w-[calc(100%+5vh)] aspect-square group p-4 sm:p-8 md:p-4 lg:p-8 rounded-full bg-[#F7FDE8] flex flex-col items-center justify-center active:z-30 focus:z-30 relative"
              tabIndex={0}
            >
              <h3 className="font-poppins font-semibold text-lg sm:text-xl md:text-lg xl:text-xl 2xl:text-2xl text-black text-center">
                {t.ctaTitle}
              </h3>
              <p className="font-poppins font-normal text-xs sm:text-sm text-black pt-2 lg:pt-4 text-center">
                {t.ctaDesc}
              </p>
            </div>
            <div className="py-8 w-full md:w-fit">
              <a
                href="/en/contact"
                target=""
                rel="noopener noreferrer"
                className="font-inter font-semibold text-base lg:text-lg text-[#DA3C00] border border-[#DA3C00] px-2 sm:px-4 xl:px-6 py-3 rounded-full group inline-flex justify-center md:justify-between items-center md:w-fit w-full"
              >
                {t.ctaBtn}
                <svg
                  className="ml-2 group-hover:-rotate-45 transform transition-all"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8.40402 1.65466L14.7497 8.00031L8.40402 14.346"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.7488 8.00061L1.2489 8.00061"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
