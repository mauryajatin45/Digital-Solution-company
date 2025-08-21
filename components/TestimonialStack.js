'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

/* ------- Data (same as before; edit freely) ------- */
const TESTIMONIALS = [
  { quote: "We've had an incredibly successful project. They helped us go from prototype to MVP launch and stayed with us for marketing and further product development.", name: 'Alexis Del Rio', role: 'Founder & CEO, Tripa', logo: 'https://cdn-cjaml.nitrocdn.com/WBlYYVovoEvbFMtnLZMoJzMpISLVAnKr/assets/images/optimized/rev-a810ddb/aavatto.com/wp-content/uploads/2023/05/TRIPA-Coaching_-Making-the-Invisible-Visible.-23-1.svg', rating: 5 },
  { quote: 'For a new business, reliable collaborators matter. The service we received was wonderful and made an immediate impact.', name: 'NIDHI MEHRA', role: 'VP Marketing, 1Finance', logo: 'https://cdn-cjaml.nitrocdn.com/WBlYYVovoEvbFMtnLZMoJzMpISLVAnKr/assets/images/optimized/rev-a810ddb/aavatto.com/wp-content/uploads/2023/04/1Finance.svg', rating: 5 },
  { quote: 'The team transformed our brand with exceptional logo and branding, and leveled up our web presence with thoughtful design & development.', name: 'JAYRAJ VALA', role: 'Founder, Jordar Marketing', logo: 'https://cdn-cjaml.nitrocdn.com/WBlYYVovoEvbFMtnLZMoJzMpISLVAnKr/assets/images/optimized/rev-a810ddb/aavatto.com/wp-content/uploads/2023/05/jordar-logo.svg', rating: 5 },
  { quote: 'Finding genuine skill and exceptional results is hard. The session surpassed expectations and the task was completed remarkably fast.', name: 'DR. BALAJI RAMANATHAN', role: 'Owner of a Mobile App Company', logo: 'https://cdn-cjaml.nitrocdn.com/WBlYYVovoEvbFMtnLZMoJzMpISLVAnKr/assets/images/optimized/rev-a810ddb/aavatto.com/wp-content/uploads/2023/05/confidential-1.png', rating: 5 },
  { quote: 'They noted every requirement and delivered exactly as imagined. We’ll definitely collaborate on more projects.', name: 'RIDDHIMAAN NANDGAONKAR', role: 'Owner of a Mobile App Company', logo: 'https://cdn-cjaml.nitrocdn.com/WBlYYVovoEvbFMtnLZMoJzMpISLVAnKr/assets/images/optimized/rev-a810ddb/aavatto.com/wp-content/uploads/2023/05/confidential-1.png', rating: 5 },
  { quote: 'They captured the essence of my brand perfectly—visually striking and memorable. Highly recommended for exceptional logo work!', name: 'NIDHI DESAI', role: 'Founder, Rangardhini', logo: 'https://cdn-cjaml.nitrocdn.com/WBlYYVovoEvbFMtnLZMoJzMpISLVAnKr/assets/images/optimized/rev-a810ddb/aavatto.com/wp-content/uploads/2023/05/rangardhini.svg', rating: 5 },
];

/* ------- Icon ------- */
const Star = ({ className = '' }) => (
  <svg viewBox="0 0 576 512" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
    />
  </svg>
);

