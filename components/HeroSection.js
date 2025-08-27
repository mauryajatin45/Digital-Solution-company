"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Navigation, Autoplay, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/parallax";

/**
 * Inline bilingual translations (Danish default, English alternative)
 * Locale is taken from the first URL segment: /da or /en
 */

const SUPPORTED_LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "da";

const MESSAGES = {
  da: {
    bgAlt: "Settings Infotech IT-tjenester baggrund",
    hiddenH1: "Settings Infotech leverer IT-tjenester i hele verden",

    slides: [
      {
        id: "s1",
        titleLines: ["Rådgivning med", "vores professionelle udvikler"],
        desc:
          "Erfaring med en bred vifte af programmeringssprog og frameworks samt dokumenterede, skalerbare kvalitetsløsninger. Stærk i samarbejde, kodeoptimering og problemløsning.",
        ctas: [{ label: "Få gratis rådgivning", href: "/#contact" }],
        image: "/img/slid/5.webp",
      },
      {
        id: "s2",
        titleLines: ["Settings Infotech tilbyder", "IT-tjenester verden over"],
        desc: "Vi kan udvikle denne type platform.",
        ctas: [
          { label: "Vores ydelser", href: "/#services" },
          { label: "Book møde", href: "/#contact" },
        ],
        image: "/img/slid/5.webp",
      },
    ],

    prev: "Forrige slide",
    next: "Næste slide",
    inquiryRing: "Forespørgsel - Forespørgsel -",
    inquiryAria: "Send en forespørgsel",
  },

  en: {
    bgAlt: "Settings Infotech IT Services Background",
    hiddenH1: "Settings Infotech Provides World-Wide IT Services",

    slides: [
      {
        id: "s1",
        titleLines: ["Consult With", "Our Professional Developer"],
        desc:
          "Experience across multiple languages and frameworks with a proven record of scalable, high-quality solutions. Strong in collaboration, code optimization, and problem solving.",
        ctas: [{ label: "Get Free Consultant", href: "/#contact" }],
        image: "/img/slid/5.webp",
      },
      {
        id: "s2",
        titleLines: ["Settings Infotech Provide", "World Wide IT Services"],
        desc: "We are capable of developing this type of platform.",
        ctas: [
          { label: "Our service", href: "/#services" },
          { label: "Schedule Meeting", href: "/#contact" },
        ],
        image: "/img/slid/5.webp",
      },
    ],

    prev: "Previous slide",
    next: "Next slide",
    inquiryRing: "Inquiry - Inquiry -",
    inquiryAria: "Send an inquiry",
  },
};

/** Helpers to read/replace locale in path */
function getLocaleFromPath(pathname) {
  const first = pathname.split("/").filter(Boolean)[0];
  return SUPPORTED_LOCALES.includes(first) ? first : DEFAULT_LOCALE;
}
function replaceLocaleInPath(pathname, nextLocale) {
  const parts = pathname.split("/").filter(Boolean);
  if (SUPPORTED_LOCALES.includes(parts[0])) {
    parts[0] = nextLocale;
  } else {
    parts.unshift(nextLocale);
  }
  return "/" + parts.join("/");
}

export default function HeroSection() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const T = MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Build slides with locale-aware hrefs
  const SLIDES = useMemo(
    () =>
      T.slides.map((s) => ({
        ...s,
        ctas: s.ctas.map((c) => ({
          ...c,
          // ensure the current locale prefix is present in the URL
          href: replaceLocaleInPath(c.href.replace(/^\/?/, "/"), locale),
        })),
      })),
    [T, locale]
  );

  return (
    <header
      className="slider slider-prlx home-slider relative h-[100vh] overflow-hidden text-center"
      aria-label="Hero"
    >
      {/* Background cover image */}
      <Image
        src="/img/background.avif"
        alt={T.bgAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      {/* Slider layer */}
      <div className="pointer-events-none absolute inset-0">
        <Swiper
          modules={[Parallax, Navigation, Autoplay, A11y]}
          speed={800}
          parallax
          loop
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          onBeforeInit={(swiper) => {
            // attach custom buttons
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.prevEl = prevRef.current;
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          className="h-full"
        >
          {SLIDES.map((s) => (
            <SwiperSlide key={s.id} className="flex h-full w-full">
              <div className="relative z-[2] grid h-full w-full place-items-center">
                <div className="container mx-auto max-w-5xl px-6">
                  <div
                    className="caption pointer-events-auto mx-auto flex max-w-3xl flex-col items-center justify-center"
                    data-swiper-parallax="-80"
                  >
                    <h2 className="slider-big-text text-balance text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                      {/* render title with line breaks */}
                      <>
                        {s.titleLines[0]}
                        <br />
                        {s.titleLines[1]}
                      </>
                    </h2>
                    <p
                      className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg"
                      data-swiper-parallax="-120"
                    >
                      {s.desc}
                    </p>

                    <div
                      className="new-btn mt-7 flex flex-wrap items-center justify-center gap-3"
                      data-swiper-parallax="-160"
                    >
                      {s.ctas.map((cta) => (
                        <a
                          key={cta.label}
                          href={cta.href}
                          className="btn-curve btn-lit pointer-events-auto inline-flex items-center justify-center rounded-full border-2 border-white/90 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                        >
                          <span className="main-slider-btn-text">
                            {cta.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Per-slide vignette */}
              <div className="overlayCover absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom prev / next controls */}
      <div className="pointer-events-none absolute inset-0 z-[3]">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 sm:left-6">
          <button
            ref={prevRef}
            type="button"
            aria-label={T.prev}
            className="pointer-events-auto swiper-button-prev swiper-nav-ctrl custom-btn grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:h-12 sm:w-12"
          >
            <svg
              width="10"
              height="16"
              viewBox="0 0 320 512"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </button>
        </div>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 sm:right-6">
          <button
            ref={nextRef}
            type="button"
            aria-label={T.next}
            className="pointer-events-auto swiper-button-next swiper-nav-ctrl custom-btn grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:h-12 sm:w-12"
          >
            <svg
              width="10"
              height="16"
              viewBox="0 0 320 512"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l-192 192z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Circular Inquiry button */}
      <article className="pointer-events-none absolute bottom-7 left-1/2 z-[3] -translate-x-1/2 sm:bottom-10">
        <div className="pointer-events-auto">
          <div className="relative h-24 w-24 sm:h-28 sm:w-28">
            {/* Rotating text circle */}
            <svg
              className="textcircle absolute inset-0 animate-spin-slow"
              viewBox="0 0 500 500"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="textcircle"
                  d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
                />
              </defs>
              <text dx="50" className="fill-white text-[42px]">
                <textPath xlinkHref="#textcircle" textLength="900">
                  {T.inquiryRing}
                </textPath>
              </text>
            </svg>
            {/* Arrow button */}
            <a
              href={replaceLocaleInPath("/#contact", locale)}
              className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow hover:bg-white"
              aria-label={T.inquiryAria}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </article>

      {/* Visually hidden h1 (for a11y/SEO) */}
      <h1 className="sr-only">{T.hiddenH1}</h1>

      {/* Local styles for slow spin */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 14s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </header>
  );
}
