import React from 'react'
import { motion } from 'framer-motion'

// CaseStudies.jsx
// Updated per your request:
// - Images on top (replace placeholders with your real image URLs)
// - Title + stat near the top
// - Description moved to the bottom of each card
// - Removed "Case Study" text and tag badges
// - "Read Story" button moved to the bottom of the card
// TailwindCSS + Framer Motion. Drop into `components/CaseStudies.jsx`.

function NumberCounter({ value = 0, suffix = '', duration = 1200 }) {
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    let start = null
    const from = 0
    const to = Number(value) || 0

    function step(timestamp) {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(from + (to - from) * eased)
      setDisplay(current)
      if (progress < 1) requestAnimationFrame(step)
    }

    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  function friendly(n) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
    return n.toLocaleString()
  }

  return (
    <span className="font-extrabold text-2xl md:text-3xl tracking-tight leading-none">
      {friendly(display)}<span className="ml-1 text-lg font-medium">{suffix}</span>
    </span>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function CaseStudies({ className = '' }) {
  // Replace image URLs with your own assets
  const studies = [
    {
      id: 'ecom',
      title: 'E-Commerce Scale Up',
      image: 'https://d6xcmfyh68wv8.cloudfront.net/learn-content/uploads/2022/02/Untitled-design-5.png',
      description: 'Increased revenue by 310% through SEO, ads, and Shopify',
      stat: 310,
      statSuffix: '%',
    },
    {
      id: 'saas',
      title: 'Enterprise SaaS Launch',
      image: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/images/ds-what-is-pages/enterprise-saas-benefits.jpg',
      description: '5,000+ users in first quarter',
      stat: 5000,
      statSuffix: '+',
    },
    {
      id: 'fmcg',
      title: 'Global FMCG Campaign',
      image: 'https://benamic.b-cdn.net/app/uploads/2024/04/Localising-your-global-campaign-to-connect-with-your-audience-uai-1066x600-1.jpg',
      description: '8M+ impressions across 3 continents',
      stat: 8000000,
      statSuffix: '+',
    },
  ]

  return (
    <section aria-labelledby="case-studies-heading" className={`max-w-7xl mx-auto px-6 md:px-8 py-12 ${className}`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 id="case-studies-heading" className="text-3xl md:text-4xl font-extrabold text-white">Case Studies</h2>
          <p className="mt-2 text-sm text-white/70 max-w-xl">Selected wins — strategic thinking, measurable results</p>
        </div>

        <div className="text-xs uppercase text-white/40 hidden md:block">Proven • Scalable • Global</div>
      </div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-8 md:grid-cols-3">
        {studies.map((s, idx) => (
          <motion.article
            key={s.id}
            variants={cardVariant}
            whileHover={{ translateY: -8, scale: 1.02 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col overflow-hidden rounded-2xl bg-white/6 backdrop-blur-sm border border-white/6 shadow-2xl"
            aria-labelledby={`case-${s.id}-title`}
          >
            {/* Top image */}
            <div className="h-40 md:h-48 w-full relative bg-gray-900">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover block" />
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 id={`case-${s.id}-title`} className="text-lg md:text-xl font-semibold text-white leading-tight">
                    {s.title}
                  </h3>

                  <div className="text-right text-white">
                    <NumberCounter value={s.stat} suffix={s.statSuffix} duration={1100 + idx * 200} />
                  </div>
                </div>
              </div>

              {/* Description at bottom */}
              <div className="mt-4">
                <p className="text-sm text-white/70 leading-relaxed">{s.description}</p>
              </div>

              {/* bottom divider + Read Story button */}
              <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-end gap-3">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black text-sm font-medium shadow hover:scale-[1.02] transition-transform focus:outline-none">
                  Read Story
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
