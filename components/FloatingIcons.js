// components/FloatingIcons.js
"use client";
import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";

/**
 * Floating Lottie animation that appears only inside its parent section
 * - Uses local JSON to avoid CORS
 * - Confined to the parent (absolute), not the whole viewport
 */

const LOCAL_JSON_URL = "/pc.transparent-1.json";

export default function FloatingIcons({
  jsonUrl = LOCAL_JSON_URL,
  loop = true,
  autoplay = true,
  parallax = false,
  speed = 1,
  section = "hero", // 'hero' or 'about' (we’ll only render if 'hero')
}) {
  const rootRef = useRef(null);
  const lottieRef = useRef(null);
  const animRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Only allow on hero
  useEffect(() => {
    setIsVisible(section === "hero");
  }, [section]);

  useEffect(() => {
    if (!isVisible) return;
    const container = lottieRef.current;
    if (!container) return;

    animRef.current = lottie.loadAnimation({
      container,
      renderer: "svg",
      loop,
      autoplay,
      path: jsonUrl,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
        progressiveLoad: true,
        hideOnTransparent: true,
      },
    });

    animRef.current.setSpeed(speed);

    // Optional: pause when not in view for perf
    const el = rootRef.current;
    let observer;
    if (typeof IntersectionObserver !== "undefined" && el && animRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            animRef.current.play();
          } else {
            animRef.current.pause();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(el);
    }

    return () => {
      try {
        observer?.disconnect();
        animRef.current?.destroy();
      } catch {}
    };
  }, [jsonUrl, loop, autoplay, speed, isVisible]);

  useEffect(() => {
    if (!parallax || !isVisible) return;
    const el = rootRef.current;
    if (!el) return;

    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) * 0.01;
      const dy = (e.clientY - cy) * 0.01;
      el.style.setProperty("--dx", `${dx}px`);
      el.style.setProperty("--dy", `${dy}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [parallax, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 pointer-events-none z-10" // CHANGED: fixed → absolute
      style={{
        background: "transparent",
        "--dx": "0px",
        "--dy": "0px",
      }}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-y-0 right-0 w-full md:w-1/2 ${
          parallax ? "translate-transform" : ""
        }`}
        style={
          parallax
            ? {
                transform: "translate(var(--dx), var(--dy))",
                transition: "transform 0.12s linear",
              }
            : undefined
        }
      >
        <div ref={lottieRef} className="w-full h-full" />
      </div>
    </div>
  );
}
