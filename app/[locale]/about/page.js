"use client";


import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";
import ResultsSection from "@/components/ResultsSection";
import HowWeWork from "@/components/HowWeWork";

/* ───────────────────────── Locale helpers ───────────────────────── */
const LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "da";
const getLocaleFromPath = (pathname = "/") => {
    const first = pathname.split("/").filter(Boolean)[0];
    return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
};
const withLocale = (locale, path) =>
    `/${locale}${path.startsWith("/") ? path : `/${path}`}`;

/* ───────────────────────── Copy ───────────────────────── */
const T = {
    en: {
        hero: {
            titleTop: "An Agency built to",
            titleBottom: "create real value",
            sub:
                "Denmark Web is a growth partner—nimble, hungry, and results-driven. We execute with purpose and focus on measurable outcomes.",
            cta: "Check Out Our Work",
            image:
                "https://www.ruckusmarketing.com/wp-content/uploads/2020/03/about-us-hero@3x.jpg",
        },
        bubbles: { one: "01", two: "02", three: "03" },
    },
    da: {
        hero: {
            titleTop: "Et bureau skabt til",
            titleBottom: "at skabe reel værdi",
            sub:
                "Denmark Web er din vækstpartner—hurtig, nysgerrig og resultatorienteret. Vi eksekverer med mål og fokus på målbare resultater.",
            cta: "Se vores arbejde",
            image:
                "https://www.ruckusmarketing.com/wp-content/uploads/2020/03/about-us-hero@3x.jpg",
        },
        bubbles: { one: "01", two: "02", three: "03" },
    },
};

