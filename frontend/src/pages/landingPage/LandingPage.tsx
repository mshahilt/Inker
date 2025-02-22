
import FeaturesSection from "@/components/landingPage/FeatureSection";
import TestimonialsSection from "@/components/landingPage/Testimonials";
import HeroSection from "@/components/landingPage/HeroSection";
import Footer from "@/components/landingPage/Footer";
import SiteShowCase from "@/components/landingPage/SiteShowCase";
import LandingMenuBar from "@/components/landingPage/LandingMenuBar";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingMenuBar />
      <main>
        <HeroSection />
        <SiteShowCase />
        <FeaturesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;