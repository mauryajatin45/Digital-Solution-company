// components/HeroSection.js
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Navigation, Autoplay, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/parallax";

/**
 * Parallax Hero Slider (matches your shared design)
 * - Full-bleed background image (cover)
 * - Center captions with two variants (like the reference)
 * - Prev/Next custom nav buttons
 * - Social icon rail
 * - Circular "Inquiry" button with rotating text path
 *
 * Color scheme: black / white / gray (consistent with the rest of the site)
 */

const SLIDES = [
  {
    id: "s1",
    title: (
      <>
        Consult With
        <br />
        Our Professional Developer
      </>
    ),
    desc:
      "Experience of working with a variety of programming languages and frameworks, and has a proven track record of providing scalable, high-quality solutions. Skilled in collaborative teamwork, code optimization, and issue solving.",
    ctas: [{ label: "Get Free Consultant", href: "#contact" }],
    // Use your existing asset. Duplicate for both slides if you only have /img/slid/5.webp
    image: "/img/slid/5.webp",
  },
  {
    id: "s2",
    title: (
      <>
        Settings Infotech Provide
        <br />
        World Wide IT Services
      </>
    ),
    desc: "We are capable of developing this type of platform.",
    ctas: [
      { label: "Our service", href: "#services" },
      { label: "Schedule Meeting", href: "#contact" },
    ],
    image: "/img/slid/5.webp",
  },
];
export default function HeroSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <header
      className="slider slider-prlx home-slider relative h-[90vh] overflow-hidden text-center"
      aria-label="Hero"
    >
      {/* Background cover image */}
      <Image
        src="/img/slid/5.webp"
        alt="Settings Infotech IT Services Background"
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
                      {s.title}
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
            aria-label="Previous slide"
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
            aria-label="Next slide"
            className="pointer-events-auto swiper-button-next swiper-nav-ctrl custom-btn grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:h-12 sm:w-12"
          >
            <svg
              width="10"
              height="16"
              viewBox="0 0 320 512"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Social icon rail (right) */}
      <div className="home-social-icon pointer-events-auto absolute right-3 top-1/2 z-[3] -translate-y-1/2 space-y-2 sm:right-6">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="icon grid h-9 w-9 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            title={s.title}
          >
            {s.icon}
          </a>
        ))}
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
                  Inquiry - Inquiry -
                </textPath>
              </text>
            </svg>
            {/* Arrow button */}
            <a
              href="#contact"
              className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow hover:bg-white"
              aria-label="Send an inquiry"
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
      <h1 className="sr-only">
        Settings Infotech Provide World Wide IT Services
      </h1>

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

/* ---------------- Social Icons ---------------- */