/* ───────────────────────── Page ───────────────────────── */
export default function AboutPage() {
    const pathname = usePathname() || "/";
    const locale = getLocaleFromPath(pathname);
    const t = T[locale] ?? T[DEFAULT_LOCALE];

    return (
        <main className="bg-black text-white">
            <Header />

            {/* HERO */}
            <section className="relative overflow-hidden">
                {/* Background image with overlay + subtle motion */}
                <div className="absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={t.hero.image}
                        alt=""
                        className="h-full w-full object-cover will-change-transform animate-kenburns"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-24">
                    <h1 className="text-balance font-extrabold tracking-tight">
                        <span className="block text-3xl sm:text-4xl md:text-5xl mt-14 opacity-90 animate-fade-up">
                            {t.hero.titleTop}
                        </span>
                        <span className="block text-4xl sm:text-5xl md:text-6xl mt-2 animate-fade-up delay-100">
                            <strong className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                                {t.hero.titleBottom}
                            </strong>
                        </span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg md:text-xl text-white/80 animate-fade-up delay-200">
                        {t.hero.sub}
                    </p>

                    <div className="mt-8 animate-fade-up delay-300">
                        <a
                            href={withLocale(locale, "/portfolio")}
                            className="inline-flex items-center gap-3 rounded-full border-2 border-white/90 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
                        >
                            {t.hero.cta}
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* MANTRA — EXPERTLY · CRAFTED · DISRUPTION */}
            <MantraBlock locale={locale} caption={t.mantraCaption} bubbles={t.bubbles} />

            <TeamSection />
            <HowWeWork/>
            <ResultsSection />
            <Footer />


            {/* Local styles */}
            <style jsx>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp .8s ease both; }
        .delay-100 { animation-delay: .1s; }
        .delay-200 { animation-delay: .2s; }
        .delay-300 { animation-delay: .3s; }

        @keyframes kenburns {
          0% { transform: scale(1) translate3d(0,0,0); }
          100% { transform: scale(1.08) translate3d(0,0,0); }
        }
        .animate-kenburns { animation: kenburns 18s ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up, .animate-kenburns { animation: none !important; }
        }
      `}</style>
        </main>
    );
}

/* ───────────────────────── Mantra Block ───────────────────────── */
function MantraBlock({ caption, bubbles }) {
    // orange brand for this section
    const ORANGE = "#000000";

    return (
        <section className="relative bg-white text-[${ORANGE}]">
            <div className="mx-auto max-w-[1200px] px-6 py-24 text-black">
                <div className="relative">


                    {/* Left caption + rule aligned to CRAFTED */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-6">
                        <p className="w-64 text-right text-xl leading-snug text-neutral-800">{caption}</p>
                        <span className="h-[2px] w-20 bg-[${ORANGE}] block" />
                    </div>

                    {/* EXPERTLY */}
                    <h2
                        className="text-[clamp(44px,7vw,104px)] tracking-[0.06em] font-light text-[${ORANGE}]"
                        style={{ color: ORANGE }}
                    >
                        EXPERTLY
                    </h2>

                    {/* CRAFTED — outlined with grid svg */}
                    <div className="relative mt-3">
                        <CraftedSVG color={ORANGE} />

                    </div>

                    {/* DISRUPTION */}
                    <div className="relative mt-6">
                        <h3
                            className="text-[clamp(54px,8.4vw,128px)] font-extrabold tracking-wider leading-none text-[${ORANGE}]"
                            style={{ color: ORANGE }}
                        >
                            DISRUPTION
                        </h3>

                    </div>
                </div>
            </div>
        </section>
    );
}

function CraftedSVG({ color = "#f5831f" }) {
    // Cleaned and sized to look like the reference; scales responsively.
    return (
        <svg
            viewBox="0 0 552.6 158"
            className="w-full h-auto"
            aria-label="CRAFTED word with construction grid"
        >
            <style>{`
        .st1{fill:none;stroke:${color};stroke-width:2}
        .st2{fill:${color}}
        .st3{opacity:.495}
        .st4{fill:#d0d0d0}
        .st5{opacity:.668}
      `}</style>
            {/* Grid + letters from your reference */}
            <path className="st1" d="M112.8 112.2c-4.6 2.4-10.7 4.5-19 4.5-13.5 0-21.6-4.6-28.1-10.7-8.8-8.5-12.2-18-12.2-29.3 0-13.9 5.8-23.9 12.3-30 7.7-7.2 17.3-10.1 28.2-10.1 5.4 0 11.8.9 18.9 4.7v17.5c-7-8.1-15.8-8.6-18.5-8.6C79 50.2 69 62.9 69 77c0 17 13.1 26.2 26 26.2 7.1 0 13.5-3.1 17.9-8.4v17.4zM151.7 38.3c10.6 0 16 2.8 19.6 5.8 5.9 4.9 7.6 11.5 7.6 17.2 0 7.5-3 14-9 18.1-2 1.4-4.7 2.6-8.4 3.3l23.9 32.3h-18.6l-20.5-30.8h-1.8V115h-15V38.3h22.2zm-7.2 35.3h4.3c2.9 0 14.7-.3 14.7-11.6 0-11.4-11.7-11.5-14.5-11.5h-4.5v23.1zM243.8 98.9h-30.9l-6.8 16.1h-16.2l33-76.7h11.7l32.1 76.7h-16.1l-6.8-16.1zm-4.3-12.2l-10.9-27.6-10.9 27.6h21.8zM319.3 51.2h-25.8v17.1h24.2v12.9h-24.2V115h-15V38.3h40.7v12.9zM359.2 51.2V115h-15V51.2H327V38.3h49.5v12.9h-17.3zM431.3 51.2h-27.6v17.1h26.5v12.9h-26.5v20.9h27.6V115h-42.6V38.3h42.6v12.9zM468.6 38.3c10.7 0 20 1.2 28.5 7.5 9.3 7 14.7 18.2 14.7 30.9s-5.3 23.8-15.4 30.9c-9 6.3-17.4 7.4-28.1 7.4h-19.8V38.3h20.1zm-5 63.8h4.6c3.8 0 12.1-.2 18.7-5.1 6.1-4.4 9.5-12.2 9.5-20.4 0-8.1-3.3-15.9-9.4-20.5-6.2-4.6-13.8-5.1-18.9-5.1h-4.6v51.1z" />
            <path className="st2" d="M27.2 115.1h500.7v.5H27.2v-.5z"></path>
            <g className="st3"><path className="st4" d="M0 89.8h549.7v.5H0v-.5z"></path></g>
            <g className="st3"><path className="st4" d="M0 63.4h549.7v.5H0v-.5z"></path></g>
            <path className="st2" d="M27.2 38.1h500.7v.5H27.2v-.5z"></path>
            <g className="st5"><path className="st4" d="M527.4 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M501 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M474.7 15.2h.5V150h-.5V15.2z"></path></g>
            <path className="st4" d="M448.3 15.2h.5V150h-.5V15.2z" opacity=".398"></path>
            <g className="st5"><path className="st4" d="M422 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M395.6 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M369.3 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M342.9 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M316.6 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M290.2 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M263.8 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M237.5 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M211.1 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M184.8 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M158.4 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M132.1 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M105.7 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M79.4 15.2h.5V150h-.5V15.2z"></path></g>
            <g className="st5"><path className="st4" d="M26.7 15.2h.5V150h-.5V15.2z"></path></g>
            <path className="st2" d="M511.6 15.2h1.1v120.6h-1.1V15.2zM53.6 15.2h.9v123.6h-.9V15.2zM55.3 127.7h449.9v.5H55.3v-.5z"></path>
            <path className="st2" d="M60.6 131.6l-6.4-3.7 6.4-3.7v7.4zM505.2 124.3l6.4 3.7-6.4 3.7v-7.4zM229.4 24.4l1-.4 37.2 91.1-1 .4-37.2-91.1zM278.1 11h.5v48.9h-.5V11z"></path>
            <path className="st2" d="M226.8 27l1-7.3 5.8 4.5-6.8 2.8zM487.6 89.8l.2 4.9-4.4-2.3 4.2-2.6zM465.5 57.3l-.2-4.9 4.4 2.3-4.2 2.6z"></path>
            <path className="st2" d="M467.5 56.2l.5-.4 19.6 37.9-.5.4-19.6-37.9zM129.3 114.4h.5v38.8h-.5v-38.8zM144.3 113.1h.5v38.8h-.5v-38.8z"></path>
            <path className="st2" d="M133.4 149.1l-3.7 6.4-3.7-6.4h7.4zM148.2 151.7l-3.7 6.4-3.7-6.4h7.4z"></path>
        </svg>
    );
}

function Bubble({ label, className = "" }) {
    return (
        <span
            className={[
                "inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 text-sm shadow-sm",
                className,
            ].join(" ")}
        >
            {label}
        </span>
    );
}

/* ───────────────────────── Small UI parts ───────────────────────── */
function ArrowRight({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}