import HeroSection from "@/components/home/HeroSection";
import AboutAuraSection from "@/components/home/AboutAuraSection";
import CoreArchitectureSection from "@/components/home/CoreArchitectureSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import SectorsSection from "@/components/home/SectorsSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import CompareSection from "@/components/home/CompareSection";
import FlowSection from "@/components/home/FlowSection";
import PartnersSection from "@/components/home/PartnersSection";
import FaqSection from "@/components/home/FaqSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* 1. Hero Section (#aura-hero-only) */}
      <HeroSection />

      {/* 2. About Nexsolia & 3D Smart Home Cutaway (#aura-section) */}
      <AboutAuraSection />

      {/* 3. Our Smart Solutions Interactive Dial (.aura-sec) */}
      <CoreArchitectureSection />

      {/* 4. Discover All 10 Categories (#aura-cat11) */}
      <CategoriesSection />

      {/* 5. Smart Solutions by Sector (.aura-sectors) */}
      <SectorsSection />

      {/* 6. Our Projects 3D Coverflow Slider (.aura-proj) */}
      <ProjectsSection />

      {/* 7. Wired KNX vs. Wireless Smart Home Comparison (.aura-compare) */}
      <CompareSection />

      {/* 8. How We Work 7-Step Animated Timeline (.aura-flow) */}
      <FlowSection />

      {/* 9. Global Brands We Trust Marquee (#aura-brands-en) */}
      <PartnersSection />

      {/* 10. Frequently Asked Questions (#aura-faq-v3) */}
      <FaqSection />

      {/* 11. Free Initial Consultation CTA (#aura-final-cta) */}
      <FinalCtaSection />
    </div>
  );
}
