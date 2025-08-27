// app/page.js
'use client';

import Contact from '@/components/Contact';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import CreativePortfolio from '@/components/CreativePortfolio';
import ResultsSection from '@/components/ResultsSection';
import TeamSection from '@/components/TeamSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

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
      <Footer />
    </div>
  );
}
