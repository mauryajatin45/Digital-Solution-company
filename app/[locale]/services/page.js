// app/[locale]/services/page.js
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceSection from "@/app/[locale]/services/ServiceSection";

// ⬇️ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

/* ───────────────────────── Locale helpers ───────────────────────── */
const LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "en";
const getLocaleFromPath = (pathname = "/") => {
  const first = pathname.split("/").filter(Boolean)[0];
  return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
};
const withLocale = (locale, path) =>
  `/${locale}${path.startsWith("/") ? path : `/${path}`}`;

/* ───────────────────────── Copy: Hero + Logos ───────────────────────── */
const HERO = {
  en: {
    titleTop: "Professionally Tailored",
    highlight: "Services",
    titleBottom: "for All Your Technical Needs",
    sub:
      "Unlock Your Business Potential with Our Tailored Expert Services. Explore our Comprehensive Solutions, including UI/UX Designing and Development Services. Contact Us Today!",
    clientsTitle: "Our Valuable Clients",
    cta: "Talk to us",
    logos: [
      { src: "https://aavatto.com/wp-content/uploads/2023/07/xpand-3-1.png", alt: "Sheetal" },
      { src: "https://aavatto.com/wp-content/uploads/2023/07/MRJ-logo.svg", alt: "Sabahoo" },
      { src: "https://aavatto.com/wp-content/uploads/2024/03/scplco.svg", alt: "Studio Paperheads" },
      { src: "https://aavatto.com/wp-content/uploads/2024/11/sabahoo-logo.svg", alt: "Hoopsters" },
      { src: "https://aavatto.com/wp-content/uploads/2024/12/studio-paperhead.svg", alt: "Paperchase" },
      { src: "https://aavatto.com/wp-content/uploads/2024/12/hoopster.svg", alt: "Paperchase" },
      { src: "https://aavatto.com/wp-content/uploads/2024/12/paperchse.svg", alt: "Paperchase" },
    ],
  },
  da: {
    titleTop: "Professionelt skræddersyede",
    highlight: "Services",
    titleBottom: "til alle dine tekniske behov",
    sub:
      "Frigør dit forretningspotentiale med skræddersyede ekspertservices. Udforsk komplette løsninger—inkl. UI/UX og udvikling. Kontakt os i dag!",
    clientsTitle: "Vores værdifulde kunder",
    cta: "Tal med os",
    logos: [
      { src: "/logos/sheetal.svg", alt: "Sheetal" },
      { src: "/logos/sabahoo.svg", alt: "Sabahoo" },
      { src: "/logos/paperheads.svg", alt: "Studio Paperheads" },
      { src: "/logos/hoopsters.svg", alt: "Hoopsters" },
      { src: "/logos/paperchase.svg", alt: "Paperchase" },
    ],
  },
};

