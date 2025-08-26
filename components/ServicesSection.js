// components/ServicesSection.js
"use client";
import React from "react";

/**
 * Gutenverse-look Services section for Next.js + Tailwind (monochrome theme)
 * - Exact grid: 3 columns, each with 2 icon boxes
 * - Left column includes the headings + first 2 boxes (like the WP markup)
 * - Hover-from-left accent bar + watermark icon + Learn More CTA
 * - Subtle fade-in-up/left animations (CSS keyframes inline)
 */

const CARDS = [
  // Column 1 (after headings)
  {
    title: "Streamline The Trial",
    desc:
      "Lorem ipsum dolor sit amet, consecte tur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    href: "#",
    icon: "eye",
  },
  {
    title: "Streamline The Trial",
    desc:
      "Lorem ipsum dolor sit amet, consecte tur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    href: "#",
    icon: "wand",
  },
  // Column 2
  {
    title: "Cloud-based Storage",
    desc:
      "Lorem ipsum dolor sit amet, consecte tur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    href: "#",
    icon: "cloud",
  },
  {
    title: "CTMS Platform",
    desc:
      "Lorem ipsum dolor sit amet, consecte tur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    href: "#",
    icon: "design",
  },
  // Column 3
  {
    title: "User Friendly",
    desc:
      "Lorem ipsum dolor sit amet, consecte tur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    href: "#",
    icon: "user",
  },
  {
    title: "19/6 Support",
    desc:
      "Lorem ipsum dolor sit amet, consecte tur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    href: "#",
    icon: "atom",
  },
];

export default function ServicesSection({ id = "services" }) {
  // Split cards into 3 columns of 2 (mirrors the WP DOM)
  const col1 = CARDS.slice(0, 2);
  const col2 = CARDS.slice(2, 4);
  const col3 = CARDS.slice(4, 6);

  return (
    <section
      id={id}
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 md:py-20"
      aria-labelledby="services-heading"
    >
      {/* background texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.08),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-3">
          {/* Column 1 (includes headings + 2 cards) */}
          <div>
            <div className="__desktop-fadeInLeft">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                Core Level
              </h4>
              <h2
                id="services-heading"
                className="mt-2 text-4xl font-bold leading-tight text-black md:text-5xl"
              >
                Services
              </h2>
            </div>

            <div className="mt-6 space-y-6">
              {col1.map((card, i) => (
                <IconBox
                  key={`${card.title}-${i}`}
                  {...card}
                  // match WP: fadeInUp for boxes
                  className="__desktop-fadeInUp"
                  delay={i * 80}
                />
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <div className="space-y-6">
              {col2.map((card, i) => (
                <IconBox
                  key={`${card.title}-${i}`}
                  {...card}
                  className="__desktop-fadeInUp"
                  delay={i * 80}
                />
              ))}
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <div className="space-y-6">
              {col3.map((card, i) => (
                <IconBox
                  key={`${card.title}-${i}`}
                  {...card}
                  className="__desktop-fadeInUp"
                  delay={i * 80}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes (scoped) */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(12px) }
          100% { opacity: 1; transform: translateY(0) }
        }
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-12px) }
          100% { opacity: 1; transform: translateX(0) }
        }
        .__desktop-fadeInUp {
          animation: fadeInUp .6s ease both;
        }
        .__desktop-fadeInLeft {
          animation: fadeInLeft .6s ease both;
        }
        @media (prefers-reduced-motion: reduce) {
          .__desktop-fadeInUp,
          .__desktop-fadeInLeft {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ---------------- Card ---------------- */

function IconBox({ title, desc, href, icon, className = "", delay = 0 }) {
  const labelId = `${title.toLowerCase().replace(/\s+/g, "-")}-title`;
  const descId = `${title.toLowerCase().replace(/\s+/g, "-")}-desc`;

  return (
    <a
      href={href}
      aria-labelledby={labelId}
      aria-describedby={descId}
      className={[
        "group relative block overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-200",
        "motion-safe:transition-all motion-safe:duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-black",
        className,
      ].join(" ")}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Hover-from-left accent */}
      <span
        className="pointer-events-none absolute left-0 top-0 h-full w-[6px] -translate-x-2 bg-black/80 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Header: icon badge on top */}
      <div className="icon-box icon-box-header">
        <div className="icon bg-style-color">
          <span className="grid h-14 w-14 place-content-center rounded-full bg-black text-white">
            <Icon type={icon} className="h-7 w-7 text-white" />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="icon-box icon-box-body mt-4">
        <h5 id={labelId} className="title text-lg font-semibold text-black">
          {title}
        </h5>
        <p id={descId} className="icon-box-description mt-2 text-gray-700">
          {desc}
        </p>

        <div className="mt-4 inline-flex items-center gap-2">
          <span className="guten-element guten-button-wrapper">
            <span className="guten-button guten-button-sm inline-flex items-center gap-2 rounded-full border-2 border-black bg-black px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-gray-900">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </span>
          </span>
        </div>
      </div>

      {/* Watermark icon (top-right) */}
      <div
        className="hover-watermark pointer-events-none absolute -right-6 -top-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        <Icon type={icon} className="h-28 w-28 text-black/5" />
      </div>
    </a>
  );
}

/* ---------------- Icons (monochrome, matches 'gtn-*' look) ---------------- */

function Icon({ type, className = "" }) {
  switch (type) {
    case "eye":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "wand":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <path d="M3 21L15 9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M17 3v2M21 7h-2M19 3l-1 1M21 5l-1 1M15 3l1 1M17 7l1 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M7 18h9a4 4 0 0 0 0-8 6 6 0 0 0-11-1.5A4.5 4.5 0 0 0 7 18Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "design":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 17h8" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "user":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "atom":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="currentColor" strokeWidth="1.6" />
          <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke="currentColor" strokeWidth="1.6" transform="rotate(120 12 12)" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

function ArrowRight({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
