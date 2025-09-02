"use client";

import { usePathname } from "next/navigation";

const LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "en";
const getLocaleFromPath = (pathname = "/") => {
  const first = pathname.split("/").filter(Boolean)[0];
  return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
};

const COPY = {
  en: {
    title: "How We Work",
    sub: "A streamlined process designed to turn your ideas into high-impact digital products.",
    steps: [
      {
        number: "01",
        title: "Discovery & Strategy",
        desc: "We dive deep to understand your goals, audience, and market. Together we outline a clear strategy tailored for measurable results.",
      },
      {
        number: "02",
        title: "Design & Experience",
        desc: "Our UX/UI team crafts interfaces that are not only beautiful but also intuitive and accessible across all devices.",
      },
      {
        number: "03",
        title: "Build & Launch",
        desc: "Using modern frameworks and agile methods, we develop scalable, high-performance solutions — ready for launch.",
      },
      {
        number: "04",
        title: "Growth & Support",
        desc: "We stay with you post-launch, providing hosting, SEO, and ongoing support to keep your business growing.",
      },
    ],
  },
  da: {
    title: "Sådan arbejder vi",
    sub: "En strømlinet proces designet til at omsætte dine ideer til digitale produkter med høj effekt.",
    steps: [
      {
        number: "01",
        title: "Opdagelse & Strategi",
        desc: "Vi går i dybden med at forstå dine mål, dit publikum og markedet. Sammen lægger vi en klar strategi, der giver målbare resultater.",
      },
      {
        number: "02",
        title: "Design & Oplevelse",
        desc: "Vores UX/UI-team skaber interfaces, der ikke kun er smukke, men også intuitive og tilgængelige på alle enheder.",
      },
      {
        number: "03",
        title: "Udvikling & Lancering",
        desc: "Vi bygger skalerbare, højtydende løsninger med moderne frameworks og agile metoder — klar til lancering.",
      },
      {
        number: "04",
        title: "Vækst & Support",
        desc: "Vi er med dig efter lanceringen og leverer hosting, SEO og løbende support for at sikre vækst.",
      },
    ],
  },
};

export default function HowWeWork() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const t = COPY[locale] ?? COPY[DEFAULT_LOCALE];

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/70">
            {t.sub}
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s) => (
            <div
              key={s.number}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.06]"
            >
              {/* Number */}
              <div className="mb-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black font-semibold text-white text-lg">
                  {s.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-white/70">{s.desc}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-white to-white/40 transition-all group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
