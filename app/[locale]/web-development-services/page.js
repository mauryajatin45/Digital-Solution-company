// app/[locale]/web-development-services/page.js
"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ───────────────────────── Locale helpers ───────────────────────── */
const LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "en";
const getLocaleFromPath = (pathname = "/") => {
  const first = pathname.split("/").filter(Boolean)[0];
  return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
};
const withLocale = (locale, path) =>
  `/${locale}${path.startsWith("/") ? path : `/${path}`}`;

/* ───────────────────────── Copy (da/en) ───────────────────────── */
const COPY = {
  en: {
    seoTitle: "Web Development Services | Denmark Web",
    hero: {
      kicker: "Web Development",
      title: "High-performance websites built for growth.",
      sub:
        "We design, build and optimize modern, scalable web experiences. Performance, accessibility, SEO and conversion—baked in from day one.",
      cta: "Start Your Project",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1800&auto=format&fit=crop",
    },
    trust: {
      title: "Why choose Denmark Web",
      bullets: [
        "Performance first: lightning-fast, SEO-ready builds",
        "Secure & scalable architectures",
        "Accessible by design (WCAG) and analytics-driven",
        "Transparent process and predictable delivery",
      ],
    },
    services: {
      title: "What we build",
      items: [
        {
          title: "Custom Web Apps",
          desc: "React / Next.js front-ends, Node APIs and headless back-ends.",
          bullets: ["Component-driven UI", "Test coverage", "Auth/roles"],
          icon: "app",
        },
        {
          title: "Corporate Websites",
          desc: "Elegant, fast marketing sites that convert.",
          bullets: ["CRO best practices", "Analytics", "A/B tests"],
          icon: "site",
        },
        {
          title: "Headless CMS",
          desc: "Sanity, Strapi, Contentful—instant previews, structured content.",
          bullets: ["Live preview", "Roles/workflows", "Portable content"],
          icon: "cms",
        },
        {
          title: "E-commerce",
          desc: "Shopify & WooCommerce with modern storefronts.",
          bullets: ["Headless storefront", "Subscriptions", "Apps/integrations"],
          icon: "cart",
        },
        {
          title: "Integrations & APIs",
          desc: "Payments, CRM, analytics and custom data pipelines.",
          bullets: ["REST/GraphQL", "Webhooks", "ETL pipelines"],
          icon: "api",
        },
        {
          title: "Maintenance & Support",
          desc: "Monitoring, SLAs, enhancements and A/B testing.",
          bullets: ["SLA & SLO", "Observability", "Continuous improvements"],
          icon: "support",
        },
      ],
    },
    how: {
      title: "How we work",
      steps: [
        { label: "Discovery", desc: "Goals, users, constraints and KPIs." },
        { label: "Design & UX", desc: "Wireframes, UI, content model & acceptance criteria." },
        { label: "Build & QA", desc: "Component-driven dev, test coverage and accessibility." },
        { label: "Launch & Grow", desc: "Performance tuning, SEO, experiments & iteration." },
      ],
    },
    stack: {
      title: "Modern, proven stack",
      logos: ["Next.js", "React", "Node.js", "Tailwind", "Vercel", "AWS", "Sanity", "Shopify"],
    },
    work: {
      title: "Selected work",
      cases: [
        {
          title: "Aurora — Lifestyle Store",
          tag: "E-commerce",
          cover: "/img/company/portfolio-1.jpg",
          points: ["Headless Shopify", "+28% conversion", "TTFB −32%"],
        },
        {
          title: "Fjord CMS",
          tag: "Web Development",
          cover: "/img/company/portfolio-3.jpg",
          points: ["Next.js + Sanity", "Preview in seconds", "ISR"],
        },
        {
          title: "Nordic Bank",
          tag: "Web Design & UX",
          cover: "/img/company/portfolio-2.jpg",
          points: ["Design system", "Onboarding UX", "+18% NPS"],
        },
      ],
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "How long does a project take?", a: "Typical marketing sites ship in 3–6 weeks. Larger web apps: 6–12 weeks+ depending on scope." },
        { q: "Do you handle SEO?", a: "Yes. We integrate technical SEO, structured data, sitemaps, meta, speed & accessibility best practices." },
        { q: "Which CMS do you recommend?", a: "Sanity for structured content and previews; we also work with Strapi, Contentful and WordPress (headless)." },
        { q: "Do you provide support?", a: "Yes. We offer maintenance SLAs, monitoring, performance checks and ongoing improvements." },
      ],
    },
    cta: {
      title: "Have a project in mind?",
      sub: "Tell us about your goals and timelines—let’s build something remarkable.",
      button: "Talk to an expert",
    },
  },

  da: {
    seoTitle: "Webudvikling | Denmark Web",
    hero: {
      kicker: "Webudvikling",
      title: "Højtydende websites skabt til vækst.",
      sub:
        "Vi designer, bygger og optimerer moderne, skalerbare weboplevelser. Hastighed, tilgængelighed, SEO og konvertering—indbygget fra start.",
      cta: "Start dit projekt",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1800&auto=format&fit=crop",
    },
    trust: {
      title: "Hvorfor vælge Denmark Web",
      bullets: [
        "Performance først: lynhurtige, SEO-klare løsninger",
        "Sikker og skalerbar arkitektur",
        "Tilgængelighed (WCAG) og datadrevet",
        "Transparent proces og forudsigelig levering",
      ],
    },
    services: {
      title: "Hvad vi bygger",
      items: [
        {
          title: "Skræddersyede webapps",
          desc: "React / Next.js frontends, Node-API’er og headless backends.",
          bullets: ["Komponent-UI", "Tests", "Auth/roller"],
          icon: "app",
        },
        {
          title: "Virksomhedssites",
          desc: "Stilrene, hurtige marketingsites der konverterer.",
          bullets: ["CRO-praksis", "Analytics", "A/B-tests"],
          icon: "site",
        },
        {
          title: "Headless CMS",
          desc: "Sanity, Strapi, Contentful—live previews og struktureret indhold.",
          bullets: ["Live preview", "Roller/workflows", "Portabelt indhold"],
          icon: "cms",
        },
        {
          title: "E-handel",
          desc: "Shopify & WooCommerce med moderne storefronts.",
          bullets: ["Headless storefront", "Abonnementer", "Apps/integrationer"],
          icon: "cart",
        },
        {
          title: "Integrationer & API’er",
          desc: "Betaling, CRM, analytics og datastrømme.",
          bullets: ["REST/GraphQL", "Webhooks", "ETL-pipelines"],
          icon: "api",
        },
        {
          title: "Vedligehold & support",
          desc: "Monitoring, SLA’er, forbedringer og A/B-tests.",
          bullets: ["SLA & SLO", "Observability", "Løbende forbedringer"],
          icon: "support",
        },
      ],
    },
    how: {
      title: "Sådan arbejder vi",
      steps: [
        { label: "Afklaring", desc: "Mål, brugere, begrænsninger og KPI’er." },
        { label: "Design & UX", desc: "Wireframes, UI, indholdsmodel & acceptkriterier." },
        { label: "Udvikling & QA", desc: "Komponentdrevet udvikling, tests og tilgængelighed." },
        { label: "Lancér & Skaler", desc: "Performance-tuning, SEO, eksperimenter & iteration." },
      ],
    },
    stack: {
      title: "Moderne, gennemprøvet stack",
      logos: ["Next.js", "React", "Node.js", "Tailwind", "Vercel", "AWS", "Sanity", "Shopify"],
    },
    work: {
      title: "Udvalgte cases",
      cases: [
        {
          title: "Aurora — Livsstilsbutik",
          tag: "E-handel",
          cover: "/img/company/portfolio-1.jpg",
          points: ["Headless Shopify", "+28% konvertering", "TTFB −32%"],
        },
        {
          title: "Fjord CMS",
          tag: "Webudvikling",
          cover: "/img/company/portfolio-3.jpg",
          points: ["Next.js + Sanity", "Previews på sekunder", "ISR"],
        },
        {
          title: "Nordic Bank",
          tag: "Webdesign & UX",
          cover: "/img/company/portfolio-2.jpg",
          points: ["Designsystem", "Onboarding UX", "+18% NPS"],
        },
      ],
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "Hvor lang tid tager et projekt?", a: "Typiske marketingsites leveres på 3–6 uger. Større webapps: 6–12 uger+ afhængigt af scope." },
        { q: "Håndterer I SEO?", a: "Ja. Vi implementerer teknisk SEO, schema, sitemaps, meta, hastighed og tilgængelighed." },
        { q: "Hvilket CMS anbefaler I?", a: "Sanity for struktureret indhold og previews; vi arbejder også med Strapi, Contentful og WordPress (headless)." },
        { q: "Tilbyder I support?", a: "Ja. Vedligeholdelses-SLA’er, overvågning, performance og løbende forbedringer." },
      ],
    },
    cta: {
      title: "Har du et projekt i tankerne?",
      sub: "Fortæl os om mål og tidsplan—lad os bygge noget bemærkelsesværdigt.",
      button: "Tal med en specialist",
    },
  },
};

