// app/page.js
'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
// import AboutSection from '../components/AboutSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import CreativePortfolio from '@/components/CreativePortfolio';
import Contact from '@/components/Contact';
import ResultsSection from '@/components/ResultsSection';
import TeamSection from '@/components/TeamSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <HeroSection />
      {/* <AboutSection /> */}
      <ExpertiseSection />
      <ServicesSection />
      <ResultsSection />
      <CreativePortfolio />
      <TeamSection />
      <TestimonialsSection />
      <Contact />
    </div>
  );
}
