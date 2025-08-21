// components/Contact.js
"use client";
import { useState } from "react";

export default function Contact({
  heading = "Contact Us",
  kicker = "Let’s start a conversation",
  subheading = `Whether you need a new website, want to redesign your current site,
or have questions about our services, we're here to help. Contact us today for a free consultation.`,
  address = "Nørrebrogade 52, 2200 Copenhagen N, Denmark",
  phone = "+45 33 12 34 56",
  email = "hello@denmarkweb.dk",
  hours = "Monday – Friday: 9:00 – 17:00",
  onSubmit,
}) {
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
      setError("Please fill in all required fields.");
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
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 scroll-mt-24"
      aria-labelledby="contact-heading"
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
            >
              {heading}
              <span className="block border-b-4 border-black w-16 mt-4" />
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
              {subheading}
            </p>
          </header>

          {/* Info Cards (redesigned) */}
          <div className="grid sm:grid-cols-2 gap-6">
            <InfoCard
              title="Visit our office"
              subtitle={address}
              note="Office hours: Mon–Fri 9:00–17:00"
              icon="pin"
            />
            <InfoCard
              title="Call us"
              subtitle={phone}
              note="We answer all calls during business hours"
              icon="phone"
              href={`tel:${phone.replace(/\s+/g, "")}`}
            />
            <InfoCard
              title="Email us"
              subtitle={email}
              note="We respond within 24 hours"
              icon="mail"
              href={`mailto:${email}`}
            />
            <InfoCard
              title="Business hours"
              subtitle={hours}
              note="We’re always ready to help during business hours"
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
            >
              Get your free quote
            </h2>
            <p className="text-gray-600 mt-2">
              Tell us about your project and we&apos;ll get back to you within
              24 hours with a detailed proposal.
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
                    label="First name *"
                    name="firstName"
                    placeholder="John"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  <Field
                    label="Last name *"
                    name="lastName"
                    placeholder="Doe"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    type="email"
                    label="Email address *"
                    name="email"
                    placeholder="john@company.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                  <Field
                    label="Phone number"
                    name="phone"
                    placeholder="+45 12 34 56 78"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <Field
                  label="Company name"
                  name="company"
                  placeholder="Your Company ApS"
                  value={form.company}
                  onChange={handleChange}
                />

                <Field
                  as="textarea"
                  rows={6}
                  label="Project details *"
                  name="details"
                  placeholder="Please describe your project requirements..."
                  required
                  value={form.details}
                  onChange={handleChange}
                />

                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                  <p className="text-sm text-gray-600">
                    We typically respond within 24 hours during business days.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-white font-medium border-2 border-black transition-colors duration-300 ${
                      submitting
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-black hover:bg-gray-800"
                    }`}
                  >
                    {submitting ? "Sending..." : "Send message"} <span>→</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
                <h3 className="text-xl font-semibold text-green-800">
                  Thank you!
                </h3>
                <p className="text-green-700 mt-2">
                  We&apos;ve received your message and will reply within 24
                  hours (Mon–Fri).
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
                  Send another message
                </button>
              </div>
            )}
          </section>

          {/* Google Map Embed */}
          <aside className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="aspect-[2.9/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2255.3083650936!2d12.5509606!3d55.6928922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46525313b6c76a2f%3A0x13e737ebf7f7b1a0!2sN%C3%B8rrebrogade%2052%2C%202200%20K%C3%B8benhavn%20N%2C%20Denmark!5e0!3m2!1sen!2sdk!4v1692625284326!5m2!1sen!2sdk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map to our office"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-black">
                Visit our office
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
                  aria-label="Open in Google Maps"
                >
                  Open in Maps
                </a>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center text-black gap-2 rounded-full px-5 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors duration-300"
                  aria-label="Call us"
                >
                  Call us
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- Redesigned InfoCard + helpers ---------- */

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
