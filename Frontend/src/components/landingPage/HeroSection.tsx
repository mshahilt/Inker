import { Button } from "@/components/ui/button";
import banck_img from "/blank-h9v8oske8iey8nkq.jpg"


const HeroSection = () => {
  return (
    <section className="py-20 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Your Gateway to Knowledge,<br />
        Connections, and Growth
      </h1>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Connect, learn, and grow with our platform designed for professional development
      </p>
      <Button className="bg-black text-white hover:bg-gray-800 px-8 py-6">
        Get Started Now
      </Button>
      <div className="m-20">
        <img 
          src={banck_img}
          alt="Platform Dashboard"
          className="rounded-lg shadow-xl mx-auto"
        />
      </div>
    </section>
  );
};

export default HeroSection