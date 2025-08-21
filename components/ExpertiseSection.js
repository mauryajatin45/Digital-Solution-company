// components/ExpertiseSection.js
"use client";
import React from "react";

/**
 * Recreates the Elementor "We are experts in" block:
 * - Top trio of decorative SVGs (with rotate/fade animations)
 * - Center row with left icon, heading, right icon (slide/zoom animations)
 * - Bottom trio of decorative SVGs (rotate/fade)
 * - Background can be classic or gradient (toggle via 'useGradientBg')
 */

export default function ExpertiseSection({
  useGradientBg = false, // set true to mimic elementor gradient bg
}) {
  return (
    <section
      className={`relative py-20 overflow-hidden ${
        useGradientBg
          ? "bg-gradient-to-br from-white via-gray-50 to-gray-100"
          : "bg-white"
      }`}
      aria-labelledby="experts-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP ROW (3 icons) */}
        <div className="relative flex items-center justify-center gap-8 md:gap-14 mb-10">
          {/* left big playAsset-1 */}
          <img
            src="https://obtino.com/wp-content/uploads/2025/08/playAsset-1.svg"
            alt=""
            width={210}
            height={210}
            className="w-24 md:w-40 animate-rotateInUpRight will-change-transform"
          />
          {/* middle Group-82 */}
          <img
            src="https://obtino.com/wp-content/uploads/2025/08/Group-82.svg"
            alt=""
            width={102}
            height={102}
            className="w-12 md:w-20 animate-fadeInDown will-change-transform"
            loading="lazy"
          />
          {/* right Group-83 */}
          <img
            src="https://obtino.com/wp-content/uploads/2025/08/Group-83.svg"
            alt=""
            width={102}
            height={102}
            className="w-12 md:w-20 animate-rotateInUpLeft will-change-transform"
            loading="lazy"
          />
        </div>

        {/* MIDDLE ROW (left icon • heading • right icon) */}
        <div className="relative flex items-center justify-center gap-6 md:gap-10 mb-10">
          {/* left Group-95-1 */}
          <img
            src="https://obtino.com/wp-content/uploads/2025/08/Group-95-1.svg"
            alt=""
            width={102}
            height={102}
            className="w-12 md:w-20 animate-slideInLeft will-change-transform"
            loading="lazy"
          />

          {/* heading */}
          <h2
            id="experts-heading"
            className="text-3xl md:text-5xl font-bold text-black text-center animate-zoomIn"
          >
            <span className="font-medium">We are </span>experts in
          </h2>

          {/* right Group-87 */}
          <img
            src="https://obtino.com/wp-content/uploads/2025/08/Group-87.svg"
            alt=""
            width={102}
            height={102}
            className="w-12 md:w-20 animate-slideInRight will-change-transform"
            loading="lazy"
          />
        </div>

        {/* BOTTOM ROW (3 icons) */}
        <div className="relative flex items-center justify-center gap-8 md:gap-14">
          {/* left Group-84-1 */}
          <img
            src="https://obtino.com/wp-content/uploads/2025/08/Group-84-1.svg"
            alt=""
            width={102}
            height={102}
            className="w-12 md:w-20 animate-rotateInDownRight will-change-transform"
            loading="lazy"
          />
          {/* middle Group-85 */}
          <img
            src="https://obtino.com/wp-content/uploads/2025/08/Group-85.svg"
            alt=""
            width={102}
            height={102}
            className="w-12 md:w-20 animate-fadeInUp will-change-transform"
            loading="lazy"
          />
          {/* right big playAsset-2 */}
          <img
            src="https://obtino.com/wp-content/uploads/2025/08/playAsset-2.svg"
            alt=""
            width={210}
            height={210}
            className="w-24 md:w-40 animate-rotateInUpRight will-change-transform"
            loading="lazy"
          />
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        /* Durations similar to "animated-slow" in Elementor */
        .animate-rotateInUpRight,
        .animate-rotateInUpLeft,
        .animate-rotateInDownRight,
        .animate-fadeInDown,
        .animate-fadeInUp,
        .animate-slideInLeft,
        .animate-slideInRight,
        .animate-zoomIn {
          animation-duration: 900ms;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes rotateInUpRightKF {
          0% {
            transform-origin: bottom right;
            transform: rotate(-45deg);
            opacity: 0;
          }
          100% {
            transform: rotate(0deg);
            opacity: 1;
          }
        }
        .animate-rotateInUpRight {
          animation-name: rotateInUpRightKF;
        }

        @keyframes rotateInUpLeftKF {
          0% {
            transform-origin: bottom left;
            transform: rotate(45deg);
            opacity: 0;
          }
          100% {
            transform: rotate(0deg);
            opacity: 1;
          }
        }
        .animate-rotateInUpLeft {
          animation-name: rotateInUpLeftKF;
        }

        @keyframes rotateInDownRightKF {
          0% {
            transform-origin: top right;
            transform: rotate(45deg);
            opacity: 0;
          }
          100% {
            transform: rotate(0deg);
            opacity: 1;
          }
        }
        .animate-rotateInDownRight {
          animation-name: rotateInDownRightKF;
        }

        @keyframes fadeInDownKF {
          0% {
            opacity: 0;
            transform: translateY(-16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation-name: fadeInDownKF;
        }

        @keyframes fadeInUpKF {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation-name: fadeInUpKF;
        }

        @keyframes slideInLeftKF {
          0% {
            opacity: 0;
            transform: translateX(-24px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInLeft {
          animation-name: slideInLeftKF;
        }

        @keyframes slideInRightKF {
          0% {
            opacity: 0;
            transform: translateX(24px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation-name: slideInRightKF;
        }

        @keyframes zoomInKF {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-zoomIn {
          animation-name: zoomInKF;
        }
      `}</style>
    </section>
  );
}
