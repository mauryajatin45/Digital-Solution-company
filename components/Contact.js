"use client";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

/** Locale helpers */
const SUPPORTED_LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "en";
const getLocaleFromPath = (pathname = "/") => {
  const first = pathname.split("/").filter(Boolean)[0];
  return SUPPORTED_LOCALES.includes(first) ? first : DEFAULT_LOCALE;
};
const replaceLocaleInPath = (pathname = "/", nextLocale) => {
  const parts = pathname.split("/").filter(Boolean);
  if (SUPPORTED_LOCALES.includes(parts[0])) {
    parts[0] = nextLocale;
  } else {
    parts.unshift(nextLocale);
  }
  return "/" + parts.join("/");
};

/** Translations (Danish default) */
const M = {
  da: {
    kicker: "Lad os starte en samtale",
    heading: "Kontakt os",
    subheading:
      "Uanset om du har brug for en ny hjemmeside, vil redesigne din nuværende side, eller har spørgsmål til vores ydelser, er vi klar til at hjælpe. Kontakt os i dag for en gratis konsultation.",
    addressLabel: "Besøg vores kontor",
    callLabel: "Ring til os",
    emailLabel: "Skriv til os",
    hoursLabel: "Åbningstider",
    noteOffice: "Kontortid: Man–Fre 9:00–17:00",
    notePhone: "Vi besvarer alle opkald i åbningstiden",
    noteEmail: "Vi svarer inden for 24 timer",
    noteHours: "Vi er altid klar i åbningstiden",
    formTitle: "Få et gratis tilbud",
    formSub:
      "Fortæl os om dit projekt, så vender vi tilbage inden for 24 timer med et detaljeret forslag.",
    labels: {
      firstName: "Fornavn *",
      lastName: "Efternavn *",
      email: "E-mailadresse *",
      phone: "Telefonnummer",
      company: "Firmanavn",
      details: "Projektdetaljer *",
    },
    placeholders: {
      firstName: "Jens",
      lastName: "Hansen",
      email: "jens@firma.dk",
      phone: "+45 12 34 56 78",
      company: "Dit Firma ApS",
      details: "Beskriv venligst dine projektkrav...",
    },
    helper: "Vi svarer som regel inden for 24 timer på hverdage.",
    send: "Send besked",
    sending: "Sender...",
    errorRequired: "Udfyld venligst alle påkrævede felter.",
    errorGeneric: "Noget gik galt. Prøv igen.",
    successTitle: "Tak!",
    successMsg:
      "Vi har modtaget din besked og svarer inden for 24 timer (man–fre).",
    sendAnother: "Send en ny besked",
    mapTitle: "Besøg vores kontor",
    mapOpen: "Åbn i Maps",
    mapCall: "Ring til os",
    aria: {
      section: "Kontaktsektion",
      contactHeading: "Kontakt os",
      quoteHeading: "Få et gratis tilbud",
      mapTitle: "Kort til vores kontor",
      openMaps: "Åbn i Google Maps",
      callUs: "Ring til os",
    },
  },

  en: {
    kicker: "Let’s start a conversation",
    heading: "Contact Us",
    subheading:
      "Whether you need a new website, want to redesign your current site, or have questions about our services, we're here to help. Contact us today for a free consultation.",
    addressLabel: "Visit our office",
    callLabel: "Call us",
    emailLabel: "Email us",
    hoursLabel: "Business hours",
    noteOffice: "Office hours: Mon–Fri 9:00–17:00",
    notePhone: "We answer all calls during business hours",
    noteEmail: "We respond within 24 hours",
    noteHours: "We’re always ready to help during business hours",
    formTitle: "Get your free quote",
    formSub:
      "Tell us about your project and we’ll get back to you within 24 hours with a detailed proposal.",
    labels: {
      firstName: "First name *",
      lastName: "Last name *",
      email: "Email address *",
      phone: "Phone number",
      company: "Company name",
      details: "Project details *",
    },
    placeholders: {
      firstName: "Jatin",
      lastName: "Maurya",
      email: "john@company.com",
      phone: "+91 70690XXXXX",
      company: "Your Company Name",
      details: "Please describe your project requirements...",
    },
    helper: "We typically respond within 24 hours during business days.",
    send: "Send message",
    sending: "Sending...",
    errorRequired: "Please fill in all required fields.",
    errorGeneric: "Something went wrong. Please try again.",
    successTitle: "Thank you!",
    successMsg:
      "We’ve received your message and will reply within 24 hours (Mon–Fri).",
    sendAnother: "Send another message",
    mapTitle: "Visit our office",
    mapOpen: "Open in Maps",
    mapCall: "Call us",
    aria: {
      section: "Contact section",
      contactHeading: "Contact us",
      quoteHeading: "Get your free quote",
      mapTitle: "Map to our office",
      openMaps: "Open in Google Maps",
      callUs: "Call us",
    },
  },
};

