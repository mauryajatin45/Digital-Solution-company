// components/CasesSection.js
"use client";
import { useEffect, useRef, useState } from "react";

/**
 * CasesSection
 * - Divider "Cases"
 * - Heading with faded tail text and highlighted numbers
 * - Logo strip image
 * - Two case cards with overlay graphics and animated counters
 * - Minimal tasteful tweaks: smoother hover, accessible markup, responsive layout
 */

export default function CasesSection() {
  return (
    <section
      id="Cases"
      className="relative overflow-hidden py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100"
      aria-labelledby="cases-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.08),transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Divider */}
        <div className="flex items-center gap-4 mb-6" role="separator" aria-label="Cases">
          <span className="text-sm font-medium tracking-wider uppercase text-gray-900">Cases</span>
          <span className="h-px w-full bg-gray-300" />
        </div>

        {/* Heading */}
        <h2
          id="cases-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight"
        >
          Over the past{" "}
          <span className="font-semibold tabular-nums">10</span> years, we’ve been part of
          thousands of exciting cases{" "}
          <span className="text-black/25">
            across more than <span className="font-semibold tabular-nums">10</span> countries.
          </span>
        </h2>

        {/* Logo strip */}
        <div className="mt-8">
          <img
            src="https://obtino.com/wp-content/uploads/2025/08/Group-1-23.webp"
            alt="Brands we’ve worked with"
            width={1065}
            height={177}
            className="w-full max-w-5xl mx-auto rounded-xl border border-gray-200 shadow-sm"
            loading="lazy"
          />
        </div>

        {/* Grid of cases */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Case 1 */}
          <CaseCard
            href="https://obtino.com/cases/collectors-cage/"
            title="Collector’s Cage"
            image="https://obtino.com/wp-content/uploads/2025/07/image-383.webp"
            overlayImage="https://obtino.com/wp-content/uploads/2025/08/image-40-1.webp"
            overlayAlt="Collector’s Cage overlay"
            kpis={[
              { label: "Increase in conversion rate", to: 114, suffix: "%" },
              { label: "Boost in average order value", to: 30, suffix: "%" },
            ]}
          />

          {/* Case 2 */}
          <CaseCard
            href="https://obtino.com/cases/copenhagenhealth/"
            title="Copenhagen Health"
            image="https://obtino.com/wp-content/uploads/2025/08/R1.webp"
            overlayImage="https://obtino.com/wp-content/uploads/2025/08/CopenhagenHealth-LOGO_SIMPLE_100white_1.webp"
            overlayAlt="Copenhagen Health logo"
            overlayPos="top-6 right-6 w-36"
            kpis={[
              { label: "Increase in conversion rate", to: 74, suffix: "%" },
              { label: "Boost in average order value", to: 39, suffix: "%" },
            ]}
          />
        </div>

        {/* View all button */}
        <div className="mt-10">
          <a
            href="https://obtino.com/cases/"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            View all cases
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- subcomponents ---------------- */

function CaseCard({
  href,
  title,
  image,
  overlayImage,
  overlayAlt,
  overlayPos = "top-6 left-1/2 -translate-x-1/2 w-80",
  kpis = [],
}) {
  return (
    <a
      href={href}
      className="group relative block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
      aria-label={title}
    >
      {/* Visual */}
      <div className="relative">
        <div className="aspect-[4/3] bg-gray-100">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>

        {/* Overlay graphic (position adjustable) */}
        {overlayImage && (
          <img
            src={overlayImage}
            alt={overlayAlt || ""}
            className={`pointer-events-none absolute ${overlayPos} drop-shadow`}
            loading="lazy"
          />
        )}
      </div>

      {/* Content + KPIs */}
      <div className="relative p-5 lg:p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <div className="inline-flex items-center gap-2 text-sm text-gray-800 group-hover:translate-x-0.5 transition-transform">
            <span>Read full case</span>
            <svg width="10" height="16" viewBox="0 0 8 14" fill="none" aria-hidden="true">
              <path d="M1 1L7 7L1 13" stroke="#333333" />
            </svg>
          </div>
        </div>

        {/* KPI box */}
        {kpis?.length > 0 && (
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            {kpis.map((k, i) => (
              <KpiCard key={i} label={k.label} to={k.to} suffix={k.suffix} />
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

function KpiCard({ label, to = 0, suffix = "" }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="mt-1 text-2xl font-extrabold text-black">
        <Counter to={to} duration={1500} />{suffix}
      </div>
    </div>
  );
}

function Counter({ to = 0, duration = 1500 }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStarted(true)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf;
    const t0 = performance.now();
    const from = 0;
    const target = Number(to) || 0;
    const ease = (x) => 1 - Math.pow(1 - x, 3);

    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      setVal(from + (target - from) * ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, duration]);

  return (
    <span ref={ref} aria-label={`${to}`}>
      {Math.round(val).toLocaleString()}
    </span>
  );
}
