// components/Header.js
"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Globe,
  Menu,
  X,
  ArrowRight,
  Code2,
  ShoppingBag,
  Megaphone,
} from "lucide-react";

/**
 * Tailwind notes:
 * - Uses motion-safe: variants so users with reduced motion aren't overwhelmed.
 * - Add `scroll-smooth` to your global <html> class for smooth anchor jumps.
 */

const SERVICES = [
  {
    label: "Web Development",
    href: "#",
    icon: Code2,
    desc: "High-performance sites & apps",
  },
  {
    label: "E-commerce",
    href: "#",
    icon: ShoppingBag,
    desc: "Conversion-focused storefronts",
  },
  {
    label: "Digital Marketing",
    href: "#",
    icon: Megaphone,
    desc: "SEO, content & growth",
  },
];

const LANGS = [
  { code: "EN", label: "English" },
  { code: "DK", label: "Dansk" },
  { code: "DE", label: "Deutsch" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const servicesRef = useRef(null);
  const langRef = useRef(null);
  const mobileRef = useRef(null);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click (desktop dropdowns)
  useEffect(() => {
    function onClick(e) {
      if (servicesOpen && servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
      if (langOpen && langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [servicesOpen, langOpen]);

  // Close on escape for global menus
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setLangOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Focus first focusable in the mobile menu when opened
  useEffect(() => {
    if (mobileOpen && mobileRef.current) {
      const firstFocusable = mobileRef.current.querySelector(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [mobileOpen]);

  const toggleMobile = () => setMobileOpen((v) => !v);

  const top = !scrolled; // true at the very top

  return (
    <>
      {/* Skip link for a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all motion-safe:duration-300",
          top
            ? "border-b border-transparent bg-transparent text-white"
            : "border-b border-gray-200 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/65 text-gray-900 shadow-sm",
        ].join(" ")}
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <a
              href="#"
              className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
              aria-label="Denmark Web — Home"
            >
              {/* Replace with an <img/> or <Logo/> as needed */}
              <div className="grid h-9 w-9 place-items-center rounded-md bg-black text-white">
                <span className="text-sm font-bold">DW</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold tracking-tight">
                  Denmark Web
                </span>
                <span
                  className={[
                    "text-[11px] leading-none",
                    top ? "text-white/80" : "text-gray-500",
                  ].join(" ")}
                >
                  Design • Build • Grow
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary">
              <NavLink href="#" top={top}>
                Home
              </NavLink>

              {/* Services dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  type="button"
                  className={[
                    "group inline-flex items-center gap-1 rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50",
                    top ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-gray-900",
                  ].join(" ")}
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  onClick={() => setServicesOpen((v) => !v)}
                  onMouseEnter={() => setServicesOpen(true)}
                >
                  <span className="inline-flex items-center gap-2">
                    Services
                    <ChevronDown
                      className={[
                        "h-4 w-4 text-current transition-transform motion-safe:duration-200",
                        servicesOpen ? "rotate-180" : "rotate-0",
                      ].join(" ")}
                      aria-hidden
                    />
                  </span>
                  <span
                    className={[
                      "pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] origin-center scale-x-0 rounded transition-transform motion-safe:duration-200 group-hover:scale-x-100",
                      top ? "bg-white" : "bg-gray-900",
                    ].join(" ")}
                  />
                </button>

                {/* Menu panel */}
                <div
                  id="services-menu"
                  role="menu"
                  aria-label="Services"
                  className={[
                    "absolute left-0 top-full mt-2 w-[22rem] rounded-lg border border-gray-100 bg-white p-2 shadow-lg",
                    "motion-safe:transition-all motion-safe:duration-200",
                    servicesOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0",
                  ].join(" ")}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <ul className="grid grid-cols-1 gap-1">
                    {SERVICES.map(({ label, href, icon: Icon, desc }) => (
                      <li key={label}>
                        <a
                          href={href}
                          role="menuitem"
                          className="flex items-start gap-3 rounded-md px-3 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        >
                          <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-md bg-gray-900/90 text-white">
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          <span className="flex min-w-0 flex-col">
                            <span className="truncate text-sm font-medium text-gray-900">
                              {label}
                            </span>
                            <span className="truncate text-xs text-gray-500">
                              {desc}
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <NavLink href="#About" top={top}>
                About
              </NavLink>
              <NavLink href="#portfolio" top={top}>
                Portfolio
              </NavLink>
              <NavLink href="#testimonials" top={top}>
                Testimonials
              </NavLink>
              <NavLink href="#contact" top={top}>
                Contact
              </NavLink>
            </nav>

            {/* Right side: Language + CTA (desktop) */}
            <div className="hidden items-center gap-2 lg:flex">
              {/* Language menu */}
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  className={[
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50",
                    top ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-gray-900",
                  ].join(" ")}
                  aria-haspopup="menu"
                  aria-expanded={langOpen}
                  aria-controls="lang-menu"
                  onClick={() => setLangOpen((v) => !v)}
                >
                  <Globe className="h-5 w-5 text-current" aria-hidden />
                  <span className="text-sm">EN</span>
                  <ChevronDown
                    className={[
                      "h-4 w-4 text-current transition-transform motion-safe:duration-200",
                      langOpen ? "rotate-180" : "rotate-0",
                    ].join(" ")}
                    aria-hidden
                  />
                </button>
                <div
                  id="lang-menu"
                  role="menu"
                  aria-label="Languages"
                  className={[
                    "absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-lg border border-gray-100 bg-white p-1 shadow-lg",
                    "motion-safe:transition-all motion-safe:duration-200",
                    langOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0",
                  ].join(" ")}
                >
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      role="menuitem"
                      className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50"
                      onClick={() => setLangOpen(false)}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
              >
                <span>Get a Quote</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform motion-safe:duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </div>

            {/* Mobile burger */}
            <button
              type="button"
              className={[
                "inline-flex items-center gap-2 rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 lg:hidden",
                top
                  ? "text-white hover:bg-white/10"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
              ].join(" ")}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={toggleMobile}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile drawer + overlay */}
        <div
          aria-hidden={!mobileOpen}
          className={[
            "fixed inset-0 z-40 lg:hidden",
            mobileOpen ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
        >
          {/* Overlay */}
          <div
            className={[
              "absolute inset-0 bg-black/30 transition-opacity motion-safe:duration-200",
              mobileOpen ? "opacity-100" : "opacity-0",
            ].join(" ")}
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div
            ref={mobileRef}
            className={[
              "absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-xl outline-none",
              "motion-safe:transition-transform motion-safe:duration-300",
              mobileOpen ? "translate-x-0" : "translate-x-full",
            ].join(" ")}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <span className="text-base font-semibold text-gray-900">
                Denmark Web
              </span>
              <button
                type="button"
                className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="px-2 pb-6 pt-2" aria-label="Mobile Primary">
              <MobileLink href="#" onClick={() => setMobileOpen(false)}>
                Home
              </MobileLink>

              {/* Collapsible Services */}
              <details className="group" aria-label="Services">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-2 py-2.5 text-[15px] font-medium text-gray-800 hover:bg-gray-50">
                  <span>Services</span>
                  <ChevronDown className="h-5 w-5 transition-transform motion-safe:duration-200 group-open:rotate-180" />
                </summary>
                <div className="mt-1 space-y-1 pl-2">
                  {SERVICES.map(({ label, href, icon: Icon, desc }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-start gap-3 rounded-md px-2 py-2 hover:bg-gray-50 active:bg-gray-100"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-md bg-gray-900/90 text-white">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-[15px] font-medium text-gray-900">
                          {label}
                        </span>
                        <span className="truncate text-sm text-gray-500">
                          {desc}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </details>

              <MobileLink href="#About" onClick={() => setMobileOpen(false)}>
                About
              </MobileLink>
              <MobileLink href="#portfolio" onClick={() => setMobileOpen(false)}>
                Portfolio
              </MobileLink>
              <MobileLink href="#testimonials" onClick={() => setMobileOpen(false)}>
                Testimonials
              </MobileLink>
              <MobileLink href="#contact" onClick={() => setMobileOpen(false)}>
                Contact
              </MobileLink>

              {/* Language quick picks */}
              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500">
                  Language
                </div>
                <div className="flex gap-2">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      className="rounded-full border border-gray-200 px-3 py-1.5 text-sm hover:border-gray-300 hover:bg-gray-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <a
                  href="#contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-[15px] font-medium text-white hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
                  onClick={() => setMobileOpen(false)}
                >
                  Get a Quote
                  <ArrowRight className="h-4 w-4 transition-transform motion-safe:duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

/** --------- Subcomponents --------- */

const NavLink = ({ href, children, top = false }) => (
  <a
    href={href}
    className={[
      "group relative rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50",
      top ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-gray-900",
    ].join(" ")}
  >
    <span>{children}</span>
    <span
      className={[
        "pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] origin-center scale-x-0 rounded transition-transform motion-safe:duration-200 group-hover:scale-x-100",
        top ? "bg-white" : "bg-gray-900",
      ].join(" ")}
    />
  </a>
);

const MobileLink = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="block rounded-md px-2 py-2.5 text-[15px] font-medium text-gray-800 hover:bg-gray-50 active:bg-gray-100"
  >
    {children}
  </a>
);

export default Header;
