import Header from "@/components/landingPage/Header";
import FeaturesSection from "@/components/landingPage/FeatureSection";
import TestimonialsSection from "@/components/landingPage/Testimonials";
import HeroSection from "@/components/landingPage/HeroSection";
import Footer from "@/components/landingPage/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;