// components/CreativePortfolio.js
"use client";

import { usePathname } from "next/navigation";

/* -------- Locale helpers -------- */
const SUPPORTED_LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "da";
const getLocaleFromPath = (pathname = "/") => {
  const first = pathname.split("/").filter(Boolean)[0];
  return SUPPORTED_LOCALES.includes(first) ? first : DEFAULT_LOCALE;
};

/* -------- Copy -------- */
const T = {
  da: {
    eyebrow: "UDVALGTE CASES",
    heading: (
      <>
        Vores Seneste <span className="text-black/40">Projekter</span>
      </>
    ),
    subheading:
      "Et udvalg af løsninger vi har leveret — designet til kvalitet, performance og vækst.",
    viewAll: "Se alle projekter",
    projects: [
      {
        title: "AI Chatbot App Udvikling",
        href: "/ai-chatbot-development-services",
        img: "/images/newPortfolio/NewChanges/ai_chatbot.png",
      },
      {
        title: "AI Traffic Management System",
        href: "/traffic-management-system-using-iot",
        img: "/images/newPortfolio/NewChanges/traffic_mgt_ai.png",
      },
      {
        title: "Real Estate App Udvikling",
        href: "/real-estate-app-development-company",
        img: "/images/newPortfolio/RealEstate/2.png",
      },
      {
        title: "AI Travel App Udvikling",
        href: "/ai-travel-app-development-company",
        img: "/images/newPortfolio/NewChanges/ai_travel_app.png",
      },
      {
        title: "On-Demand AI Rekruttering",
        href: "/ai-recruitment-software-development",
        img: "/images/newPortfolio/NewChanges/talenti_qube.png",
      },
      {
        title: "Car Rental App Udvikling",
        href: "/car-rental-application-development",
        img: "/images/newPortfolio/Automotive/4.png",
      },
    ],
  },
  en: {
    eyebrow: "FEATURED WORK",
    heading: (
      <>
        Our Recent <span className="text-black/40">Projects</span>
      </>
    ),
    subheading:
      "Presenting solutions we’ve successfully delivered—built to a high quality standard.",
    viewAll: "View All Projects",
    projects: [
      {
        title: "AI Chatbot App Development",
        href: "/ai-chatbot-development-services",
        img: "/images/newPortfolio/NewChanges/ai_chatbot.png",
      },
      {
        title: "AI Traffic Management System",
        href: "/traffic-management-system-using-iot",
        img: "/images/newPortfolio/NewChanges/traffic_mgt_ai.png",
      },
      {
        title: "Real Estate App Development",
        href: "/real-estate-app-development-company",
        img: "/images/newPortfolio/RealEstate/2.png",
      },
      {
        title: "AI Travel App Development",
        href: "/ai-travel-app-development-company",
        img: "/images/newPortfolio/NewChanges/ai_travel_app.png",
      },
      {
        title: "On Demand AI Recruitment",
        href: "/ai-recruitment-software-development",
        img: "/images/newPortfolio/NewChanges/talenti_qube.png",
      },
      {
        title: "Car Rental App Development",
        href: "/car-rental-application-development",
        img: "/images/newPortfolio/Automotive/4.png",
      },
    ],
  },
};

/* -------- Component -------- */
export default function CreativePortfolio({
  gradientBg = true,
  id = "portfolio",
}) {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const text = T[locale] ?? T[DEFAULT_LOCALE];

  return (
    <section
      id={id}
      aria-labelledby="portfolio-heading"
      className={`relative overflow-hidden py-20 ${
        gradientBg
          ? "bg-gradient-to-br from-gray-50 via-white to-gray-100"
          : "bg-white"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(2,6,23,0.06),transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-700">
            {text.eyebrow}
          </p>
          <h2
            id="portfolio-heading"
            className="mt-2 text-3xl md:text-4xl lg:text-5xl font-extrabold text-black"
          >
            {text.heading}
          </h2>
        </div>

        {/* Grid (3 cols on lg) */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {text.projects.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              className="group relative block rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 will-change-transform pb-12 mb-12"
              // ^ pb-12: reserves space for the pill that sits below the image edge
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {/* Image wrapper has its own rounding+clip; container does NOT clip so pill can sit outside */}
              <div className="rounded-3xl overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Centered white pill OUTSIDE the image, overlapping the card bottom */}
              <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[50%]">
                <div className="rounded-2xl bg-white px-6 py-3 shadow-xl shadow-black/10 border border-gray-100">
                  <p className="text-[15px] md:text-base font-semibold text-gray-900 text-center leading-snug">
                    {p.title}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 bg-black text-white px-7 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            {text.viewAll} <span>→</span>
          </a>
        </div>
      </div>

      {/* Card entrance motion */}
      <style jsx>{`
        section :global(a.group) {
          animation: cardIn 460ms ease both;
        }
        @keyframes cardIn {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
