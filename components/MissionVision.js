import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Globe, Target, Lightbulb } from 'lucide-react'

// MissionVision.jsx
// Plain JavaScript React component for Next.js (JSX, not TSX)
// TailwindCSS + Framer Motion used for styling & animations.
// Drop into `components/MissionVision.jsx` and import where needed.

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const card = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function MissionVision({ className = '' }) {
  return (
    <section
      className={`relative mx-auto p-6 md:p-10 bg-white overflow-hidden ${className}`}
      aria-labelledby="mission-vision-heading"
    >
      {/* Decorative SVG accents (purely visual, monochrome) */}
      <svg
        className="absolute -top-20 -right-40 opacity-8 pointer-events-none"
        width="420"
        height="420"
        viewBox="0 0 420 420"
        fill="none"
        aria-hidden
      >
        <circle cx="210" cy="210" r="200" stroke="black" strokeWidth="0.5" opacity="0.06" />
      </svg>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 id="mission-vision-heading" className="text-xl md:text-2xl font-extrabold tracking-tight text-black">
            Mission & Vision
          </h2>
          <p className="mt-1 text-sm text-black/60">Monochrome — crafted for clarity and motion</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs uppercase text-black/40">Creative • Tech • Growth</span>
          <div className="w-10 h-10 grid place-items-center rounded-full bg-black text-white/95 shadow-sm">
            <Sparkles size={16} />
          </div>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 md:grid-cols-2 items-stretch"
      >
        {/* Mission Card (dark) */}
        <motion.article
          variants={card}
          whileHover={{ y: -6, scale: 1.01 }}
          className="relative p-6 rounded-2xl bg-black text-white overflow-hidden border border-white/6 shadow-lg"
        >
          {/* Animated accent line */}
          <motion.span
            layoutId="accent-line"
            className="absolute left-0 top-0 h-full w-1 bg-white/8"
            style={{ transformOrigin: 'top' }}
            aria-hidden
          />

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 grid place-items-center rounded-lg bg-white/6">
              <Lightbulb size={20} />
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider text-white/90">Mission</h3>
              <motion.p
                className="mt-3 text-lg font-semibold italic leading-snug"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                “To empower organizations by delivering digital strategies that balance creativity, technology, and measurable business growth.”
              </motion.p>

              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-white/80" />
                  Strategy-driven design & engineering
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-white/80" />
                  Measurable outcomes & growth
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-white/80" />
                  Scalable, maintainable solutions
                </li>
              </ul>

              <div className="mt-6 flex items-center gap-3">
                <button
                  className="group inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md bg-white text-black shadow-sm focus:outline-none"
                  aria-label="Explore mission"
                >
                  Explore
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="text-xs text-white/60">Focused on impact</div>
              </div>
            </div>
          </div>

          {/* Floating micro-pattern */}
          <svg className="absolute -bottom-6 -right-8 opacity-6 pointer-events-none" width="180" height="180" viewBox="0 0 180 180">
            <rect x="0" y="0" width="6" height="6" fill="white" />
            <g transform="translate(40,40)">
              <circle cx="20" cy="20" r="1.2" fill="white" />
              <circle cx="40" cy="40" r="1.2" fill="white" />
              <circle cx="60" cy="60" r="1.2" fill="white" />
            </g>
          </svg>
        </motion.article>

        {/* Vision Card (light) */}
        <motion.article
          variants={card}
          whileHover={{ y: -6, scale: 1.01 }}
          className="relative p-6 rounded-2xl bg-white text-black overflow-hidden border border-black/6 shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 grid place-items-center rounded-lg bg-black/6">
              <Globe size={20} />
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider text-black/80">Vision</h3>
              <motion.p
                className="mt-3 text-lg font-semibold italic leading-snug"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                “To be the trusted global partner for brands seeking transformation in the digital economy.”
              </motion.p>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-black/80" />
                  Global partnerships
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-black/80" />
                  Continuous innovation
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-black/80" />
                  Client-first approach
                </li>
              </ul>

              <div className="mt-6 flex items-center gap-3">
                <button
                  className="group inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md border border-black/6 bg-transparent hover:bg-black/5 focus:outline-none"
                  aria-label="Explore vision"
                >
                  Learn More
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 5l-7 7 7 7" />
                  </svg>
                </button>

                <div className="text-xs text-black/60">Built for scale</div>
              </div>
            </div>
          </div>

          {/* subtle animated dot cluster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 1.2, yoyo: Infinity }}
            className="absolute -bottom-8 -left-8 pointer-events-none"
            aria-hidden
          >
            <svg width="160" height="160" viewBox="0 0 160 160">
              <g fill="black">
                <circle cx="20" cy="20" r="1.4" />
                <circle cx="40" cy="40" r="1.4" />
                <circle cx="80" cy="80" r="1.4" />
              </g>
            </svg>
          </motion.div>
        </motion.article>
      </motion.div>
    </section>
  )
}
