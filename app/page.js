// app/page.js
'use client';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ExpertiseSection from '../components/ExpertiseSection';
import CreativePortfolio from '@/components/CreativePortfolio';
import Contact from '@/components/Contact';
import ResultsSection from '@/components/ResultsSection';
import CasesSection from '@/components/CasesSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialStack from '@/components/TestimonialStack';

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ServicesSection />
      <ResultsSection />
      <CreativePortfolio />
      <CasesSection />

      {/* ⬇️ Testimonial section (light background so text never disappears) */}
      <TestimonialStack
        className="py-16 md:py-24"
        autoEvery={6500}
        theme={{
          // tweak these to match your palette
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
          size:"md"
        }}
      />

      <Contact />
    </div>
  );
}