export default function Contact({
  /** You can still override these via props if needed; otherwise we use locale messages */
  address = "723, 7th floor, North Plaza, Visat-Gandhinagar Road. Motera, 380005",
  phone = "+91 84014 11896",
  email = "contact@vertexglobal.com",
  hours = "Monday – Friday: 9:00 – 17:00",
  onSubmit,
}) {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const t = M[locale] ?? M[DEFAULT_LOCALE];

  /** Localized defaults (can be overridden by props above if you wish) */
  const kicker = t.kicker;
  const heading = t.heading;
  const subheading = t.subheading;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    details: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.firstName || !form.lastName || !form.email || !form.details) {
      setError(t.errorRequired);
      return;
    }

    try {
      setSubmitting(true);
      if (typeof onSubmit === "function") {
        await onSubmit(form);
      } else {
        await new Promise((r) => setTimeout(r, 900)); // demo stub
      }
      setSent(true);
    } catch {
      setError(t.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  /** Locale-aware anchor for internal links */
  const sectionId = "contact";
  const contactHref = replaceLocaleInPath(`/${sectionId ? "#" + sectionId : ""}`, locale);

  return (
    <section
      id={sectionId}
      className="relative overflow-hidden py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 scroll-mt-24"
      aria-labelledby="contact-heading"
      aria-label={t.aria.section}
    >
      {/* subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.08),transparent_55%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <header className="space-y-6">
            <p className="text-gray-700 tracking-wide text-sm uppercase">
              {kicker}
            </p>
            <h1
              id="contact-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight"
              aria-label={t.aria.contactHeading}
            >
              {heading}
              <span className="block border-b-4 border-black w-16 mt-4" />
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
              {subheading}
            </p>
          </header>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <InfoCard
              title={t.addressLabel}
              subtitle={address}
              note={t.noteOffice}
              icon="pin"
            />
            <InfoCard
              title={t.callLabel}
              subtitle={phone}
              note={t.notePhone}
              icon="phone"
              href={`tel:${phone.replace(/\s+/g, "")}`}
            />
            <InfoCard
              title={t.emailLabel}
              subtitle={email}
              note={t.noteEmail}
              icon="mail"
              href={`mailto:${email}`}
            />
            <InfoCard
              title={t.hoursLabel}
              subtitle={hours}
              note={t.noteHours}
              icon="clock"
            />
          </div>
        </div>

        {/* Form + Map */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Quote Form */}
          <section
            aria-labelledby="quote-heading"
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8"
          >
            <h2
              id="quote-heading"
              className="text-2xl md:text-3xl font-bold text-black"
              aria-label={t.aria.quoteHeading}
            >
              {t.formTitle}
            </h2>
            <p className="text-gray-600 mt-2">
              {t.formSub}
            </p>

            {!sent ? (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label={t.labels.firstName}
                    name="firstName"
                    placeholder={t.placeholders.firstName}
                    required
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  <Field
                    label={t.labels.lastName}
                    name="lastName"
                    placeholder={t.placeholders.lastName}
                    required
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    type="email"
                    label={t.labels.email}
                    name="email"
                    placeholder={t.placeholders.email}
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                  <Field
                    label={t.labels.phone}
                    name="phone"
                    placeholder={t.placeholders.phone}
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <Field
                  label={t.labels.company}
                  name="company"
                  placeholder={t.placeholders.company}
                  value={form.company}
                  onChange={handleChange}
                />

                <Field
                  as="textarea"
                  rows={6}
                  label={t.labels.details}
                  name="details"
                  placeholder={t.placeholders.details}
                  required
                  value={form.details}
                  onChange={handleChange}
                />

                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                  <p className="text-sm text-gray-600">
                    {t.helper}
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-white font-medium border-2 border-black transition-colors duration-300 ${submitting
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-black hover:bg-gray-800"
                      }`}
                  >
                    {submitting ? t.sending : t.send} <span>→</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
                <h3 className="text-xl font-semibold text-green-800">
                  {t.successTitle}
                </h3>
                <p className="text-green-700 mt-2">
                  {t.successMsg}
                </p>
                <button
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-300"
                  onClick={() => {
                    setSent(false);
                    setForm({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      company: "",
                      details: "",
                    });
                  }}
                >
                  {t.sendAnother}
                </button>
              </div>
            )}
          </section>

          {/* Google Map Embed */}
          <aside className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="aspect-[2.9/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.1682289289576!2d72.6033883750838!3d23.019942579173814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8348530e2e27%3A0x50e6c1baf6d6a9b1!2sNorth%20Plaza%2C%20723%2C%207th%20Floor%2C%20Visat%20Gandhinagar%20Rd%2C%20Motera%2C%20Ahmedabad%2C%20Gujarat%20380005%2C%20India!5e0!3m2!1sen!2sin!4v1693733388425!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.aria.mapTitle}
              />

            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-black">
                {t.mapTitle}
              </h3>
              <p className="text-gray-700 mt-2">{address}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    address
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-black items-center gap-2 rounded-full px-5 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors duration-300"
                  aria-label={t.aria.openMaps}
                >
                  {t.mapOpen}
                </a>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center text-black gap-2 rounded-full px-5 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors duration-300"
                  aria-label={t.aria.callUs}
                >
                  {t.mapCall}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- InfoCard + helpers ---------- */

function InfoCard({ title, subtitle, note, icon, href }) {
  const Inner = (
    <div className="relative flex flex-col h-full p-5">
      {/* Icon + title */}
      <div className="flex items-start gap-3">
        <div className="relative">
          {/* soft gradient glow behind icon */}
          <span
            className="absolute inset-0 -m-[2px] rounded-xl bg-gradient-to-br from-black via-gray-500 to-gray-300 opacity-20 blur-[6px]"
            aria-hidden="true"
          />
          <div className="relative grid place-items-center w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm">
            <Icon type={icon} className="w-5 h-5 text-gray-900" />
          </div>
        </div>
        <h3 className="text-base font-semibold text-gray-900 leading-snug">
          {title}
        </h3>
      </div>

      {/* Body */}
      <p className="mt-3 text-gray-800">{subtitle}</p>
      {note && <p className="mt-1 text-sm text-gray-500">{note}</p>}

      {/* Action hint if linkable */}
      {href && (
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-900">
          <span>Open</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17l10-10M17 7H9m8 0v8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );

  const WrapperClasses =
    "group relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px] focus:outline-none focus:ring-4 focus:ring-gray-200";

  return href ? (
    <a href={href} className={WrapperClasses} aria-label={title}>
      {/* subtle corner accent */}
      <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 rounded-full bg-gradient-to-br from-gray-900/10 to-gray-400/10 blur-sm" />
      {Inner}
    </a>
  ) : (
    <div className={WrapperClasses}>
      <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 rounded-full bg-gradient-to-br from-gray-900/10 to-gray-400/10 blur-sm" />
      {Inner}
    </div>
  );
}

function Field({
  as = "input",
  type = "text",
  label,
  name,
  placeholder,
  required,
  value,
  onChange,
  rows = 4,
}) {
  const Comp = as;
  const base =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:border-black transition";
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-800 mb-1">
        {label}
      </span>
      {as === "textarea" ? (
        <Comp
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={base + " resize-y"}
        />
      ) : (
        <Comp
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={base}
        />
      )}
    </label>
  );
}

function Icon({ type, className = "" }) {
  const common = `shrink-0 ${className}`;
  switch (type) {
    case "pin":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="10" r="2.8" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <path
            d="M4 5c0-1 1-2 2-2h2l2 5-2 1c1 3 3 5 6 6l1-2 5 2v2c0 1-1 2-2 2A16 16 0 0 1 4 5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="m22 8-10 7L2 8" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}
