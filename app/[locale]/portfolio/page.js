"use client";

import { useMemo, useState, useEffect, useRef } from "react";
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

/* ───────────────────────── Copy (da/en) ───────────────────────── */
const COPY = {
  en: {
    seoTitle: "Portfolio | Vertex Global",
    heroKicker: "Selected Work",
    heroTitle: "A portfolio of digital products we’ve shipped.",
    heroSub:
      "Real projects for real businesses — designed to be fast, accessible, and conversion-focused.",
    filtersLabel: "Filter by",
    filtersAll: "All",
    categories: ["Web Development", "Web Design & UX", "E-commerce", "Branding", "SEO"],
    capTitle: "Capabilities at a glance",
    capBullets: [
      "Design systems & component libraries",
      "High-performance headless builds",
      "A/B testing and growth experiments",
      "Technical SEO & content architecture",
      "Hosting, monitoring & SLA support",
    ],
    ctaTitle: "Have a project in mind?",
    ctaSub:
      "Let’s turn your idea into a high-performing product. Tell us a bit about your goals and timelines.",
    ctaButton: "Start Your Project",
    modalClose: "Close",
    loadMore: "Load more",
    empty: "No projects match this filter yet.",
  },
  da: {
    seoTitle: "Portefølje | Vertex Global",
    heroKicker: "Udvalgte cases",
    heroTitle: "En portefølje af digitale produkter vi har leveret.",
    heroSub:
      "Rigtige projekter til rigtige virksomheder — designet til hastighed, tilgængelighed og konvertering.",
    filtersLabel: "Filtrér efter",
    filtersAll: "Alle",
    categories: ["Webudvikling", "Webdesign & UX", "E-handel", "Branding", "SEO"],
    capTitle: "Kompetencer i korte træk",
    capBullets: [
      "Designsystemer & komponentbiblioteker",
      "Højtydende headless-løsninger",
      "A/B-tests og vækst-eksperimenter",
      "Teknisk SEO & content-arkitektur",
      "Hosting, overvågning & SLA-support",
    ],
    ctaTitle: "Har du et projekt i tankerne?",
    ctaSub:
      "Lad os omsætte idéen til et højtydende produkt. Fortæl os om mål og tidsplan.",
    ctaButton: "Start dit projekt",
    modalClose: "Luk",
    loadMore: "Hent flere",
    empty: "Ingen projekter matcher dette filter endnu.",
  },
};

/* ───────────────────────── Demo data ───────────────────────── */
const ALL_PROJECTS = [
  {
    id: "aurora-shop",
    title: { en: "Aurora — Lifestyle Store", da: "Aurora — Livsstilsbutik" },
    category: { en: "E-commerce", da: "E-handel" },
    year: "2024",
    cover:
      "https://shivaurica.com/wp-content/uploads/2025/07/ChatGPT-Image-Jul-15-2025-12_29_21-PM.png",
    summary: {
      en: "Headless storefront with Shopify + Next.js, optimized for 90+ Lighthouse scores.",
      da: "Headless webshop med Shopify + Next.js, optimeret til 90+ Lighthouse-score.",
    },
    metrics: ["+28% CR", "-32% TTFB", "A11y AA"],
    tags: ["Next.js", "Shopify", "Vercel"],
  },
  {
    id: "nordic-bank",
    title: { en: "Nordic Bank", da: "Nordic Bank" },
    category: { en: "Web Design & UX", da: "Webdesign & UX" },
    year: "2023",
    cover: "/img/portfolio/NordicBank.png",
    summary: {
      en: "Design system & UX flows for consumer banking — simplified onboarding.",
      da: "Designsystem & UX-flows til privatbank — simplificeret onboarding.",
    },
    metrics: ["-41% drop-off", "+18% NPS"],
    tags: ["Design System", "Figma", "UX Research"],
  },
  {
    id: "fjord-cms",
    title: { en: "Fjord CMS", da: "Fjord CMS" },
    category: { en: "Web Development", da: "Webudvikling" },
    year: "2024",
    cover: "/img/portfolio/cms.png",
    summary: {
      en: "Custom CMS with Next.js & Sanity — instant previews & role-based workflows.",
      da: "Skræddersyet CMS med Next.js & Sanity — live previews og rollebaserede workflows.",
    },
    metrics: ["<200ms FCP", "ISR"],
    tags: ["Next.js", "Sanity", "Tailwind"],
  },
  {
    id: "seaplane",
    title: { en: "Seaplane Analytics", da: "Seaplane Analytics" },
    category: { en: "SEO", da: "SEO" },
    year: "2023",
    cover:
      "https://www.thebrainyinsights.com/upload/seaplanes-market.jpg",
    summary: {
      en: "Technical SEO, content clustering and schema — traffic up and to the right.",
      da: "Teknisk SEO, content-klynger og schema — markant trafikstigning.",
    },
    metrics: ["+124% organic", "+36% CTR"],
    tags: ["SEO", "Schema", "Content"],
  },
  {
    id: "haven-hosting",
    title: { en: "Haven Hosting", da: "Haven Hosting" },
    category: { en: "Branding", da: "Branding" },
    year: "2022",
    cover:
      "https://hosting-haven-cdn.sfo3.cdn.digitaloceanspaces.com/graphics/banner.png",
    summary: {
      en: "Brand identity, tone of voice and marketing site for managed hosting.",
      da: "Visuel identitet, tone-of-voice og website til managed hosting.",
    },
    metrics: ["New brand", "Design system"],
    tags: ["Brand", "Marketing Site"],
  },
  {
    id: "atlas-care",
    title: { en: "Atlas Care", da: "Atlas Care" },
    category: { en: "Hosting", da: "Hosting" },
    year: "2024",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFs_6ARsOhEY53vxRWFYRWBz-uEzWbteguXw&s",
    summary: {
      en: "High-availability deployment on Vercel & Cloudflare with observability.",
      da: "High-availability deployment på Vercel & Cloudflare med observability.",
    },
    metrics: ["99.98% uptime", "Global CDN"],
    tags: ["Vercel", "Cloudflare", "SRE"],
  },
];

