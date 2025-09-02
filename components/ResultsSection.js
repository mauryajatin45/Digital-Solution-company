// components/ResultsSection.js
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/* ───────────────  Locale helpers ─────────────── */
const SUPPORTED_LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "en";
const getLocaleFromPath = (pathname = "/") => {
  const first = pathname.split("/").filter(Boolean)[0];
  return SUPPORTED_LOCALES.includes(first) ? first : DEFAULT_LOCALE;
};

/* ───────────────  Translations ─────────────── */
const T = {
  da: {
    id: "clients",
    eyebrow: "PARTNERSKABER",
    heading: "Vi samarbejder med førende løsningspartnere.",
    subheading:
      "Vi arbejder med anerkendte platforme for at give virksomheder moderne værktøjer og pålidelig support.",
    stats: [
      { to: 150, suffix: "+", title: "Tilfredse kunder", desc: "Samarbejder på tværs af brancher — leverancer med fokus på kvalitet, hastighed og gennemsigtighed." },
      { to: 98, suffix: "%", title: "Kundetilfredshed", desc: "Relationer der holder. Vi måler, lytter og forbedrer — derfor bliver vores kunder hos os." },
      { to: 6, suffix: "+", title: "Års erfaring", desc: "År med web, e-handel og automatisering. Best-practices uden overflødigt kompleksitet." },
      { to: 24, suffix: "/7", title: "Support", desc: "Når det haster, reagerer vi. Drift, fejlretning og rådgivning — hele døgnet." },
    ],
  },
  en: {
    id: "clients",
    eyebrow: "PARTNERSHIPS",
    heading: "We collaborate with leading solution providers.",
    subheading:
      "We partner with trusted platforms to equip businesses with modern tooling and reliable support.",
    stats: [
      { to: 150, suffix: "+", title: "Satisfied customers", desc: "Cross-industry collaborations — delivery focused on quality, speed, and transparency." },
      { to: 98, suffix: "%", title: "Customer satisfaction", desc: "Relationships that last. We measure, listen and improve — that’s why clients stay." },
      { to: 6, suffix: "+", title: "Years of experience", desc: "Years across web, e-commerce and automation. Best practices without the bloat." },
      { to: 24, suffix: "/7", title: "Support", desc: "When it matters, we respond. Uptime, fixes and advice — round the clock." },
    ],
  },
};

/* Partner logos */
const PARTNERS = [
  { src: "/img/company/restaurant.png", alt: "Klaviyo" },
  { src: "/img/company/fintech.png", alt: "Mailchimp" },
  { src: "/img/company/retail.png", alt: "monday.com" },
  { src: "/img/company/designagency.png", alt: "HubSpot" },
  { src: "/img/company/logistics-company-logo.png", alt: "Shopify" },
  { src: "/img/company/healthcare-logo.png", alt: "Magento" },
  { src: "/img/company/tech-solutions-logo.png", alt: "tch" },
  { src: "/img/company/consulting-firm-logo.png", alt: "consulting" },
  { src: "/img/company/abstract-tech-logo.png", alt: "abstact" },
  { src: "/img/company/green-energy-logo.png", alt: "green" },
  { src: "/img/company/1.jpg", alt: "1" },
  { src: "/img/company/free.jpg", alt: "free" },
];

/* ───────────────  Component ─────────────── */
export default function ResultsSection({ id }) {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const t = T[locale] ?? T[DEFAULT_LOCALE];

  const sectionId = id || t.id;

  return (
    <section
      id={sectionId}
      className="relative overflow-hidden py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100"
      aria-labelledby="clients-heading"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(2,6,23,0.06),transparent_55%)]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Partnerships block */}
        <div className="text-center mb-14">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-700 mb-2">
              {t.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="clients-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight"
            >
              {t.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
              {t.subheading}
            </p>
          </Reveal>
        </div>

        {/* Partner logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center mb-16">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.alt} delay={0.05 + i * 0.02}>
              <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm h-24">
                <img
                  src={p.src}
                  alt={p.alt}
                  className="max-h-20 w-auto opacity-80 hover:opacity-100 transition"
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.map((s, i) => (
            <Metric
              key={s.title}
              to={s.to}
              suffix={s.suffix}
              title={s.title}
              desc={s.desc}
              delay={i * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────  Subcomponents ─────────────── */

function Metric({ to = 0, suffix = "", title, desc, delay = 0 }) {
  return (
    <Reveal as="article" className="h-full" delay={delay}>
      <div className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 p-6">
        <div className="text-4xl md:text-5xl font-extrabold text-black leading-none">
          <Counter to={to} suffix={suffix} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </Reveal>
  );
}

function Counter({ to = 0, duration = 1500, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStarted(true)),
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShow(true)),
      { threshold: 0.15 }
    );
    if (ref.current) io.observe(ref.current);
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
