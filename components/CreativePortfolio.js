"use client";
import { useMemo, useState } from "react";

/**
 * Creative Portfolio with Unsplash demo images
 */

const DEFAULT_ITEMS = [
  {
    id: "p1",
    title: "Nordic UI Website",
    category: "Websites",
    tags: ["Next.js", "Tailwind", "SEO"],
    thumb:
      "https://images.unsplash.com/photo-1480694313141-fce5e697ee25?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspect: "aspect-[16/10]",
  },
  {
    id: "p2",
    title: "Obtino Rebrand",
    category: "Branding",
    tags: ["Logo", "Guidelines", "Stationery"],
    thumb:
      "https://images.unsplash.com/photo-1533022139390-e31c488d69e2?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspect: "aspect-[4/3]",
  },
  {
    id: "p3",
    title: "Ecomm Product Cards",
    category: "Design",
    tags: ["Figma", "Components", "UI Kit"],
    thumb:
      "https://images.unsplash.com/photo-1566475955255-404134a79aeb?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspect: "aspect-[16/9]",
  },
  {
    id: "p4",
    title: "Shopify Store Revamp",
    category: "Ecommerce",
    tags: ["Shopify", "CRO", "Speed"],
    thumb:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-[4/3]",
  },
  {
    id: "p5",
    title: "Minimal Lookbook",
    category: "Design",
    tags: ["Art Direction", "Layout"],
    thumb:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-[3/4]",
  },
  {
    id: "p6",
    title: "Performance Landing",
    category: "Websites",
    tags: ["Next.js", "A/B Test"],
    thumb:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-[16/10]",
  },
];

const CATEGORIES = ["All", "Websites", "Design", "Branding", "Ecommerce"];

export default function CreativePortfolio({
  items = DEFAULT_ITEMS,
  heading = "CREATIVE PORTFOLIO",
  subheading = "Selected work that blends strategy with clean aesthetics.",
  gradientBg = true,
}) {
  const [active, setActive] = useState("All");
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    if (active === "All") return items;
    return items.filter((it) => it.category === active);
  }, [items, active]);

  const openItem = filtered.find((f) => f.id === openId);

  return (
    <section
      className={`relative overflow-hidden py-20 ${
        gradientBg
          ? "bg-gradient-to-br from-gray-50 via-white to-gray-100"
          : "bg-white"
      }`}
      aria-labelledby="portfolio-heading"
      id="portfolio"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.08),transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gray-600 tracking-wide text-sm uppercase mb-3">
            Featured Work
          </p>
          <h2
            id="portfolio-heading"
            className="text-4xl lg:text-5xl font-bold text-black"
          >
            {heading}
            <span className="block border-b-4 border-black w-12 mx-auto mt-4" />
          </h2>
          <p className="text-lg text-gray-700 mt-6 max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const activeTab = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 border-2 ${
                  activeTab
                    ? "bg-black text-white border-black"
                    : "text-black border-black hover:bg-black hover:text-white"
                }`}
                aria-pressed={activeTab}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <article
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300 will-change-transform"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-full ${item.aspect} overflow-hidden`}>
                <img
                  src={item.thumb}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-white text-lg font-semibold leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm">{item.category}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags?.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 rounded-full bg-white/15 text-white/90 border border-white/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setOpenId(item.id)}
                    className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white text-black font-bold border-2 border-black hover:bg-black hover:text-white transition-colors duration-300"
                    aria-label={`Quick view ${item.title}`}
                    title="Quick view"
                  >
                    →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-black text-white px-7 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            Start a Project <span className="translate-y-[1px]">→</span>
          </a>
        </div>
      </div>

      {/* Quick View Modal */}
      {openItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center p-4"
        >
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenId(null)}
            aria-label="Close"
          />
          <div className="relative z-10 w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="bg-gray-100">
                <div className="aspect-[4/3] md:aspect-[1/1]">
                  <img
                    src={openItem.thumb}
                    alt={openItem.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-black">
                  {openItem.title}
                </h3>
                <p className="text-gray-700 mt-2">{openItem.category}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {openItem.tags?.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-black text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mt-5 leading-relaxed">
                  Clean, performance-focused execution aligned with your brand
                  voice. Built with modern stacks and crafted UX to lift
                  conversions.
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 border-2 border-black rounded-full px-5 py-2 font-medium hover:bg-black hover:text-white transition-colors duration-300"
                  >
                    View Case Study
                  </a>
                  <button
                    onClick={() => setOpenId(null)}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2 font-medium bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minor entrance motion for cards */}
      <style jsx>{`
        section :global(article) {
          animation: cardIn 480ms ease both;
        }
        @keyframes cardIn {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
