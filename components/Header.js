"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
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
import { usePathname, useRouter } from "next/navigation";

/**
 * Inline bilingual translations (Danish default, English alternative).
 * We read the locale from the first path segment: /da or /en.
 * Switching language rewrites the URL to keep pages shareable & SEO-friendly.
 */

const SUPPORTED_LOCALES = ["da", "en"];
const DEFAULT_LOCALE = "da";

const MESSAGES = {
  da: {
    brandShort: "DW",
    brand: "Denmark Web",
    brandTag: "Design • Byg • Vækst",

    nav: {
      home: "Hjem",
      services: "Ydelser",
      about: "Om os",
      portfolio: "Portefølje",
      testimonials: "Udtalelser",
      contact: "Kontakt",
    },

    services: [
      { label: "Webudvikling", desc: "Højtydende websites & apps", icon: Code2, href: "#" },
      { label: "E-handel", desc: "Konverteringsfokuserede webshops", icon: ShoppingBag, href: "#" },
      { label: "Digital marketing", desc: "SEO, content & vækst", icon: Megaphone, href: "#" },
    ],

    ctaQuote: "Få et tilbud",
    language: "Sprog",
    aria: {
      skip: "Spring til indhold",
      brandHome: "Denmark Web — Hjem",
      openMenu: "Åbn menu",
      closeMenu: "Luk menu",
      mobileNav: "Mobilnavigation",
      servicesMenu: "Ydelser",
      langMenu: "Sprog",
    },

    langs: [
      { code: "da", label: "Dansk" },
      { code: "en", label: "English" },
    ],
  },

  en: {
    brandShort: "DW",
    brand: "Denmark Web",
    brandTag: "Design • Build • Grow",

    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      portfolio: "Portfolio",
      testimonials: "Testimonials",
      contact: "Contact",
    },

    services: [
      { label: "Web Development", desc: "High-performance sites & apps", icon: Code2, href: "#" },
      { label: "E-commerce", desc: "Conversion-focused storefronts", icon: ShoppingBag, href: "#" },
      { label: "Digital Marketing", desc: "SEO, content & growth", icon: Megaphone, href: "#" },
    ],

    ctaQuote: "Get a Quote",
    language: "Language",
    aria: {
      skip: "Skip to content",
      brandHome: "Denmark Web — Home",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mobileNav: "Mobile navigation",
      servicesMenu: "Services",
      langMenu: "Languages",
    },

    langs: [
      { code: "da", label: "Dansk" },
      { code: "en", label: "English" },
    ],
  },
};

