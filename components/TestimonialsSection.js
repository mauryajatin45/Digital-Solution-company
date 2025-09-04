"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * PRO DESIGN NOTES
 * – Parallax background line (light, scroll-reactive)
 * – Auto-scrolling, infinite slider with cloning
 * – Drag to scroll, pause on hover/drag, buttons for control
 * – Fade-in on enter viewport
 */

const RAW = [
  {
    id: 1,
    name: "Joe Ann Bteish",
    portrait: "/img/testominals/joe.jpg",
    quote:
      "Vertex Global delivered beyond expectations—creative, fast, and super professional.",
  },
  {
    id: 2,
    name: "Bachar Kaawach",
    portrait: "/img/testominals/admaf.jpg",
    quote:
      "From idea to execution, the team nailed every detail of our campaign.",
  },
  {
    id: 3,
    name: "Afaq Seyidova",
    portrait: "/img/testominals/afaq.jpg",
    quote: "Great communication and pixel-perfect delivery.",
  },
  {
    id: 4,
    name: "Prue Hough",
    portrait: "/img/testominals/prue-hough.jpg",
    quote: "They modernized our brand and site with measurable results.",
  },
  {
    id: 5,
    name: "Abdullah AlBalouch",
    portrait: "/img/testominals/abdullah.jpg",
    quote: "Quality work, on time, on budget. Exactly what we needed.",
  },
  {
    id: 6,
    name: "Najat Ould Hadj",
    portrait: "/img/testominals/najat.jpg",
    quote: "Strategy + execution that actually moves the needle.",
  },
  {
    id: 7,
    name: "Anzuma Akhter",
    portrait: "/img/testominals/1girl.jpg",
    quote: "Flawless handoff and clean code.",
  },
  {
    id: 8,
    name: "Riel Fajardo",
    portrait: "/img/testominals/reil.jpg",
    quote: "Creative direction on point; campaign-ready assets.",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const frontLineRef = useRef(null);

  // Scroll-reveal for header
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const targets = el.querySelectorAll("[data-animate='in']");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add("in");
        });
      },
      { threshold: 0.2 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // Parallax for front line SVG
  useEffect(() => {
    const line = frontLineRef.current;
    if (!line) return;
    const onScroll = () => {
      const y = window.scrollY || 0;
      // gentle translate
      line.style.transform = `translate3d(0, ${Math.round(y * 0.06)}px, 0)`;
      line.style.opacity = String(Math.max(0.25, 1 - y * 0.0008));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white">
      {/* FRONT LINE BACKGROUND (parallax) */}
      <div
        ref={frontLineRef}
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden
      >
        <div className="relative max-w-[1400px] opacity-40">
          <Image
            src="/assets/svg/line-vector-sec.svg"
            alt=""
            width={2110}
            height={2319}
            priority={false}
            className="select-none"
          />
        </div>
      </div>

      {/* HEADER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20" id="testimonials">
        <div data-animate="in" className="opacity-0 translate-y-6 transition-all duration-700">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-3 py-1 text-xs font-medium text-purple-700 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
            Client Testimonials &amp; Reviews
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            What Our Happy Clients Say About Us
          </h2>
        </div>
      </div>

      {/* SLIDER */}
      <div className="mt-10">
        <InfiniteSlider items={RAW} />
      </div>

      {/* Bottom CTA (optional, matches premium look) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 mt-10">
        <div
          data-animate="in"
          className="opacity-0 translate-y-6 transition-all duration-700 delay-200"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/70 p-4 sm:p-6 backdrop-blur">
            <p className="text-sm sm:text-base text-gray-700">
              Join 100+ businesses that trust <span className="font-semibold">Vertex Global</span>.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Start your project
            </a>
          </div>
        </div>
      </div>

      {/* Local CSS */}
      <style jsx>{`
        [data-animate='in'].in { opacity: 1; transform: none; }

        .ts-card {
          transition: transform 300ms ease, box-shadow 300ms ease, background 300ms ease, border-color 300ms ease;
          will-change: transform;
        }
        .ts-card:hover { transform: translateY(-6px); }
        .ts-quote { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

        .btn {
          @apply inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold;
        }
      `}</style>
    </section>
  );
}

/** ===== Infinite, draggable, autoplay slider (no deps) ===== */
function InfiniteSlider({ items }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const pos = useRef({ startX: 0, lastX: 0, progress: 0 });
  const raf = useRef(0);

  // duplicate for seamless loop
  const data = useMemo(() => [...items, ...items], [items]);

  // autoplay via RAF translateX
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const speed = 0.45; // px per frame (tweak for faster/slower)
    const step = () => {
      if (!isHover && !isDragging) {
        pos.current.progress -= speed;
        const width = el.scrollWidth / 2; // one set width
        if (Math.abs(pos.current.progress) >= width) {
          // loop back
          pos.current.progress += width;
        }
        el.style.transform = `translate3d(${pos.current.progress}px, 0, 0)`;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [isHover, isDragging]);

  // drag handlers
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let dragging = false;

    const onDown = (e) => {
      dragging = true;
      setIsDragging(true);
      pos.current.startX = (e.touches ? e.touches[0].clientX : e.clientX) - pos.current.lastX;
    };
    const onMove = (e) => {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      pos.current.lastX = clientX - pos.current.startX;
      pos.current.progress = pos.current.lastX;
      el.style.transform = `translate3d(${pos.current.progress}px, 0, 0)`;
    };
    const onUp = () => {
      dragging = false;
      setIsDragging(false);
      // keep current progress baseline
      pos.current.lastX = pos.current.progress;
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    el.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging]);

  // keyboard navigation when the container is focused
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nudge(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        nudge(-1);
      }
    };

    container.addEventListener("keydown", onKey);
    return () => container.removeEventListener("keydown", onKey);
  }, []);

  // nudge (manual prev/next)
  const nudge = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const gap = 24; // match your gap
    const cardW = card ? card.getBoundingClientRect().width + gap : 320;
    // dir === 1 => next (move more negative)
    pos.current.progress += dir * -cardW * 1.05;
    pos.current.lastX = pos.current.progress;
    el.style.transform = `translate3d(${pos.current.progress}px, 0, 0)`;
  };

  // pause autoplay when focused/hovered via container events (also set tabIndex)
  return (
    <div
      ref={containerRef}
      className="relative mx-auto max-w-[2000px] px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
      tabIndex={0}
      role="region"
      aria-label="Testimonials carousel"
    >
      {/* mask gradient edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />

      {/* nav buttons */}
      <button
        onClick={() => nudge(-1)}
        aria-label="Previous testimonials"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        title="Previous"
      >
        <svg className="h-5 w-5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={() => nudge(1)}
        aria-label="Next testimonials"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        title="Next"
      >
        <svg className="h-5 w-5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 will-change-transform select-none cursor-grab active:cursor-grabbing py-6"
          style={{ transform: "translate3d(0,0,0)", transition: isDragging ? "none" : "transform 300ms ease" }}
          aria-live="polite"
        >
          {data.map((t, idx) => (
            <Card key={`${t.id}-${idx}`} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ t }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article
      data-card
      className="ts-card relative w-[280px] sm:w-[300px] lg:w-[340px] flex-shrink-0 rounded-2xl border border-white/60 bg-white/70 shadow-[0_6px_30px_rgba(0,0,0,0.06)] backdrop-blur"
      aria-label={`Testimonial from ${t.name}`}
    >
      {/* Portrait */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-2xl bg-gray-100">
        <Image
          src={t.portrait}
          alt={t.name}
          fill
          sizes="(max-width: 768px) 60vw, (max-width: 1280px) 30vw, 340px"
          className="object-cover"
          priority={false}
        />
        {/* bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        <p className="ts-quote mt-3 text-sm text-gray-700">“{t.quote}”</p>

        <div className="mt-3 text-xs uppercase tracking-wide text-gray-500">
          Client
        </div>
        <div className="text-base font-semibold text-gray-900">{t.name}</div>

        <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-600 opacity-80" />
      </div>
    </article>
  );
}
