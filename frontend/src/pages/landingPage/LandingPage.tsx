import Navbar from "@/components/landingPage/Navbar";
import FeaturesSection from "@/components/landingPage/FeatureSection";
import TestimonialsSection from "@/components/landingPage/Testimonials";
import HeroSection from "@/components/landingPage/HeroSection";
import Footer from "@/components/landingPage/Footer";
import SiteShowCase from "@/components/landingPage/SiteShowCase";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
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