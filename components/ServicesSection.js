// components/ServicesSection.js
"use client";
import React from "react";

/**
 * ServicesSection
 * - Theme: gray/white gradient, black accents
 * - Responsive grid of 6 services
 * - Headline with subtle highlight on the word “Service”
 * - Entire card clickable; smooth hover lift; round icon badge
 *
 * Use:
 *   <ServicesSection id="services" />
 */

const SERVICES = [
  {
    key: "uiux",
    title: "UI/UX Design",
    desc: "Transform your digital presence with expert UI/UX design.",
    href: "/services#uiux",
    icon: "uiux",
  },
  {
    key: "frontend",
    title: "Front-end Development",
    desc: "Elevate your web apps with robust, modern front-end engineering.",
    href: "/services#frontend",
    icon: "frontend",
  },
  {
    key: "ecommerce",
    title: "E-Commerce Development",
    desc: "Tailored ecommerce solutions to enhance growth and retention.",
    href: "/services#ecommerce",
    icon: "cart",
  },
  {
    key: "wordpress",
    title: "WordPress Development",
    desc: "Flexible, high-performance WordPress for serious brands.",
    href: "/services#wordpress",
    icon: "wp",
  },
  {
    key: "backend",
    title: "Back-end Development",
    desc: "Secure, scalable back-ends that power seamless experiences.",
    href: "/services#backend",
    icon: "db",
  },
  {
    key: "mobile",
    title: "Mobile App Development",
    desc: "iOS & Android apps that feel fast, fluid, and delightful.",
    href: "/services#mobile",
    icon: "mobile",
  },
];

export default function ServicesSection({ id = "services" }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100"
      aria-labelledby="services-heading"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.08),transparent_55%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-wider text-gray-600">Build on results</p>

          <h2
            id="services-heading"
            className="mt-3 text-4xl md:text-5xl font-bold text-black leading-tight"
          >
            Our Notable{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Service</span>
              {/* highlight underline */}
              <span
                className="absolute left-0 right-0 bottom-1 h-3 bg-black/10 rounded-sm"
                aria-hidden="true"
              />
            </span>{" "}
            Offerings
          </h2>

          <p className="mt-5 text-lg text-gray-700 max-w-2xl">
            Explore our diverse range of services, delivering cutting-edge solutions tailored to
            your specific needs and goals.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.key} service={s} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex">
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            View All Services <span className="translate-y-[1px]">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Subcomponents ---------- */
/* ---------- DROP-IN REPLACEMENT CARD ---------- */
/* Replace your existing ServiceCard + Icon with this version */

function ServiceCard({ service, index = 0 }) {
  const { title, desc, href, icon } = service;
  const labelId = `service-title-${index}`;

  return (
    <a
      href={href}
      aria-labelledby={labelId}
      className="group relative block overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 md:p-7 shadow-[0_1px_0_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-black focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-200"
      style={{ animation: "cardIn .55s ease both", animationDelay: `${index * 80}ms` }}
    >
      {/* Decorative soft glow (Elementor-like highlight) */}
      <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header row: circle icon + title/desc */}
      <div className="flex items-start gap-4">
        <span className="grid h-14 w-14 place-content-center rounded-full bg-gradient-to-br transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
          <Icon type={icon} className="h-7 w-7 text-black" />
        </span>

        <div>
          <h3 id={labelId} className="text-lg font-semibold text-black">
            {title}
          </h3>
          <p className="mt-2 text-gray-700">
            {desc}
          </p>
        </div>
      </div>

      {/* Footer row: CTA with underline sweep */}
      <div className="mt-5 inline-flex items-center gap-2 text-black font-medium">
        Learn more
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>

      {/* Animated underline sweep */}
      <span className="pointer-events-none absolute left-6 right-6 bottom-6 h-[1.5px] w-0 bg-gradient-to-r from-black/20 to-transparent transition-[width] duration-500 group-hover:w-[calc(100%-3rem)]" />

      <style jsx>{`
        @keyframes cardIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </a>
  );
}

/* ---------- Minimal inline icon set (keeps your b/w theme) ---------- */
function Icon({ type, className = "" }) {
  switch (type) {
    case "uiux":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 8h18M8 17h8" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "frontend":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 10l-3 2 3 2M16 10l3 2-3 2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "cart":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="9" cy="20" r="1.8" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17" cy="20" r="1.8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 4h2l2 12h10l2-8H7" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "wp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6.5 8c1.2 0 1.5 1.2 1.2 2.2L6 17m6.8-9c1.4 0 2 1.4 1.6 2.8L12 17m5-9c.9 0 1.4 1 1.1 2.1L16 17" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "db":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="5.5" rx="7.5" ry="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 5.5v6c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5v-6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 11.5v6c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5v-6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "mobile":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}
