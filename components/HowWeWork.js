"use client";

import { usePathname } from "next/navigation";
import React from "react";

const LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "en";
const getLocaleFromPath = (pathname = "/") => {
  const first = pathname.split("/").filter(Boolean)[0];
  return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
};

const COPY = {
  en: {
    title: "Our Process",
    sub: "A streamlined process designed to turn your ideas into high-impact digital products.",
    steps: [
      {
        // number kept for stability in data but not used visually
        number: "01",
        title: "Discovery & Analysis",
        desc: "Understand the brand, market, and audience",
      },
      {
        number: "02",
        title: "Strategy and Planning",
        desc: "Define positioning, communication and KPIs.",
      },
      {
        number: "03",
        title: "Design and Development",
        desc: "Build user centric experiences and scalable platforms.",
      },
      {
        number: "04",
        title: "Execution & Marketing",
        desc: "Launch campaigns and digital products with precision.",
      },
      {
        number: "05",
        title: "Optimization and Growth",
        desc: "Monitor, refine, and accelerate business results.",
      },
    ],
  },
  da: {
    title: "Sådan arbejder vi",
    sub: "En strømlinet proces designet til at omsætte dine ideer til digitale produkter med høj effekt.",
    steps: [
      {
        number: "01",
        title: "Opdagelse & Strategi",
        desc: "Vi går i dybden med at forstå dine mål, dit publikum og markedet. Sammen lægger vi en klar strategi, der giver målbare resultater.",
      },
      {
        number: "02",
        title: "Design & Oplevelse",
        desc: "Vores UX/UI-team skaber interfaces, der ikke kun er smukke, men også intuitive og tilgængelige på alle enheder.",
      },
      {
        number: "03",
        title: "Udvikling & Lancering",
        desc: "Vi bygger skalerbare, højtydende løsninger med moderne frameworks og agile metoder — klar til lancering.",
      },
      {
        number: "04",
        title: "Vækst & Support",
        desc: "Vi er med dig efter lanceringen og leverer hosting, SEO og løbende support for at sikre vækst.",
      },
    ],
  },
};

// small neutral icons that inherit currentColor
function getIcon(index) {
  const commonProps = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    className: "h-6 w-6",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (index) {
    case 0:
      // magnifier
      return (
        <svg {...commonProps}>
          <circle cx="11" cy="11" r="5" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      );
    case 1:
      // document
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="14" height="18" rx="2" />
          <path d="M7 7h6" />
          <path d="M7 11h6" />
        </svg>
      );
    case 2:
      // pencil
      return (
        <svg {...commonProps}>
          <path d="M3 21l3-1 11-11a2.828 2.828 0 10-4-4L3 16v5z" />
          <path d="M14 6l4 4" />
        </svg>
      );
    case 3:
      // rocket
      return (
        <svg {...commonProps}>
          <path d="M12 2s4 0 6 2 2 6 2 6-3 1-6 4-4 6-4 6-3-2-6-5S2 12 2 12 6 2 12 2z" />
          <path d="M7 17s1 1 3 1 3-1 3-1" />
        </svg>
      );
    case 4:
      // chart
      return (
        <svg {...commonProps}>
          <path d="M3 3v18h18" />
          <path d="M7 14l3-3 4 4 5-7" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

export default function HowWeWork() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const t = COPY[locale] ?? COPY[DEFAULT_LOCALE];

  return (
    <section className="relative bg-black text-white py-24 overflow-visible">
      {/* Background glow accents */}
      <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/70">
            {t.sub}
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {t.steps.map((s, i) => (
            <article
              key={`${s.title}-${i}`}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-6 min-h-[200px] backdrop-blur-sm transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Icon (replaces number) - centered at top */}
              <div className="mb-6 flex items-center justify-center">
                <div
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white"
                  aria-hidden="true"
                >
                  {getIcon(i)}
                </div>
              </div>

              {/* Title & description */}
              <h3 className="text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-3 text-sm text-white/70">{s.desc}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-white to-white/40 transition-all group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
