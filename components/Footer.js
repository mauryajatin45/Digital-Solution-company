// components/Footer.js
"use client";

import Link from "next/link";

/**
 * Denmark Web — Footer (dark theme)
 * - Monochrome design (black/white)
 * - Crisp, evenly spaced ratings row with dividers
 * - CTA + 4-column site map
 * - Fully responsive and keyboard accessible
 */

const year = new Date().getFullYear();

const NAV = {
  discover: [
    { label: "About Us", href: "/#about" },
    { label: "Careers", href: "/#careers" },
    { label: "Contact", href: "/contact" },
    { label: "Insights", href: "/#insights" },
    { label: "Newsroom", href: "/#news" },
    { label: "Partners", href: "/#partners" },
  ],
  services: [
    { label: "Web Development", href: "/services#webdev" },
    { label: "Web Design & UX", href: "/services#ux" },
    { label: "E-commerce Solutions", href: "/services#ecom" },
    { label: "Hosting", href: "/services#hosting" },
    { label: "Maintenance & Support", href: "/services#support" },
    { label: "SEO Optimization", href: "/services#seo" },
  ],
  resources: [
    { label: "Case Studies", href: "/portfolio" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQs", href: "/#faq" },
    { label: "Security", href: "/#security" },
    { label: "Accessibility", href: "/#accessibility" },
  ],
  industries: [
    { label: "Retail & E-commerce", href: "/#retail" },
    { label: "SaaS & Startups", href: "/#saas" },
    { label: "Healthcare", href: "/#health" },
    { label: "Finance", href: "/#finance" },
    { label: "Education", href: "/#edu" },
  ],
};

const RATINGS = [
  { score: "5.0", name: "glassdoor" },
  { score: "4.7", name: "Google" },
  { score: "4.8", name: "GoodFirms" },
  { score: "4.9", name: "AmbitionBox" },
  { score: "5.0", name: "Clutch" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0b0c10] text-white">
      {/* top shadow/gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(255,255,255,0.06),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-16">
        {/* CTA */}
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Enable your digital advantage with Denmark Web
            </h2>
            <p className="mt-2 max-w-2xl text-white/70">
              From concept to launch and beyond—design, build and grow with a partner who
              ships fast and cares about the details.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-white/0 px-5 py-2.5 text-sm font-medium tracking-wide text-white transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              Connect with us
            </a>
          </div>
        </div>

        {/* Site map */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Column title="Discover Denmark Web" items={NAV.discover} />
          <Column title="Services" items={NAV.services} />
          <Column title="Resources" items={NAV.resources} />
          <Column title="Industries" items={NAV.industries} />
        </div>

        {/* Ratings row (monochrome & centered, with dividers) */}
        <div className="mt-16">
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur">
    <div className="flex flex-wrap items-stretch justify-center divide-x divide-white/10">
      {RATINGS.map((r, i) => (
        <a
          key={r.name + i}
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-[160px] flex-1 flex-col items-center justify-center gap-2 px-6 py-6 transition hover:bg-white/5"
        >
          {/* Star rating */}
          <div className="flex items-center justify-center gap-1.5">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-black">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
                <path
                  d="M10 2.5 12 7l5 .4-3.8 3.2 1.2 4.9L10 13.8 5.6 15.5l1.2-4.9L3 7.4 8 7l2-4.5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="text-sm font-medium text-white">{r.score}</span>
          </div>

          {/* Logo below */}
          <Logo name={r.name} />
        </a>
      ))}
    </div>
    <p className="pb-4 pt-2 text-center text-xs text-white/50">
      Loved by teams worldwide
    </p>
  </div>
</div>


        {/* legal row */}
        <div className="mt-10 border-t border-white/10 py-6 text-sm">
          <div className="flex flex-col items-center justify-between gap-3 text-white/70 md:flex-row">
            <span>© {year} Denmark Web. All rights reserved.</span>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <FooterLink href="/#procurement">Procurement</FooterLink>
              <FooterLink href="/#policies">Corporate Policies</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Use</FooterLink>
              <FooterLink href="/sitemap">Sitemap</FooterLink>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── Sub-components ───────────────────────── */

function Column({ title, items = [] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wider text-white/80">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <Link
              href={it.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link href={href} className="transition hover:text-white">
      {children}
    </Link>
  );
}

/* Rating cell (stacked layout) */
function RatingCell({ score, name }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-4">
      {/* star + score */}
      <span className="inline-flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-black">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
            <path
              d="M10 2.5 12 7l4.8.4-3.6 3 1.1 4.6L10 12.8 5.7 15l1.1-4.6-3.6-3L8 7l2-4.5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="text-base font-semibold tracking-tight">{score}</span>
      </span>

      {/* logo below */}
      <Logo name={name} />
    </div>
  );
}

/* Logos (monochrome text marks, centered under score) */
function Logo({ name }) {
  switch (name) {
    case "glassdoor":
      return (
        <svg
          viewBox="0 0 140 24"
          className="h-5 text-white"
          aria-hidden
        >
          <text
            x="50%"
            y="18"
            textAnchor="middle"
            fontFamily="Inter,system-ui"
            fontWeight="700"
            fontSize="18"
            fill="currentColor"
          >
            glassdoor
          </text>
        </svg>
      );
    case "Google":
      return (
        <svg viewBox="0 0 90 24" className="h-5 text-white" aria-hidden>
          <text
            x="50%"
            y="18"
            textAnchor="middle"
            fontFamily="Inter,system-ui"
            fontWeight="700"
            fontSize="18"
            fill="currentColor"
          >
            Google
          </text>
        </svg>
      );
    case "GoodFirms":
      return (
        <svg viewBox="0 0 120 24" className="h-5 text-white" aria-hidden>
          <text
            x="50%"
            y="18"
            textAnchor="middle"
            fontFamily="Inter,system-ui"
            fontWeight="700"
            fontSize="18"
            fill="currentColor"
          >
            GoodFirms
          </text>
        </svg>
      );
    case "AmbitionBox":
      return (
        <svg viewBox="0 0 150 24" className="h-5 text-white" aria-hidden>
          <text
            x="50%"
            y="18"
            textAnchor="middle"
            fontFamily="Inter,system-ui"
            fontWeight="700"
            fontSize="18"
            fill="currentColor"
          >
            AmbitionBox
          </text>
        </svg>
      );
    case "Clutch":
    default:
      return (
        <svg viewBox="0 0 90 24" className="h-5 text-white" aria-hidden>
          <text
            x="50%"
            y="18"
            textAnchor="middle"
            fontFamily="Inter,system-ui"
            fontWeight="700"
            fontSize="18"
            fill="currentColor"
          >
            Clutch
          </text>
        </svg>
      );
  }
}
