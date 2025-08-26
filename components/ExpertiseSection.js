// components/ExpertiseSection.js
"use client";
import React, { useMemo, useState } from "react";

/**
 * "Our Technology." section (pixel-faithful, Tailwind-only)
 * - Center label + heading
 * - Filter pills (Frontend active by default)
 * - Responsive logo grid (3–6 columns)
 * - Motion-safe fade-in
 *
 * Uses <img> for simplicity. If you want next/image, add remote domains:
 *   - settingsinfotech.s3.ap-south-1.amazonaws.com
 *   - cdn.simpleicons.org
 */

const CATEGORIES = [
  "Frontend",
  "Backend",
  "Mobile",
  "Devops & cloud",
  "Database",
  "project manager",
  "CMS",
];

/* ---------- Data ---------- */
// Frontend (your original set, same order/titles)
const FRONTEND_TECHS = [
  { title: "Next js", src: "https://settingsinfotech.s3.ap-south-1.amazonaws.com/si/review/1693559030901KQM5f2iEk6lj.svg" },
  { title: "React", src: "https://settingsinfotech.s3.ap-south-1.amazonaws.com/si/review/1693548059465aHl8p8EXzlr7.svg" },
  { title: "Nuxt", src: "https://settingsinfotech.s3.ap-south-1.amazonaws.com/si/review/16935482072777IZBkaIcjs35.svg" },
  { title: "Angular", src: "https://settingsinfotech.s3.ap-south-1.amazonaws.com/si/review/1693548370345AKFGTogiLhNd.svg" },
  { title: "Bootstrap", src: "https://settingsinfotech.s3.ap-south-1.amazonaws.com/si/review/1693548386184WuHohItfyVra.svg" },
  { title: "Material ui", src: "https://settingsinfotech.s3.ap-south-1.amazonaws.com/si/review/1693548454747JWdJs_j0Snmy.svg" },
  { title: "Tailwindcss", src: "https://settingsinfotech.s3.ap-south-1.amazonaws.com/si/review/1693548475004I4CkdhYKrFSX.svg" },
  { title: "Materializecss", src: "https://settingsinfotech.s3.ap-south-1.amazonaws.com/si/review/1693548500511fpWIOdDF5rG9.svg" },
  { title: "Blueprint", src: "https://settingsinfotech.s3.ap-south-1.amazonaws.com/si/review/1693548540276wbNQmOBGbBhk.svg" },
  { title: "Elemental-UI", src: "https://settingsinfotech.s3.ap-south-1.amazonaws.com/si/review/1693548593840uqzz2L9w3CPy.svg" },
  { title: "Uikit", src: "https://settingsinfotech.s3.ap-south-1.amazonaws.com/si/review/1693548613722VL90JYMFlYVW.svg" },
];

// Backend
const BACKEND_TECHS = [
  { title: "Node.js", src: "https://cdn.simpleicons.org/nodedotjs" },
  { title: "Express", src: "https://cdn.simpleicons.org/express" },
  { title: "NestJS", src: "https://cdn.simpleicons.org/nestjs" },
  { title: "Django", src: "https://cdn.simpleicons.org/django" },
  { title: "Laravel", src: "https://cdn.simpleicons.org/laravel" },
  { title: "Ruby on Rails", src: "https://cdn.simpleicons.org/rubyonrails" },
  { title: "Spring", src: "https://cdn.simpleicons.org/spring" },
  { title: ".NET", src: "https://cdn.simpleicons.org/dotnet" },
];

// Mobile
const MOBILE_TECHS = [
  { title: "Android", src: "https://cdn.simpleicons.org/android" },
  { title: "iOS", src: "https://cdn.simpleicons.org/apple" },
  { title: "Swift", src: "https://cdn.simpleicons.org/swift" },
  { title: "Kotlin", src: "https://cdn.simpleicons.org/kotlin" },
  { title: "React Native", src: "https://cdn.simpleicons.org/react" },
  { title: "Flutter", src: "https://cdn.simpleicons.org/flutter" },
  { title: "Ionic", src: "https://cdn.simpleicons.org/ionic" },
];

