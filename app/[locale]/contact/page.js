"use client";

import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ───────────────────────── helpers: locale in URL ───────────────────────── */
const LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "da";

const getLocaleFromPath = (pathname = "/") => {
  const first = pathname.split("/").filter(Boolean)[0];
  return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
};

/* ────────────────────────────── copy / i18n ─────────────────────────────── */
const T = {
  da: {
    seoTitle: "Kontakt | Denmark Web",
    hero: {
      kicker: "Lad os tale",
      title: "Kontakt Denmark Web",
      sub: "Fortæl os kort om dit projekt – vi vender tilbage inden for 24 timer på hverdage.",
    },
    blocks: {
      visit: {
        title: "Besøg os",
        address: "Nørrebrogade 52, 2200 København N, Danmark",
        hours: "Kontortid: Man–Fre 9:00–17:00",
        open: "Åbn i Kort",
      },
      call: {
        title: "Ring til os",
        number: "+45 33 12 34 56",
        note: "Vi besvarer alle opkald i åbningstiden",
        open: "Ring",
      },
      email: {
        title: "Skriv til os",
        addr: "hello@denmarkweb.dk",
        note: "Vi svarer inden for 24 timer",
        open: "Skriv mail",
      },
      bh: {
        title: "Åbningstid",
        range: "Mandag – Fredag: 9:00 – 17:00",
        note: "Vi er altid klar til at hjælpe i åbningstiden",
      },
    },
    form: {
      title: "Fortæl os om dit projekt",
      sub: "Udfyld formularen – jo mere kontekst, desto bedre kan vi hjælpe.",
      labels: {
        name: "Fulde navn",
        email: "Email",
        phone: "Telefon (valgfri)",
        company: "Virksomhed (valgfri)",
        projectType: "Projekttype",
        budget: "Budget (valgfri)",
        message: "Besked",
        consent: "Jeg accepterer, at Denmark Web må kontakte mig omkring min forespørgsel.",
      },
      placeholders: {
        name: "Dit navn",
        email: "navn@domæne.dk",
        phone: "+45 …",
        company: "Firmanavn",
        projectType: "Vælg projekttype",
        budget: "Vælg budget",
        message: "Kort om mål, scope og tidslinje …",
      },
      submit: "Send forespørgsel",
      success: "Tak! Vi har modtaget din forespørgsel.",
      fail: "Noget gik galt. Prøv igen.",
      required: "Dette felt er påkrævet.",
      invalidEmail: "Indtast en gyldig email.",
    },
    a11y: {
      section: "Kontaktsektion",
      contactCards: "Kontaktoplysninger",
      form: "Kontaktformular",
      map: "Kort over kontorplacering",
    },
  },
  en: {
    seoTitle: "Contact | Denmark Web",
    hero: {
      kicker: "Let’s talk",
      title: "Contact Denmark Web",
      sub: "Tell us briefly about your project — we reply within 24 hours on business days.",
    },
    blocks: {
      visit: {
        title: "Visit our office",
        address: "Nørrebrogade 52, 2200 Copenhagen N, Denmark",
        hours: "Office hours: Mon–Fri 9:00–17:00",
        open: "Open in Maps",
      },
      call: {
        title: "Call us",
        number: "+45 33 12 34 56",
        note: "We answer all calls during business hours",
        open: "Call",
      },
      email: {
        title: "Email us",
        addr: "hello@denmarkweb.dk",
        note: "We respond within 24 hours",
        open: "Compose",
      },
      bh: {
        title: "Business hours",
        range: "Monday – Friday: 9:00 – 17:00",
        note: "We’re always ready to help during business hours",
      },
    },
    form: {
      title: "Tell us about your project",
      sub: "Fill out the form — the more context, the better we can help.",
      labels: {
        name: "Full name",
        email: "Email",
        phone: "Phone (optional)",
        company: "Company (optional)",
        projectType: "Project type",
        budget: "Budget (optional)",
        message: "Message",
        consent: "I agree that Denmark Web may contact me regarding my inquiry.",
      },
      placeholders: {
        name: "Your name",
        email: "name@domain.com",
        phone: "+45 …",
        company: "Company name",
        projectType: "Select project type",
        budget: "Select budget",
        message: "Briefly describe goals, scope, and timeline…",
      },
      submit: "Send inquiry",
      success: "Thanks! We’ve received your message.",
      fail: "Something went wrong. Please try again.",
      required: "This field is required.",
      invalidEmail: "Enter a valid email.",
    },
    a11y: {
      section: "Contact section",
      contactCards: "Contact details",
      form: "Contact form",
      map: "Map showing office location",
    },
  },
};

