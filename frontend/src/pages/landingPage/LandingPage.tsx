import FeaturesSection from "@/components/user/landingPage/FeatureSection";
import TestimonialsSection from "@/components/user/landingPage/Testimonials";
import HeroSection from "@/components/user/landingPage/HeroSection";
import Footer from "@/components/user/landingPage/Footer";
import SiteShowCase from "@/components/user/landingPage/SiteShowCase";
import LandingMenuBar from "@/components/user/landingPage/LandingMenuBar";
import Contributors from "@/components/user/landingPage/Contributors";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingMenuBar />
      <main>
        <HeroSection />
        <SiteShowCase />
        <FeaturesSection />
        <TestimonialsSection />
        <Contributors />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