// DevOps & Cloud
const DEVOPS_TECHS = [
  { title: "Google Cloud", src: "https://cdn.simpleicons.org/googlecloud" },
  { title: "Docker", src: "https://cdn.simpleicons.org/docker" },
  { title: "Kubernetes", src: "https://cdn.simpleicons.org/kubernetes" },
  { title: "Terraform", src: "https://cdn.simpleicons.org/terraform" },
  { title: "Jenkins", src: "https://cdn.simpleicons.org/jenkins" },
  { title: "GitLab", src: "https://cdn.simpleicons.org/gitlab" },
  { title: "GitHub Actions", src: "https://cdn.simpleicons.org/githubactions" },
];

// Database
const DATABASE_TECHS = [
  { title: "MySQL", src: "https://cdn.simpleicons.org/mysql" },
  { title: "PostgreSQL", src: "https://cdn.simpleicons.org/postgresql" },
  { title: "MongoDB", src: "https://cdn.simpleicons.org/mongodb" },
  { title: "Redis", src: "https://cdn.simpleicons.org/redis" },
  { title: "SQLite", src: "https://cdn.simpleicons.org/sqlite" },
  { title: "MariaDB", src: "https://cdn.simpleicons.org/mariadb" },
  { title: "Firebase", src: "https://cdn.simpleicons.org/firebase" },
  { title: "Elasticsearch", src: "https://cdn.simpleicons.org/elasticsearch" },
];

// Project manager
const PM_TECHS = [
  { title: "Jira", src: "https://cdn.simpleicons.org/jira" },
  { title: "Trello", src: "https://cdn.simpleicons.org/trello" },
  { title: "Asana", src: "https://cdn.simpleicons.org/asana" },
  { title: "ClickUp", src: "https://cdn.simpleicons.org/clickup" },
  { title: "Notion", src: "https://cdn.simpleicons.org/notion" },
  { title: "Basecamp", src: "https://cdn.simpleicons.org/basecamp" },
  { title: "Linear", src: "https://cdn.simpleicons.org/linear" },
];

// CMS
const CMS_TECHS = [
  { title: "WordPress", src: "https://cdn.simpleicons.org/wordpress" },
  { title: "Drupal", src: "https://cdn.simpleicons.org/drupal" },
  { title: "Joomla", src: "https://cdn.simpleicons.org/joomla" },
  { title: "Shopify", src: "https://cdn.simpleicons.org/shopify" },
  { title: "Strapi", src: "https://cdn.simpleicons.org/strapi" },
  { title: "Contentful", src: "https://cdn.simpleicons.org/contentful" },
  { title: "Sanity", src: "https://cdn.simpleicons.org/sanity" },
  { title: "Ghost", src: "https://cdn.simpleicons.org/ghost" },
];

const TECH_MAP = {
  Frontend: FRONTEND_TECHS,
  Backend: BACKEND_TECHS,
  Mobile: MOBILE_TECHS,
  "Devops & cloud": DEVOPS_TECHS,
  Database: DATABASE_TECHS,
  "project manager": PM_TECHS,
  CMS: CMS_TECHS,
};

/* ---------- Component ---------- */
export default function ExpertiseSection() {
  const [active, setActive] = useState("Frontend");
  const items = useMemo(() => TECH_MAP[active] ?? [], [active]);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100"
      aria-labelledby="tech-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        {/* Heading */}
        <div className="text-center">
          <span className="block text-sm font-medium text-gray-700 animate-fadeIn">
            Best Feature
          </span>
          <h3
            id="tech-heading"
            className="mt-2 text-3xl font-bold text-black sm:text-4xl md:text-5xl animate-fadeIn"
          >
            Our Technology.
          </h3>
        </div>

        {/* Filter pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                className={[
                  "rounded-full px-4 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50",
                  isActive
                    ? "bg-black text-white"
                    : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Logo grid */}
        <div className="mt-10">
          <div
            role="list"
            className="grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
          >
            {items.map((it, i) => (
              <div
                key={`${active}-${it.title}`}
                role="listitem"
                className="text-center animate-fadeInUp"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="relative mx-auto h-16 w-16 md:h-20 md:w-20">
                  <img
                    src={it.src}
                    alt={it.title}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <strong className="text-sm text-gray-900 md:text-base">
                    {it.title}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          {/* Optional empty state (shouldn't hit now, all tabs have data) */}
          {items.length === 0 && (
            <div className="py-10 text-center text-sm text-gray-500">
              No technologies added yet.
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInKF {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeInKF 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-fadeInUp {
          animation: fadeInKF 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn,
          .animate-fadeInUp {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