/** Helpers to read/write locale from path */
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

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const locale = useMemo(() => getLocaleFromPath(pathname || "/"), [pathname]);
  const T = MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE];

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

  // Switch locale and update the URL (preserves path & hash)
  const handleSwitchLocale = (next) => {
    const newPath = replaceLocaleInPath(window.location.pathname, next);
    const search = window.location.search || "";
    const hash = window.location.hash || "";
    router.replace(newPath + search + hash);
    setLangOpen(false);
  };

  const top = !scrolled; // true at the very top

  return (
    <>
      {/* Skip link for a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-white"
      >
        {T.aria.skip}
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
              href={replaceLocaleInPath("/", locale)}
              className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
              aria-label={T.aria.brandHome}
            >
              {/* Replace with an <img/> or <Logo/> as needed */}
              <div className="grid h-9 w-9 place-items-center rounded-md bg-black text-white">
                <span className="text-sm font-bold">{T.brandShort}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold tracking-tight">
                  {T.brand}
                </span>
                <span
                  className={[
                    "text-[11px] leading-none",
                    top ? "text-white/80" : "text-gray-500",
                  ].join(" ")}
                >
                  {T.brandTag}
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary">
              <NavLink href={replaceLocaleInPath("/", locale)} top={top}>
                {T.nav.home}
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
                    {T.nav.services}
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
                  aria-label={T.aria.servicesMenu}
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
                    {T.services.map(({ label, href, icon: Icon, desc }) => (
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

              <NavLink href={replaceLocaleInPath("/#About", locale)} top={top}>
                {T.nav.about}
              </NavLink>
              <NavLink href={replaceLocaleInPath("/#portfolio", locale)} top={top}>
                {T.nav.portfolio}
              </NavLink>
              <NavLink href={replaceLocaleInPath("/#testimonials", locale)} top={top}>
                {T.nav.testimonials}
              </NavLink>
              <NavLink href={replaceLocaleInPath("/#contact", locale)} top={top}>
                {T.nav.contact}
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
                  <span className="text-sm">{locale.toUpperCase()}</span>
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
                  aria-label={T.aria.langMenu}
                  className={[
                    "absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-lg border border-gray-100 bg-white p-1 shadow-lg",
                    "motion-safe:transition-all motion-safe:duration-200",
                    langOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0",
                  ].join(" ")}
                >
                  {T.langs.map((l) => (
                    <button
                      key={l.code}
                      role="menuitem"
                      className="w-full rounded-md px-3 py-2 text-left text-sm text-black hover:bg-gray-50 focus:bg-gray-50"
                      onClick={() => handleSwitchLocale(l.code)}
                    >
                      {l.label}
                    </button>
                  ))}

                </div>
              </div>

              <a
                href={replaceLocaleInPath("/#contact", locale)}
                className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
              >
                <span>{T.ctaQuote}</span>
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
              aria-label={T.aria.openMenu}
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
            aria-label={T.aria.mobileNav}
          >
            <div className="flex items-center justify-between px-4 py-4">
              <span className="text-base font-semibold text-gray-900">
                {T.brand}
              </span>
              <button
                type="button"
                className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
                onClick={() => setMobileOpen(false)}
                aria-label={T.aria.closeMenu}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="px-2 pb-6 pt-2" aria-label="Mobile Primary">
              <MobileLink href={replaceLocaleInPath("/", locale)} onClick={() => setMobileOpen(false)}>
                {T.nav.home}
              </MobileLink>

              {/* Collapsible Services */}
              <details className="group" aria-label={T.aria.servicesMenu}>
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-2 py-2.5 text-[15px] font-medium text-gray-800 hover:bg-gray-50">
                  <span>{T.nav.services}</span>
                  <ChevronDown className="h-5 w-5 transition-transform motion-safe:duration-200 group-open:rotate-180" />
                </summary>
                <div className="mt-1 space-y-1 pl-2">
                  {T.services.map(({ label, href, icon: Icon, desc }) => (
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

              <MobileLink href={replaceLocaleInPath("/#About", locale)} onClick={() => setMobileOpen(false)}>
                {T.nav.about}
              </MobileLink>
              <MobileLink href={replaceLocaleInPath("/#portfolio", locale)} onClick={() => setMobileOpen(false)}>
                {T.nav.portfolio}
              </MobileLink>
              <MobileLink href={replaceLocaleInPath("/#testimonials", locale)} onClick={() => setMobileOpen(false)}>
                {T.nav.testimonials}
              </MobileLink>
              <MobileLink href={replaceLocaleInPath("/#contact", locale)} onClick={() => setMobileOpen(false)}>
                {T.nav.contact}
              </MobileLink>

              {/* Language quick picks */}
              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500">
                  {T.language}
                </div>
                <div className="flex gap-2">
                  {T.langs.map((l) => (
                    <button
                      key={l.code}
                      className="rounded-full border border-gray-200 px-3 py-1.5 text-sm hover:border-gray-300 hover:bg-gray-50"
                      onClick={() => {
                        handleSwitchLocale(l.code);
                        setMobileOpen(false);
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <a
                  href={replaceLocaleInPath("/#contact", locale)}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-[15px] font-medium text-white hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
                  onClick={() => setMobileOpen(false)}
                >
                  {T.ctaQuote}
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