/* ───────────────────────── Copy: Services (6) ───────────────────────── */
const SERVICES = {
  en: [
    {
      slug: "web-development",
      title: "Web development",
      description:
        "Modern, component-driven development with clean architecture and test coverage. We build fast, accessible, and scalable apps on a future-proof stack.",
      points: [
        "Next.js/React front-ends & Node APIs",
        "Headless architecture & real-time previews",
        "TypeScript, testing & CI/CD pipelines",
      ],
      image: "https://aavatto.com/wp-content/uploads/2023/07/front-end-development.png",
      imageAlt: "Building modern web apps",
    },
    {
      slug: "web-design-ux",
      title: "Web design & UX",
      description:
        "Research-led design that balances brand and conversion. We craft accessible interfaces and content models that scale with your business.",
      points: [
        "User flows, wireframes & rapid prototypes",
        "Design systems & responsive UI",
        "Accessibility (WCAG) baked in",
      ],
      image: "https://aavatto.com/wp-content/uploads/2023/07/ui-ux-designing.png",
      imageAlt: "Interface design and UX flows",
    },
    {
      slug: "ecommerce",
      title: "E-commerce solutions",
      description:
        "Headless storefronts with performance and conversion at the core. Flexible content, robust integrations, and analytics that matter.",
      points: [
        "Shopify / WooCommerce headless setups",
        "Checkout & subscription flows",
        "Payments, CRM & ERP integrations",
      ],
      image: "https://aavatto.com/wp-content/uploads/2023/07/e-commerce-development.png",
      imageAlt: "E-commerce storefront",
    },
    {
      slug: "hosting",
      title: "Hosting",
      description:
        "Fully managed cloud hosting with automated deployments, monitoring, and backups. We keep your site fast, secure, and online.",
      points: [
        "Vercel/AWS infrastructure & CDN",
        "Autoscaling, SSL & edge caching",
        "Observability: logs, metrics & alerts",
      ],
      image: "https://aavatto.com/wp-content/uploads/2023/07/backend-development.png",
      imageAlt: "Cloud hosting and infrastructure",
    },
    {
      slug: "maintenance-support",
      title: "Maintenance & support",
      description:
        "Proactive care plans with updates, fixes, enhancements and a dedicated roadmap so your product keeps getting better.",
      points: [
        "SLAs and on-call support",
        "Security updates & dependency care",
        "Quarterly performance & UX improvements",
      ],
      image: "https://aavatto.com/wp-content/uploads/2023/07/quality-assurance-1.png",
      imageAlt: "Ongoing support and improvements",
    },
    {
      slug: "seo",
      title: "SEO optimization",
      description:
        "Technical SEO foundations plus content structure that helps you rank — and a speed budget to keep pages lightning fast.",
      points: [
        "Core Web Vitals & schema markup",
        "Sitemaps, redirects & meta automation",
        "Keyword-ready content models",
      ],
      image: "https://aavatto.com/wp-content/uploads/2023/07/wordpress-development.png",
      imageAlt: "Analytics and SEO graph",
    },
  ],
  da: [
    {
      slug: "web-development",
      title: "Webudvikling",
      description:
        "Moderne, komponent-drevet udvikling med ren arkitektur og tests. Vi bygger hurtige, tilgængelige og skalerbare apps på en fremtidssikret stack.",
      points: [
        "Next.js/React frontends & Node-API’er",
        "Headless arkitektur & realtime previews",
        "TypeScript, tests & CI/CD-pipeliner",
      ],
      image: "https://aavatto.com/wp-content/uploads/2023/07/front-end-development.png",
      imageAlt: "Udvikling af moderne webapps",
    },
    {
      slug: "web-design-ux",
      title: "Webdesign & UX",
      description:
        "Research-drevet design med balance mellem brand og konvertering. Vi skaber tilgængelige interfaces og indholdsmodeller, der skalerer.",
      points: [
        "User flows, wireframes & hurtige prototyper",
        "Designsystemer & responsivt UI",
        "Tilgængelighed (WCAG) fra start",
      ],
      image: "https://aavatto.com/wp-content/uploads/2023/07/ui-ux-designing.png",
      imageAlt: "Interface-design og UX-flows",
    },
    {
      slug: "ecommerce",
      title: "E-handelsløsninger",
      description:
        "Headless storefronts med performance og konvertering i centrum. Fleksibelt indhold, stærke integrationer og relevante analyser.",
      points: [
        "Shopify / WooCommerce i headless-opsætning",
        "Checkout- og abonnementsflows",
        "Betaling, CRM & ERP-integrationer",
      ],
      image: "https://aavatto.com/wp-content/uploads/2023/07/e-commerce-development.png",
      imageAlt: "Headless e-handel",
    },
    {
      slug: "hosting",
      title: "Hosting",
      description:
        "Fuldt administreret cloud-hosting med automatiske deploys, overvågning og backups. Vi holder dit site hurtigt, sikkert og online.",
      points: [
        "Vercel/AWS infrastruktur & CDN’er",
        "Autoskalering, SSL & edge-caching",
        "Observability: logs, metrics & alarmer",
      ],
      image: "https://aavatto.com/wp-content/uploads/2023/07/backend-development.png",
      imageAlt: "Cloud-hosting og infrastruktur",
    },
    {
      slug: "maintenance-support",
      title: "Vedligehold & support",
      description:
        "Proaktive serviceaftaler med opdateringer, rettelser, forbedringer og en roadmap, så produktet hele tiden bliver bedre.",
      points: [
        "SLA’er og tilkald",
        "Sikkerhedsopdateringer & afhængigheder",
        "Kvartalsvise performance- og UX-forbedringer",
      ],
      image: "https://aavatto.com/wp-content/uploads/2023/07/quality-assurance-1.png",
      imageAlt: "Løbende support og forbedringer",
    },
    {
      slug: "seo",
      title: "SEO-optimering",
      description:
        "Teknisk SEO-fundament og indholdsstruktur der kan rangere — plus hastighedsbudget, så siderne forbliver lynhurtige.",
      points: [
        "Core Web Vitals & schema-markup",
        "Sitemaps, redirects & meta-automatisering",
        "Keyword-klare indholdsmodeller",
      ],
      image: "https://aavatto.com/wp-content/uploads/2023/07/wordpress-development.png",
      imageAlt: "Analyse og SEO-graf",
    },
  ],
};

