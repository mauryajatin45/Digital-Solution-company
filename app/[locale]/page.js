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
import HowWeWork from '@/components/HowWeWork';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import MissionVision from '@/components/MissionVision';
import CaseStudies from '@/components/CaseStudies';
import WhyPartner from '@/components/WhyPartner';

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <HeroSection />
      <ServicesSection />
      <MissionVision/>
      <ExpertiseSection />
      <HowWeWork/>
      <WhyPartner />
      <ResultsSection />
      <CreativePortfolio />
      <CaseStudies/>
      <TeamSection />
      <TestimonialsSection />
      <Contact />
      <Footer />
    </div>
  );
}