const SOCIALS = [
  {
    key: "facebook",
    label: "facebook",
    title: "Follow us on Facebook",
    href: "https://www.facebook.com/settingsinfotech/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" className="fill-white">
        <path d="M14 6h3a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-3a5 5 0 0 0-5 5v3H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2v7a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-7h2.22a1 1 0 0 0 1-.76l.5-2a1 1 0 0 0-1-1.24H13V7a1 1 0 0 1 1-1Z" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "linkedin",
    title: "Connect with us on LinkedIn",
    href: "https://www.linkedin.com/company/settings-infotech-company/",
    icon: (
      <svg width="20" height="20" viewBox="-2 -2 24 24" className="fill-white">
        <path d="M19.959 11.719v7.379h-4.278v-6.885c0-1.73-.619-2.91-2.167-2.91-1.182 0-1.886.796-2.195 1.565-.113.275-.142.658-.142 1.043v7.187h-4.28s.058-11.66 0-12.869h4.28v1.824l-.028.042h.028v-.042c.568-.875 1.583-2.126 3.856-2.126 2.815 0 4.926 1.84 4.926 5.792zM2.421.026C.958.026 0 .986 0 2.249c0 1.235.93 2.224 2.365 2.224h.028c1.493 0 2.42-.989 2.42-2.224C4.787.986 3.887.026 2.422.026zM.254 19.098h4.278V6.229H.254v12.869z" />
      </svg>
    ),
  },
  {
    key: "twitter",
    label: "twitter",
    title: "Follow us on Twitter",
    href: "https://twitter.com/SettingsInfotech",
    icon: (
      <svg width="22" height="22" viewBox="0 0 1668.6 1221.2" className="fill-white">
        <path d="m336.33 142.251 386.39 516.64-388.83 420.05h87.51l340.42-367.76 275.05 367.76h297.8l-408.13-545.7 361.92-390.99h-87.51l-313.51 338.7-253.31-338.7h-297.8zm128.69 64.46h136.81l604.13 807.76h-136.81l-604.13-807.76z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "instagram",
    title: "Follow us on Instagram",
    href: "https://www.instagram.com/settingsinfotech",
    icon: (
      <svg width="20" height="20" viewBox="-2 -2 24 24" className="fill-white">
        <path d="M14.017 0h-8.07A5.954 5.954 0 0 0 0 5.948v8.07a5.954 5.954 0 0 0 5.948 5.947h8.07a5.954 5.954 0 0 0 5.947-5.948v-8.07A5.954 5.954 0 0 0 14.017 0zm3.94 14.017a3.94 3.94 0 0 1-3.94 3.94h-8.07a3.94 3.94 0 0 1-3.939-3.94v-8.07a3.94 3.94 0 0 1 3.94-3.939h8.07a3.94 3.94 0 0 1 3.939 3.94v8.07z" />
        <path d="M9.982 4.819A5.17 5.17 0 0 0 4.82 9.982a5.17 5.17 0 0 0 5.163 5.164 5.17 5.17 0 0 0 5.164-5.164A5.17 5.17 0 0 0 9.982 4.82zm0 8.319a3.155 3.155 0 1 1 0-6.31 3.155 3.155 0 0 1 0 6.31z" />
        <circle cx="15.156" cy="4.858" r="1.237" />
      </svg>
    ),
  },
  {
    key: "behance",
    label: "behance",
    title: "View our work on Behance",
    href: "https://www.behance.net/settinginfotech",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" className="stroke-white" fill="none">
        <path d="M14 14h7v-.5a3.5 3.5 0 0 0-3.5-3.5h0a3.5 3.5 0 0 0-3.5 3.5v1a3.5 3.5 0 0 0 3.5 3.5 3.45 3.45 0 0 0 1.82-.52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 6h5M7 18H3v-6h4a3 3 0 0 1 3 3h0a3 3 0 0 1-3 3Zm2-9h0a3 3 0 0 0-3-3H3v6h3a3 3 0 0 0 3-3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "dribbble",
    label: "dribbble",
    title: "Check us out on Dribbble",
    href: "https://dribbble.com/SettingsInfotech",
    icon: (
      <svg width="20" height="20" viewBox="0 0 15 15" className="stroke-white" fill="none">
        <path d="M4.839 1.024c3.346 4.041 5.096 7.922 5.704 12.782M.533 6.82c5.985-.138 9.402-1.083 11.97-4.216M2.7 12.594c3.221-4.902 7.171-5.65 11.755-4.293M14.5 7.5a7 7 0 1 0-14 0 7 7 0 0 0 14 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "whatsapp",
    label: "whatsapp",
    title: "Chat with us on WhatsApp",
    href: "https://api.whatsapp.com/send?phone=+918469942899&text=Hi,%20Settings%20Infotech",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" className="fill-white">
        <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3-.6.6-.9 1.3-.9 2.1.1.9.4 1.8 1 2.6 1.1 1.6 2.5 2.9 4.2 3.7.5.2.9.4 1.4.5.5.2 1 .2 1.6.1.7-.1 1.3-.6 1.7-1.2.2-.4.2-.8.1-1.2l-.4-.2m2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 9.9-4.4 9.9-9.9.1-2.6-1-5.1-2.8-7m-2.7 14c-1.3.8-2.8 1.3-4.4 1.3-1.5 0-2.9-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3c-2.4-4-1.2-9 2.7-11.5S16.6 3.7 19 7.5c2.4 3.9 1.3 9-2.6 11.4" />
      </svg>
    ),
  },
  {
    key: "pinterest",
    label: "pinterest",
    title: "Follow our boards on Pinterest",
    href: "https://in.pinterest.com/settingsinfotech/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" className="fill-white">
        <path d="M10.2 2C5.8 2 3.5 4.8 3.5 7.9c0 1.5.8 3 2.1 3.8.4.2.3 0 .6-1.2 0-.1 0-.2-.1-.3C4.3 8 5.8 3.7 10 3.7c6.1 0 4.9 8.4 1.1 8.4-.8.1-1.5-.5-1.5-1.3v-.4c.4-1.1.7-2.1.8-3.2 0-2.1-3.1-1.8-3.1 1 0 .5.1 1 .3 1.4 0 0-1 4.1-1.2 4.8-.2 1.2-.1 2.4.1 3.5-.1.1 0 .1 0 .1h.1c.7-1 1.3-2 1.7-3.1.1-.5.6-2.3.6-2.3.5.7 1.4 1.1 2.3 1.1 3.1 0 5.3-2.7 5.3-6S13.7 2 10.2 2z" />
      </svg>
    ),
  },
  {
    key: "msteam",
    label: "msteam",
    title: "Join us on Microsoft Teams",
    href: "https://teams.live.com/l/invite/FEAY1AiApdeF4Q7qgg",
    icon: (
      <svg width="20" height="20" viewBox="0 0 32 32" className="fill-white">
        <circle cx="17" cy="6" r="4.667"></circle>
        <circle cx="27.5" cy="7.5" r="3.5"></circle>
        <path d="M30.5 12h-7.861a.64.64 0 0 0-.64.64v8.11a5.121 5.121 0 0 0 3.967 5.084A5.006 5.006 0 0 0 32 20.938V13.5a1.5 1.5 0 0 0-1.5-1.5z"></path>
        <path d="M25 13.5V23a7.995 7.995 0 0 1-14.92 4 7.173 7.173 0 0 1-.5-1 8.367 8.367 0 0 1-.33-1A8.24 8.24 0 0 1 9 23v-9.5a1.498 1.498 0 0 1 1.5-1.5h13a1.498 1.498 0 0 1 1.5 1.5z"></path>
        <rect x="0" y="8" width="15.5" height="16" rx="1.333"></rect>
        <text
          x="7.75"
          y="20"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="18"
          fill="#000"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
        >
          T
        </text>
      </svg>
    ),
  },
  {
    key: "goodFirms",
    label: "goodFirms",
    title: "See our reviews on GoodFirms",
    href: "https://www.goodfirms.co/company/setting-infotech",
    icon: (
      <svg width="15" height="15" viewBox="0 0 26 26" className="fill-white">
        <path d="M10.647 9.162s-1.485-.124-1.485 1.114v5.695h9.533v1.733s0 .867-.866.867H9.162V26h10.4s6.314-.99 6.314-7.429v-9.41H10.647zM25.752 0H6.933C.124 1.61 0 7.181 0 7.181V26h7.181V8.914c0-1.486 1.485-1.733 1.485-1.733h17.086V0z" />
      </svg>
    ),
  },
  {
    key: "clutch",
    label: "clutch",
    title: "Check our Clutch profile",
    href: "https://clutch.co/profile/settings-infotech",
    icon: (
      <svg viewBox="157.234 57.887 27.449 31.157" height="20" width="20" className="fill-white">
        <path d="M54.5-.5h26c14.788 3.563 27.788 10.563 39 21v3a608.768 608.768 0 0 1-21.5 20C83.937 29.978 67.77 26.811 49.5 34 33.45 43.807 27.283 57.973 31 76.5c7.1 20.644 21.6 29.811 43.5 27.5 9.277-2.053 17.11-6.553 23.5-13.5a635.383 635.383 0 0 0 21.5 21v2c-11.533 12.099-25.533 19.433-42 22h-20c-31.44-6.107-50.774-24.774-58-56v-26c7.116-29.45 25.45-47.45 55-54Z" transform="translate(157.328 57.993) scale(.22912)"></path>
        <path d="M64.5 43.5c15.313.481 23.646 8.315 25 23.5-2.728 18.707-13.394 26.04-32 22C42.913 80.61 39.413 68.776 47 53.5c4.67-5.579 10.502-8.912 17.5-10Z" transform="translate(157.328 57.993) scale(.22912)"></path>
      </svg>
    ),
  },
];
