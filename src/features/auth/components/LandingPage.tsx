"use client";

import HeroSection from "./landing/HeroSection";
import FeaturesSection from "./landing/FeaturesSection";
import HowItWorksSection from "./landing/HowItWorksSection";
import CTASection from "./landing/CTASection";
import Footer from "./landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
