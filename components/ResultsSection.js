// components/ResultsSection.js
"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Recreates the Elementor "Build on results / Market Leaders by the Numbers."
 * - Two headings with subtle fade in
 * - Center illustrative image
 * - Four metric cards with animated counters
 * - Tailwind-only, matches your black/white/gray look
 */

export default function ResultsSection({
  id = "results",
  headlineA = "Build on results",
  headlineB_main = "Market Leaders",
  headlineB_faded = "by the Numbers.",
  imageSrc = "https://obtino.com/wp-content/uploads/2025/07/Group-132.webp",
}) {
  return (
    <section
      id={id}
      className="relative overflow-hidden py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100"
      aria-labelledby="results-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.08),transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Headings */}
        <div className="text-center space-y-3 mb-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              {headlineA}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="results-heading"
              className="text-3xl md:text-5xl font-bold text-black"
            >
              {headlineB_main}{" "}
              <span className="text-black/25">{headlineB_faded}</span>
            </h2>
          </Reveal>
        </div>

        {/* Center image */}
        <Reveal delay={0.12}>
          <div className="relative mb-12">
            <img
              src={imageSrc}
              alt=""
              width={1103}
              height={450}
              className="mx-auto w-full max-w-5xl rounded-2xl border border-gray-200 shadow-sm"
              loading="lazy"
            />
          </div>
        </Reveal>

        {/* Metrics grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            prefix=""
            to={1000}
            suffix="+"
            title="Projects"
            desc="A decade of experience. Hundreds of brands transformed. Every project backed by data, strategy, and relentless execution."
          />

          <Metric
            prefix="$"
            to={20}
            suffix="M+"
            title="in added revenue"
            desc="We don’t just optimize — we engineer growth. Our CRO frameworks have generated over one hundred million dollars in measurable revenue for our clients."
          />

          <Metric
            prefix="$"
            to={30}
            suffix="M+"
            title="in ad spend"
            desc="Every dollar we spend is designed to multiply. With thirty million dollars in ad spend under our belt, we turn media buying into market domination."
          />

          <Metric
            prefix=""
            to={98}
            suffix="%"
            title="Client Satisfaction"
            desc="Trust isn’t given — it’s earned. Our clients not only stay, they scale with us. Because results speak louder than promises."
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- subcomponents ---------------- */

function Metric({ prefix = "", to = 0, suffix = "", title, desc }) {
  return (
    <Reveal as="article" className="h-full">
      <div className="h-full rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 p-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl md:text-5xl font-extrabold text-black leading-none">
            <Counter to={to} duration={2000} prefix={prefix} suffix={suffix} />
          </span>
        </div>

        <h3 className="mt-3 text-base font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </Reveal>
  );
}

function Counter({ to = 0, duration = 1500, prefix = "", suffix = "" }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let raf;
    const t0 = performance.now();
    const from = 0;
    const target = Number(to) || 0;

    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = easeOutCubic(p);
      const current = from + (target - from) * eased;
      setVal(current);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, duration]);

  // Format numbers like 1,000 — keep integers for these counters
  const display =
    prefix + formatInt(val, to >= 1000 ? 0 : 0) + suffix;

  return (
    <span ref={ref} aria-label={`${prefix}${to}${suffix}`}>
      {display}
    </span>
  );
}

function formatInt(n, decimals = 0) {
  const v = Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return v.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Small reveal wrapper using IntersectionObserver.
 * Adds opacity/translate transition once visible.
 */
function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
}) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setShow(true);
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
