// components/ServiceSection.js
"use client";

import Image from "next/image";
import clsx from "clsx";

export default function ServiceSection({
  title,
  description,
  points = [],
  image,
  imageSide = "right", // "left" | "right"
  textAlign = "left", // "left" | "right"
  ctaText,
  ctaLink = "#",
}) {
  return (
    <section className="relative bg-white text-black">
      <div
        className={clsx(
          "mx-auto max-w-7xl flex flex-col items-center gap-12 md:flex-row",
          imageSide === "left" && "md:flex-row-reverse"
        )}
      >
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-md">
            <Image
              src={image}
              alt={title}
              width={600}
              height={500}
              className="w-full h-auto object-contain animate-float"
            />
          </div>
        </div>

        {/* Text */}
        <div
          className={clsx(
            "w-full md:w-1/2 space-y-6",
            textAlign === "right" && "text-right"
          )}
        >
          <h2 className="text-3xl font-extrabold">{title}</h2>
          <p className="text-gray-700">{description}</p>

          {/* Bullet points */}
          {points?.length > 0 && (
            <ul
              className={clsx(
                "grid gap-3 sm:grid-cols-2 mt-6",
                textAlign === "right" && "justify-items-end"
              )}
            >
              {points.map((p, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-800">
                  <span className="h-2 w-2 rounded-full bg-black/80" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          {ctaText && (
            <div className="pt-4">
              <a
                href={ctaLink}
                className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-gray-600 transition"
              >
                {ctaText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Floating image effect */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