/* ───────────────────────────── page component ────────────────────────────── */

export default function ContactPage() {
  const pathname = usePathname() || "/";
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const t = T[locale];

  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"
  const [errors, setErrors] = useState({});

  function validate(form) {
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const consent = fd.get("consent");
    const errs = {};

    if (!name) errs.name = t.form.required;
    if (!email) errs.email = t.form.required;
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = t.form.invalidEmail;
    if (!message) errs.message = t.form.required;
    if (!consent) errs.consent = t.form.required;

    return errs;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});

    const form = e.currentTarget;
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setStatus("idle");
      return;
    }

    try {
      // TODO: replace with fetch("/api/contact", { method: "POST", body: new FormData(form) })
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100" aria-label={t.a11y.section}>
      <Header />

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-20 md:pt-24 pb-10">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-700">
            {t.hero.kicker}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-black">
            {t.hero.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">{t.hero.sub}</p>
        </div>
      </section>

      {/* Contact cards + form */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-16">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            {/* Left: contact cards + map */}
            <div>
              <div className="grid gap-6 sm:grid-cols-2" aria-label={t.a11y.contactCards}>
                {/* Visit */}
                <Card>
                  <CardTitle>{t.blocks.visit.title}</CardTitle>
                  <CardBody>
                    <p className="text-[15px] text-gray-700">{t.blocks.visit.address}</p>
                    <p className="mt-2 text-sm text-gray-500">{t.blocks.visit.hours}</p>
                    <div className="mt-4">
                      <ActionButton
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          t.blocks.visit.address
                        )}`}
                        label={t.blocks.visit.open}
                      />
                    </div>
                  </CardBody>
                </Card>

                {/* Call */}
                <Card>
                  <CardTitle>{t.blocks.call.title}</CardTitle>
                  <CardBody>
                    <p className="text-[15px] text-gray-700">
                      <a href="tel:+4533123456" className="underline decoration-gray-300 hover:decoration-black">
                        {t.blocks.call.number}
                      </a>
                    </p>
                    <p className="mt-2 text-sm text-gray-500">{t.blocks.call.note}</p>
                    <div className="mt-4">
                      <ActionButton href="tel:+4533123456" label={t.blocks.call.open} />
                    </div>
                  </CardBody>
                </Card>

                {/* Email */}
                <Card>
                  <CardTitle>{t.blocks.email.title}</CardTitle>
                  <CardBody>
                    <p className="text-[15px] text-gray-700">
                      <a href="mailto:hello@denmarkweb.dk" className="underline decoration-gray-300 hover:decoration-black">
                        hello@denmarkweb.dk
                      </a>
                    </p>
                    <p className="mt-2 text-sm text-gray-500">{t.blocks.email.note}</p>
                    <div className="mt-4">
                      <ActionButton href="mailto:hello@denmarkweb.dk" label={t.blocks.email.open} />
                    </div>
                  </CardBody>
                </Card>

                {/* Hours */}
                <Card>
                  <CardTitle>{t.blocks.bh.title}</CardTitle>
                  <CardBody>
                    <p className="text-[15px] text-gray-700">{t.blocks.bh.range}</p>
                    <p className="mt-2 text-sm text-gray-500">{t.blocks.bh.note}</p>
                  </CardBody>
                </Card>
              </div>

              {/* Map */}
              <div className="mt-6">
                <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm" aria-label={t.a11y.map}>
                  <div className="aspect-[16/10]">
                    <iframe
                      title="Denmark Web office map"
                      className="h-full w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(
                        "Nørrebrogade 52, 2200 København N"
                      )}&output=embed`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm" aria-label={t.a11y.form}>
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-semibold text-black">{t.form.title}</h2>
                  <p className="mt-2 text-gray-600">{t.form.sub}</p>

                  <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="name" label={t.form.labels.name} placeholder={t.form.placeholders.name} error={errors.name} required />
                      <Field id="email" type="email" label={t.form.labels.email} placeholder={t.form.placeholders.email} error={errors.email} required />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="phone" type="tel" label={t.form.labels.phone} placeholder={t.form.placeholders.phone} error={errors.phone} />
                      <Field id="company" label={t.form.labels.company} placeholder={t.form.placeholders.company} error={errors.company} />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Select
                        id="projectType"
                        label={t.form.labels.projectType}
                        placeholder={t.form.placeholders.projectType}
                        options={
                          locale === "da"
                            ? [
                                { v: "webdev", l: "Webudvikling" },
                                { v: "webux", l: "Webdesign & UX" },
                                { v: "ecom", l: "E-commerce" },
                                { v: "hosting", l: "Hosting" },
                                { v: "maintenance", l: "Vedligehold & support" },
                                { v: "seo", l: "SEO-optimering" },
                                { v: "other", l: "Andet" },
                              ]
                            : [
                                { v: "webdev", l: "Web Development" },
                                { v: "webux", l: "Web Design & UX" },
                                { v: "ecom", l: "E-commerce" },
                                { v: "hosting", l: "Hosting" },
                                { v: "maintenance", l: "Maintenance & Support" },
                                { v: "seo", l: "SEO Optimization" },
                                { v: "other", l: "Other" },
                              ]
                        }
                      />
                      <Select
                        id="budget"
                        label={t.form.labels.budget}
                        placeholder={t.form.placeholders.budget}
                        options={
                          locale === "da"
                            ? [
                                { v: "undisclosed", l: "Ikke afklaret" },
                                { v: "lt50", l: "Under 50.000 DKK" },
                                { v: "50-150", l: "50.000 – 150.000 DKK" },
                                { v: "150-300", l: "150.000 – 300.000 DKK" },
                                { v: "300plus", l: "300.000+ DKK" },
                              ]
                            : [
                                { v: "undisclosed", l: "Undisclosed" },
                                { v: "lt50", l: "Under 50,000 DKK" },
                                { v: "50-150", l: "50,000 – 150,000 DKK" },
                                { v: "150-300", l: "150,000 – 300,000 DKK" },
                                { v: "300plus", l: "300,000+ DKK" },
                              ]
                        }
                      />
                    </div>

                    <Field
                      id="message"
                      label={t.form.labels.message}
                      placeholder={t.form.placeholders.message}
                      as="textarea"
                      rows={6}
                      error={errors.message}
                      required
                    />

                    <Checkbox id="consent" label={t.form.labels.consent} error={errors.consent} required />

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={status === "sending" || status === "success"}
                        className={[
                          "inline-flex items-center justify-center gap-2 rounded-full border-2 border-black bg-black",
                          "px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-900",
                          "disabled:opacity-60 disabled:cursor-not-allowed",
                        ].join(" ")}
                      >
                        {status === "sending" ? "…" : t.form.submit}
                      </button>
                      {status === "success" && <span className="ml-3 text-sm text-green-700">{t.form.success}</span>}
                      {status === "error" && <span className="ml-3 text-sm text-red-700">{t.form.fail}</span>}
                    </div>
                  </form>
                </div>
              </div>

              {/* Helper notes */}
              <div className="mt-4 text-xs text-gray-500">
                <p>
                  {locale === "da" ? "Tip: Du kan også skrive direkte til " : "Tip: You can also email "}
                  <a href="mailto:hello@denmarkweb.dk" className="underline">
                    hello@denmarkweb.dk
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* subtle page animation helpers */}
      <style jsx>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(8px) }
          100% { opacity: 1; transform: translateY(0) }
        }
        section > div { animation: fadeUp .5s ease both; }
        @media (prefers-reduced-motion: reduce) {
          section > div { animation: none !important; }
        }
      `}</style>
    <Footer/>
    </main>
  );
}

/* ───────────────────────────── atoms / molecules ─────────────────────────── */

function Card({ children }) {
  return <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">{children}</div>;
}
function CardTitle({ children }) {
  return <h3 className="text-lg font-semibold text-black">{children}</h3>;
}
function CardBody({ children }) {
  return <div className="mt-2">{children}</div>;
}

function ActionButton({ href, label }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function Field({ id, label, placeholder, error, as, rows, type = "text", required }) {
  const base =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-[0_1px_0_rgba(0,0,0,0.04)] placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:border-gray-900";
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label} {required ? <span className="text-red-600">*</span> : null}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={id} rows={rows} placeholder={placeholder} className={base} />
      ) : (
        <input id={id} name={id} type={type} placeholder={placeholder} className={base} />
      )}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function Select({ id, label, placeholder, options, error }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-[0_1px_0_rgba(0,0,0,0.04)] focus:outline-none focus:ring-4 focus:ring-gray-200 focus:border-gray-900"
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function Checkbox({ id, label, error, required }) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        name={id}
        type="checkbox"
        required={required}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black"
      />
      <label htmlFor={id} className="text-sm text-gray-800">
        {label}
      </label>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

/* ────────────────────────────── icons (mono) ─────────────────────────────── */

function ArrowRight({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