/* ───────────────────────── Page ───────────────────────── */
export default function PortfolioPage() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const t = COPY[locale] ?? COPY[DEFAULT_LOCALE];

  const [active, setActive] = useState(t.filtersAll);
  const [visible, setVisible] = useState(6);
  const [open, setOpen] = useState(null);

  const categories = useMemo(() => [t.filtersAll, ...t.categories], [locale]);

  const filtered = useMemo(() => {
    if (active === t.filtersAll) return ALL_PROJECTS;
    return ALL_PROJECTS.filter(
      (p) => (p.category[locale] || p.category[DEFAULT_LOCALE]) === active
    );
  }, [active, locale, t.filtersAll]);

  const showing = filtered.slice(0, visible);

  // scroll-reveal
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("sr-show");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    root.querySelectorAll(".sr:not(.sr-show)").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [active, visible, locale]);

  return (
    <main
      className="bg-gradient-to-b from-gray-50 via-white to-white min-h-screen"
      ref={rootRef}
    >
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-20%,rgba(0,0,0,0.08),transparent_60%)]"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-6">
          <p className="sr opacity-0 translate-y-2 transition-all duration-700 text-xs uppercase tracking-[0.25em] font-semibold text-gray-600">
            {t.heroKicker}
          </p>
          <h1 className="sr opacity-0 translate-y-2 transition-all duration-700 delay-100 max-w-3xl text-4xl md:text-5xl font-extrabold text-black">
            {t.heroTitle}
          </h1>
          <p className="sr opacity-0 translate-y-2 transition-all duration-700 delay-200 mt-3 max-w-3xl text-lg text-gray-600">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* CENTERED FILTERS + gooey blobs */}
      <section className="relative mx-auto max-w-7xl px-6">
        {/* gooey backdrop */}
        <svg className="absolute -z-10" width="0" height="0" aria-hidden>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        <div className="relative my-8 flex items-center justify-center">
          {/* animated blobs */}
          <div
            className="absolute inset-x-0 -top-6 mx-auto h-16 w-[380px] max-w-full blur-sm"
            style={{ filter: "url(#goo)" }}
            aria-hidden
          >
            <span className="absolute left-10 top-2 h-8 w-8 rounded-full bg-black/10 animate-blob" />
            <span className="absolute left-24 top-6 h-7 w-7 rounded-full bg-black/10 animate-blob animation-delay-2000" />
            <span className="absolute left-40 top-3 h-9 w-9 rounded-full bg-black/10 animate-blob animation-delay-4000" />
            <span className="absolute right-10 top-4 h-6 w-6 rounded-full bg-black/10 animate-blob" />
          </div>

          <div className="flex w-full flex-col items-center gap-3 border-y border-gray-200 py-5">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
              {t.filtersLabel}
            </span>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActive(cat);
                    setVisible(6);
                  }}
                  className={[
                    "sr opacity-0 translate-y-2 transition-all duration-700",
                    "rounded-full border px-3.5 py-1.5 text-sm backdrop-blur",
                    active === cat
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white/80 text-gray-800 hover:border-gray-300",
                  ].join(" ")}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {showing.length === 0 ? (
          <p className="py-16 text-center text-gray-500">{t.empty}</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showing.map((p, i) => {
              const title = p.title[locale] || p.title[DEFAULT_LOCALE];
              const cat = p.category[locale] || p.category[DEFAULT_LOCALE];
              const summary = p.summary[locale] || p.summary[DEFAULT_LOCALE];
              return (
                <li
                  key={p.id}
                  className="sr opacity-0 translate-y-3 transition-all duration-700"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <article
                    className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => setOpen(p.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setOpen(p.id)}
                    aria-label={title}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.cover}
                        alt={title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                      <div className="pointer-events-none absolute bottom-0 left-0 p-4 opacity-0 transition group-hover:opacity-100">
                        <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-900">
                          {cat}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-black">{title}</h3>
                        <span className="text-sm text-gray-500">{p.year}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-gray-600">{summary}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.metrics?.map((m) => (
                          <span
                            key={m}
                            className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        {/* Load more */}
        {visible < filtered.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisible((v) => v + 6)}
              className="rounded-full border-2 border-black bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-900"
            >
              {t.loadMore}
            </button>
          </div>
        )}
      </section>

      {/* CAPABILITIES — moved UNDER projects and restyled */}
      <section className="mx-auto max-w-7xl px-6 pb-12 -mt-2">
        <div className="sr opacity-0 translate-y-2 transition-all duration-700 relative overflow-hidden rounded-3xl border border-gray-200 bg-white">
          {/* soft pattern + glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.6]"
            style={{
              background:
                "radial-gradient(1200px 400px at 20% -200px, rgba(0,0,0,0.06), transparent 60%), radial-gradient(1200px 400px at 80% 120%, rgba(0,0,0,0.06), transparent 60%)",
            }}
            aria-hidden
          />
          <div className="relative p-7 md:p-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h3 className="text-xl md:text-2xl font-bold text-black">
                {t.capTitle}
              </h3>
              <div className="hidden md:block rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs text-black/70">
                Vertex Global • Design • Build • Grow
              </div>
            </div>

            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {t.capBullets.map((b, i) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-black text-white">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-gray-700">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CASE MODAL */}
      <CaseModal openId={open} onClose={() => setOpen(null)} locale={locale} t={t} />

      {/* CTA */}
      <section className="border-t border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-black md:text-3xl">{t.ctaTitle}</h2>
              <p className="mt-2 max-w-2xl text-gray-700">{t.ctaSub}</p>
              <div className="mt-6">
                <a
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-900"
                >
                  {t.ctaButton}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local styles: scroll-reveal + gooey + blobs */}
      <style jsx>{`
        /* scroll reveal */
        .sr { will-change: transform, opacity; }
        .sr-show { opacity: 1 !important; transform: none !important; }

        /* gooey blob motion */
        @keyframes blob {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(12px, 4px) scale(1.1); }
          66%  { transform: translate(-6px, -8px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @media (prefers-reduced-motion: reduce) {
          .sr, .animate-blob { animation: none !important; transition: none !important; }
        }
      `}</style>

      <Footer />
    </main>
  );
}

/* ───────────────────────── Modal Component ───────────────────────── */
function CaseModal({ openId, onClose, locale, t }) {
  if (!openId) return null;
  const p = ALL_PROJECTS.find((x) => x.id === openId);
  if (!p) return null;
  const title = p.title[locale] || p.title[DEFAULT_LOCALE];
  const summary = p.summary[locale] || p.summary[DEFAULT_LOCALE];
  const cat = p.category[locale] || p.category[DEFAULT_LOCALE];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/50 p-0 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-t-3xl md:rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white"
          aria-label={t.modalClose}
        >
          {t.modalClose}
        </button>

        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.cover} alt={title} className="h-full w-full object-cover" />
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="mb-2">
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                {cat}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-black">{title}</h3>
            <p className="mt-2 text-gray-700">{summary}</p>
          </div>
          <aside className="rounded-2xl border border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-800">Stack</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h4 className="mt-4 text-sm font-semibold text-gray-800">Highlights</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {p.metrics?.map((m) => (
                <li key={m} className="rounded-full bg-black px-2.5 py-1 text-xs font-medium text-white">
                  {m}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Icons ───────────────────────── */
function ArrowRight({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