/* ───────────────────────── Page ───────────────────────── */
export default function ServicesPage() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const hero = HERO[locale] ?? HERO[DEFAULT_LOCALE];
  const sections = SERVICES[locale] ?? SERVICES[DEFAULT_LOCALE];

  // scroll-reveal used in hero
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("sr-show");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    root.querySelectorAll(".sr").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [locale]);

  // respect reduced motion by disabling Swiper autoplay
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <main ref={rootRef} className="bg-white text-black">
      <Header />

      {/* HERO (with underline highlight) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.04),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-12 text-center">
          <h1 className="sr opacity-0 translate-y-2 transition-all duration-700 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="block">
              {hero.titleTop}{" "}
              <mark className="relative px-2 rounded-none bg-transparent">
                <span className="relative z-10">{hero.highlight}</span>
                <span className="absolute left-0 right-0 bottom-[.18em] h-[0.38em] bg-[#FFD9C0] -z-0"></span>
              </mark>{" "}
              for
            </span>
            <span className="block mt-3">{hero.titleBottom}</span>
          </h1>

          <p className="sr opacity-0 translate-y-2 transition-all duration-700 delay-100 mt-6 mx-auto max-w-3xl text-lg text-gray-700">
            {hero.sub}
          </p>

          <div className="sr opacity-0 translate-y-2 transition-all duration-700 delay-200 mt-8">
            <a
              href={withLocale(locale, "/contact")}
              className="inline-flex items-center gap-2 rounded-full border-2 border-black px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white transition"
            >
              {hero.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CLIENTS SWIPER */}
      <section className="relative border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h5 className="text-center text-sm font-medium tracking-wide text-gray-700">
            {hero.clientsTitle}
          </h5>

          <div className="mt-8 relative">
            <Swiper
              modules={[Autoplay]}
              loop
              speed={4000}
              allowTouchMove={true}
              slidesPerView={3}
              spaceBetween={40}
              autoplay={
                prefersReduced
                  ? false
                  : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }
              }
              breakpoints={{
                640: { slidesPerView: 4, spaceBetween: 40 },
                1024: { slidesPerView: 6, spaceBetween: 48 },
              }}
              className="clients-swiper"
            >
              {hero.logos.map((logo, i) => (
                <SwiperSlide key={`${logo.alt}-${i}`} className="flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-10 sm:h-12 object-contain opacity-80 hover:opacity-100 transition"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* SERVICE SECTIONS (uses your ServiceSection.js) */}
      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-14 space-y-16 md:space-y-24">
          {sections.map((s, idx) => (
            <ServiceSection
              key={s.slug}
              title={s.title}
              description={s.description}
              points={s.points}
              image={s.image}
              imageAlt={s.imageAlt}
              imageSide={idx % 2 === 0 ? "right" : "left"} // alternate
              textSide={idx % 2 === 0 ? "left" : "right"}
              ctaLabel={locale === "da" ? "Læs mere" : "Learn more"}
              ctaHref={withLocale(locale, `/services/${s.slug}`)}
            />
          ))}
        </div>
      </section>

      <Footer />

      {/* Local styles */}
      <style jsx>{`
        .sr { opacity: 0; transform: translateY(8px); }
        .sr-show { opacity: 1 !important; transform: none !important; }

        /* Smooth, linear motion for Swiper when autoplaying */
        :global(.clients-swiper .swiper-wrapper) {
          transition-timing-function: linear;
        }

        @media (prefers-reduced-motion: reduce) {
          .sr { transition: none !important; }
        }
      `}</style>
    </main>
  );
}

/* ───────────────────────── UI parts ───────────────────────── */
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
