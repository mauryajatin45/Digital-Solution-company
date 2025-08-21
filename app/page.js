// app/page.js
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ExpertiseSection from "../components/ExpertiseSection";
import CreativePortfolio from "@/components/CreativePortfolio";
import Contact from '@/components/Contact';
import ResultsSection from "@/components/ResultsSection";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ResultsSection />
      <CreativePortfolio />
      <Contact />
    </div>
  );
}