/* ───────────────────────── Page ───────────────────────── */
export default function WebDevServicesPage() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const t = COPY[locale] ?? COPY[DEFAULT_LOCALE];

  // reveal (kept for headings/sections only)
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("sr-show");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.08 }
    );
    root.querySelectorAll(".sr:not(.sr-show)").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [locale]);

  return (
    <main className="bg-white text-black" ref={rootRef}>
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={t.hero.image}
            alt=""
            className="h-full w-full object-cover opacity-[0.16] animate-kenburns"
          />
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(0,0,0,0.06),transparent_30%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16">
          <p className="sr opacity-0 translate-y-2 transition-all duration-700 text-[11px] uppercase tracking-[0.28em] text-gray-600">
            {t.hero.kicker}
          </p>
          <h1 className="sr opacity-0 translate-y-2 transition-all duration-700 delay-100 mt-2 max-w-4xl text-4xl md:text-5xl font-extrabold">
            {t.hero.title}
          </h1>
          <p className="sr opacity-0 translate-y-2 transition-all duration-700 delay-200 mt-4 max-w-3xl text-lg text-gray-700">
            {t.hero.sub}
          </p>
          <div className="sr opacity-0 translate-y-2 transition-all duration-700 delay-300 mt-7">
            <a
              href={withLocale(locale, "/contact")}
              className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-black/0 px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white transition"
            >
              {t.hero.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* TRUST */}
     <section className="relative border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.05),transparent_50%)]" />
  </div>

  <div className="relative mx-auto max-w-7xl px-6 py-16">
    {/* Section heading */}
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="sr opacity-0 translate-y-2 transition-all duration-700 text-3xl font-extrabold text-gray-900 tracking-tight">
        {t.trust.title}
      </h2>
      <p className="mt-3 text-gray-600 text-base">
        We combine design, engineering, and strategy to deliver websites that
        don’t just look great—but perform.
      </p>
    </div>

    {/* Cards */}
    <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {t.trust.bullets.map((b, i) => (
        <li
          key={b}
          className="sr opacity-0 translate-y-2 transition-all duration-700 rounded-2xl bg-white/80 backdrop-blur shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <div className="p-6 flex flex-col items-center text-center">
            {/* Icon circle */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-black to-gray-700 text-white shadow-md">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                />
              </svg>
            </div>

            {/* Text */}
            <p className="text-gray-800 font-medium">{b}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>


      {/* SERVICES GRID — Flip Cards */}
      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="sr opacity-0 translate-y-2 transition-all duration-700 text-2xl font-bold">
            {t.services.title}
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((s, i) => (
              <FlipCard
                key={s.title}
                title={s.title}
                desc={s.desc}
                bullets={s.bullets}
                icon={s.icon}
                delay={i * 70}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="sr opacity-0 translate-y-2 transition-all duration-700 text-2xl font-bold">
            {t.how.title}
          </h2>

          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {t.how.steps.map((st, i) => (
              <li
                key={st.label}
                className="sr opacity-0 translate-y-2 transition-all duration-700 rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.05)]"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-[2px] w-10 bg-gray-300" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{st.label}</h3>
                <p className="mt-2 text-gray-700">{st.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* STACK */}
      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="sr opacity-0 translate-y-2 transition-all duration-700 text-2xl font-bold">
            {t.stack.title}
          </h2>
          <div className="sr opacity-0 translate-y-2 transition-all duration-700 mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
            {t.stack.logos.map((l) => (
              <span
                key={l}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-800"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="sr opacity-0 translate-y-2 transition-all duration-700 text-2xl font-bold">
            {t.work.title}
          </h2>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.work.cases.map((c, i) => (
              <li
                key={c.title}
                className="sr opacity-0 translate-y-2 transition-all duration-700"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)] hover:shadow-md transition">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.cover}
                      alt={c.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs border border-gray-200">
                      {c.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.points.map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="sr opacity-0 translate-y-2 transition-all duration-700 text-2xl font-bold">
            {t.faq.title}
          </h2>

          <div className="mt-6 divide-y divide-gray-200 rounded-3xl border border-gray-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)]">
            {t.faq.items.map((f, i) => (
              <details
                key={f.q}
                className="group sr opacity-0 translate-y-2 transition-all duration-700 [&_summary::-webkit-details-marker]:hidden"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <summary className="cursor-pointer list-none px-5 py-4 hover:bg-gray-50 flex items-center justify-between">
                  <span className="font-medium">{f.q}</span>
                  <span className="ml-4 h-5 w-5 grid place-content-center rounded-full border border-gray-300 text-xs">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-0 text-gray-700">{f.a}</div>
                {i < t.faq.items.length - 1 && <div className="h-px bg-gray-200" />}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(0,0,0,0.06),transparent_60%)]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="sr opacity-0 translate-y-2 transition-all duration-700 rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
            <h3 className="text-2xl font-bold">{t.cta.title}</h3>
            <p className="mt-2 max-w-2xl text-gray-700">{t.cta.sub}</p>
            <div className="mt-6">
              <a
                href={withLocale(locale, "/contact")}
                className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-black/0 px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white transition"
              >
                {t.cta.button}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Local styles (reveal + kenburns) */}
      <style jsx>{`
        .sr { will-change: transform, opacity; opacity: 0; transform: translateY(8px); }
        .sr-show { opacity: 1 !important; transform: none !important; }

        @keyframes kenburns {
          0% { transform: scale(1) }
          100% { transform: scale(1.06) }
        }
        .animate-kenburns { animation: kenburns 24s ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .sr { transition: none !important; }
          .animate-kenburns { animation: none !important; }
        }
      `}</style>

      <Footer />
    </main>
  );
}

/* ───────────────────────── Flip Card component ───────────────────────── */
function FlipCard({ title, desc, bullets = [], icon = "app", delay = 0 }) {
  return (
    <div
      className="opacity-100 translate-y-0 transition-transform duration-700"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <article
        className="flip relative h-[260px] rounded-[22px] border border-gray-200 shadow-[0_1px_0_rgba(0,0,0,0.06)] hover:shadow-md focus-within:shadow-md"
        tabIndex={0}
        aria-label={title}
      >
        <div className="flip-inner h-full w-full">
          {/* FRONT — name + icon */}
          <div className="flip-face flip-front p-6">
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-gray-200 bg-white">
                <Icon type={icon} className="h-7 w-7 text-black" />
              </span>
              <h3 className="text-lg font-semibold text-black text-center">{title}</h3>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Hover</p>
            </div>
          </div>

          {/* BACK — details */}
          <div className="flip-face flip-back p-6">
            <div className="flex h-full flex-col justify-center">
              <h3 className="text-base font-semibold text-black">{title}</h3>
              <p className="mt-2 text-sm text-gray-700">{desc}</p>
              {bullets?.length > 0 && (
                <ul className="mt-3 grid gap-1.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-800">
                      <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-black/80" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Flip styles are scoped to this component */}
      <style jsx>{`
        .flip { perspective: 1000px; }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform .8s cubic-bezier(.2,.7,.2,1);
        }
        .flip:hover .flip-inner, .flip:focus-within .flip-inner {
          transform: rotateY(180deg);
        }
        .flip-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 1.25rem;
        }
        .flip-front {
          background: radial-gradient(120% 140% at 0% 0%, #fff 0%, #f7f7f7 50%, #f3f3f3 100%);
        }
        .flip-back {
          transform: rotateY(180deg);
          background: radial-gradient(120% 140% at 100% 100%, #fff 0%, #f7f7f7 50%, #efefef 100%);
        }
      `}</style>
    </div>
  );
}

/* ───────────────────────── Icons (mono) ───────────────────────── */
function Icon({ type, className = "" }) {
  switch (type) {
    case "app":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "site":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M3 9h18" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="7" cy="7" r="1" fill="currentColor" />
          <circle cx="10" cy="7" r="1" fill="currentColor" />
          <circle cx="13" cy="7" r="1" fill="currentColor" />
        </svg>
      );
    case "cms":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 6v12M16 6v12" stroke="currentColor" strokeWidth="1.7" />
          <path d="M4 10h16M4 14h16" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "cart":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H7" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="10" cy="20" r="1.6" fill="currentColor" />
          <circle cx="17" cy="20" r="1.6" fill="currentColor" />
        </svg>
      );
    case "api":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <path d="M8 12H4m16 0h-4M14 7l-4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "support":
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 15h8M8 11h8M8 7h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
  }
}

function ArrowRight({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