/* ------- Component ------- */
export default function TestimonialStack({
  items = TESTIMONIALS,
  autoEvery = 6500,
  pauseOnHover = true,
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  theme = {
    bg: 'bg-gradient-to-b from-white via-rose-50/50 to-white',
    heading: 'text-slate-900',
    sub: 'text-slate-600',
    card: 'bg-white',
    border: 'border-slate-200',
    shadow: 'shadow-[0_30px_80px_rgba(2,6,23,0.10)]',
    accentBar: 'from-amber-300 via-amber-300 to-rose-300',
    pill: 'bg-white border-slate-200 text-slate-900',
    dot: 'bg-slate-900/30 hover:bg-slate-900/60',
    dotActive: 'bg-slate-900',
    navBtn: 'bg-white border-slate-200 text-slate-900',
  },
}) {
  // size presets (width, padding, type scale, controls, stack spacing)
  const PRESET = {
    sm: {
      maxW: 'max-w-xl',
      pad: 'p-5 md:p-7',
      quoteSize: 'text-base md:text-lg',
      nameSize: 'text-[12px]',
      logoH: 'h-7',
      nav: 'h-10 w-10',
      dotH: 'h-2',
      stackY: 64,
      depthZ: 56,
      scale1: 0.994,
      scale2: 0.988,
    },
    md: {
      maxW: 'max-w-3xl',
      pad: 'p-6 md:p-10',
      quoteSize: 'text-lg md:text-xl',
      nameSize: 'text-[13px]',
      logoH: 'h-9',
      nav: 'h-12 w-12',
      dotH: 'h-2.5',
      stackY: 90,
      depthZ: 80,
      scale1: 0.995,
      scale2: 0.99,
    },
    lg: {
      maxW: 'max-w-4xl',
      pad: 'p-8 md:p-12',
      quoteSize: 'text-xl md:text-2xl',
      nameSize: 'text-[14px]',
      logoH: 'h-10',
      nav: 'h-12 w-12',
      dotH: 'h-3',
      stackY: 110,
      depthZ: 90,
      scale1: 0.996,
      scale2: 0.992,
    },
  }[size];

  const n = items.length;
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const timerRef = useRef(null);
  const hovered = useRef(false);

  const go = (dir = 1) => setActive((i) => (i + dir + n) % n);
  const goto = (i) => setActive(((i % n) + n) % n);

  useEffect(() => {
    if (!autoEvery) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (pauseOnHover && hovered.current) return;
      go(1);
    }, autoEvery);
    return () => clearInterval(timerRef.current);
  }, [active, autoEvery, pauseOnHover, n]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    const card = cardRefs.current[active];
    if (!el || !card) return;
    el.style.height = card.offsetHeight + PRESET.stackY * 2 + 'px';
  }, [active, items, PRESET.stackY]);

  const layer = useMemo(
    () => (idx) => {
      const off = (idx - active + n) % n;
      if (off === 0) return { y: 0, z: 0, s: 1, o: 1, zi: 4 };
      if (off === 1) return { y: PRESET.stackY, z: -PRESET.depthZ, s: PRESET.scale1, o: 0.92, zi: 3 };
    //   if (off === 2) return { y: PRESET.stackY * 2, z: -PRESET.depthZ * 2, s: PRESET.scale2, o: 0.75, zi: 2 };
      return { y: PRESET.stackY * 3, z: -PRESET.depthZ * 3, s: PRESET.scale2 - 0.01, o: 0, zi: 1 };
    },
    [active, n, PRESET]
  );

  return (
    <section
      className={`relative overflow-hidden ${theme.bg} ${className}`}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      id='testimonals'
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 pt-8 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left column */}
          <div>
            <h2 className={`text-3xl md:text-5xl font-semibold leading-tight ${theme.heading}`}>
              Hear What Our{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Happy Clients</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[10px] rounded bg-rose-200/60" />
              </span>{' '}
              Say
            </h2>
            <p className={`mt-5 text-base md:text-lg ${theme.sub}`}>
              Explore testimonials showcasing how our services positively impact lives. Transparency
              and feedback are valued as we help customers achieve goals and solve problems.
            </p>
            <a href="/company/customer-reviews" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-800">
              VIEW ALL REVIEWS <span aria-hidden>→</span>
            </a>
          </div>

          {/* Right column: stack */}
          <div
            className="relative"
            onMouseEnter={() => (hovered.current = true)}
            onMouseLeave={() => (hovered.current = false)}
          >
            <div className="pointer-events-none absolute -inset-24 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,_rgba(255,183,122,0.25),_transparent_70%)]" />
            <div
              ref={containerRef}
              className={`relative mx-auto w-full ${PRESET.maxW} transition-[height] duration-300 ease-out`}
              style={{ perspective: 1000 }}
              aria-live="polite"
            >
              {items.map((t, i) => {
                const L = layer(i);
                return (
                  <article
                    key={i}
                    ref={(el) => (cardRefs.current[i] = el)}
                    aria-hidden={i !== active}
                    className={[
                      'absolute inset-x-0 top-0 mx-auto w-full',
                      'origin-center rounded-3xl border',
                      PRESET.pad,
                      theme.card,
                      theme.border,
                      theme.shadow,
                    ].join(' ')}
                    style={{
                      transform: `translateY(${L.y}px) translateZ(${L.z}px) scale(${L.s})`,
                      opacity: L.o,
                      zIndex: L.zi,
                      transformStyle: 'preserve-3d',
                      transition: 'transform 600ms cubic-bezier(.2,.7,.2,1), opacity 600ms ease',
                    }}
                  >
                    <span className={`pointer-events-none absolute left-6 right-6 -top-1 h-1 rounded-full bg-gradient-to-r ${theme.accentBar}`} />
                    <div className="w-full flex justify-center">
                      <div className={`-mt-6 mb-4 inline-flex items-center gap-1 rounded-full border px-4 py-2 ${theme.pill}`}>
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className="h-3.5 w-3.5" />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-center text-slate-900">
                      <p className={`${PRESET.quoteSize} leading-relaxed`}>“{t.quote}”</p>
                    </blockquote>
                    <div className="mt-6 flex flex-col items-center">
                      <h4 className={`${PRESET.nameSize} tracking-[0.14em] font-semibold text-slate-900`}>{t.name}</h4>
                      <p className="mt-1 text-sm text-slate-600">{t.role}</p>
                      {!!t.logo && (
                        <div className="mt-6 border-t pt-6 w-full flex justify-center">
                          <img src={t.logo} alt={`${t.name} logo`} className={`${PRESET.logoH} max-w-[180px] object-contain opacity-80`} loading="lazy" />
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Controls */}
            <div className="pointer-events-none absolute inset-x-0 -bottom-6 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                className={`pointer-events-auto inline-flex ${PRESET.nav} items-center justify-center rounded-full border ${theme.navBtn} shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
              >
                <svg width="6" height="10" viewBox="0 0 6 10" className="h-3 w-3">
                  <path d="M5.863 8.387 4.75 9.5 0 4.75 4.75 0 5.863 1.113 2.229 4.75l3.634 3.637Z" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className={`pointer-events-auto inline-flex ${PRESET.nav} items-center justify-center rounded-full border ${theme.navBtn} shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
              >
                <svg width="6" height="10" viewBox="0 0 6 10" className="h-3 w-3">
                  <path d="M0 8.387 1.113 9.5 5.863 4.75 1.113 0 0 1.113 3.634 4.75 0 8.387Z" />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="mt-14 flex items-center justify-center gap-2">
              {items.map((_, i) => {
                const is = i === active;
                return (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goto(i)}
                    className={`${PRESET.dotH} rounded-full transition-all ${
                      is ? `w-7 ${theme.dotActive}` : `w-2.5 ${theme.dot}`
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
