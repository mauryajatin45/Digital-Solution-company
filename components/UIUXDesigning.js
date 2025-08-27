// components/UIUXDesigning.js
"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

/* ───────────── locale helpers ───────────── */
const LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "en";
const getLocaleFromPath = (pathname = "/") => {
  const first = pathname.split("/").filter(Boolean)[0];
  return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
};

/* ───────────── copy ───────────── */
const COPY = {
  en: {
    title: "UI/UX Designing",
    desc:
      "Whether you're looking to create a new app or website from scratch, or revamp an existing one, Denmark Web has the expertise and creativity to bring your vision to life.",
    left: [
      { label: "Wireframing", icon: "wire" },
      { label: "Prototyping", icon: "proto" },
      { label: "Visual Design", icon: "visual" },
    ],
    right: [
      { label: "Logo Design", icon: "logo" },
      { label: "Branding", icon: "brand" },
      { label: "Motion Design", icon: "motion" },
    ],
    cta: "Read More",
  },
  da: {
    title: "UI/UX Design",
    desc:
      "Uanset om du skal bygge en ny app eller hjemmeside fra bunden, eller give en eksisterende et løft, har Denmark Web både ekspertisen og kreativiteten til at realisere jeres vision.",
    left: [
      { label: "Wireframing", icon: "wire" },
      { label: "Prototyping", icon: "proto" },
      { label: "Visuelt design", icon: "visual" },
    ],
    right: [
      { label: "Logo­design", icon: "logo" },
      { label: "Branding", icon: "brand" },
      { label: "Motion design", icon: "motion" },
    ],
    cta: "Læs mere",
  },
};

/* ───────────── tiny inline mono icons ───────────── */
const Mono = ({ type, className = "" }) => {
  switch (type) {
    case "wire":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "proto":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M13 8h4l4 4v6a3 3 0 0 1-3 3h-5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        </svg>
      );
    case "visual":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <path d="M3 12s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6Z" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    case "logo":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <circle cx="8" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="12" y="6" width="9" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "brand":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <path d="M4 18 20 6M6 6h6v6H6V6Z" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="18" cy="16" r="3" fill="currentColor" />
        </svg>
      );
    case "motion":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <path d="M4 12h6M8 8h8M10 16h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="6" cy="12" r="2.5" fill="currentColor" />
        </svg>
      );
    default:
      return <svg viewBox="0 0 24 24" className={className} fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>;
  }
};

/* ───────────── component ───────────── */
/**
 * Props:
 * - imageSide: "right" | "left" (default "right")
 * - textAlign: "left" | "right" (default "left")
 * - imageSrc / imageAlt (override illustration)
 * - ctaHref
 */
export default function UIUXDesigning({
  imageSide = "right",
  textAlign = "left",
  imageSrc = "https://aavatto.com/wp-content/uploads/2023/07/ui-ux-designing.png",
  imageAlt = "UI/UX illustration",
  className = "",
  ctaHref = "/services/ui-ux",
}) {
  const pathname = usePathname() || "/";
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const t = COPY[locale] ?? COPY.en;

  const imageFirst = imageSide === "left";
  const textRight = textAlign === "right";

  return (
    <section className={`bg-white ${className}`} aria-labelledby="uiux-title">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div
          className={[
            "grid items-center gap-10",
            "lg:grid-cols-2",
            imageFirst ? "" : "lg:[&>div:first-child]:order-1 lg:[&>div:last-child]:order-2",
          ].join(" ")}
        >
          {/* text block */}
          <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
            <h2
              id="uiux-title"
              className={[
                "text-[#173A5A] font-extrabold tracking-tight",
                "text-3xl sm:text-4xl lg:text-[40px] leading-tight",
                textRight ? "text-right" : "text-left",
              ].join(" ")}
            >
              <span className="inline-block relative">
                <span className={textRight ? "highlight-peach-right" : "highlight-peach-left"} />
                <span className="relative z-10">{t.title}</span>
              </span>
            </h2>

            <p
              className={[
                "mt-4 text-lg leading-7 text-gray-600 max-w-2xl",
                textRight ? "ml-auto text-right" : "text-left",
              ].join(" ")}
            >
              {t.desc}
            </p>

            {/* features */}
            <div
              className={[
                "mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2",
                textRight ? "text-right" : "text-left",
              ].join(" ")}
            >
              {/* left column */}
              <ul className={["space-y-4", textRight ? "sm:order-2" : ""].join(" ")}>
                {t.left.map((it) => (
                  <li key={it.label} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#EAF3FF] text-[#1e3a8a]">
                      <Mono type={it.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-[15px] font-medium text-[#1F2A44]">{it.label}</span>
                  </li>
                ))}
              </ul>
              {/* right column */}
              <ul className="space-y-4">
                {t.right.map((it) => (
                  <li key={it.label} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#FFF2E9] text-[#9a3412]">
                      <Mono type={it.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-[15px] font-medium text-[#1F2A44]">{it.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA link */}
            <div className={textRight ? "text-right" : ""}>
              <a
                href={ctaHref}
                className="mt-6 inline-flex items-center gap-2 text-[#F0873E] font-semibold tracking-wide"
              >
                {t.cta}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* illustration (floating) */}
          <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
            <div className="mx-auto max-w-[560px] animate-bob will-change-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto drop-shadow-sm"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* local styles */}
      <style jsx>{`
        /* peach underline behind the title */
        .highlight-peach-left,
        .highlight-peach-right {
          position: absolute;
          bottom: 0.08em;
          height: 0.38em;
          background: #ffd8ca;
          border-radius: 6px;
          z-index: 0;
          width: 58%;
        }
        .highlight-peach-left {
          left: 0.05em;
        }
        .highlight-peach-right {
          right: 0.05em;
        }
        /* floating animation */
        @keyframes bob {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-bob {
          animation: bob 4.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
