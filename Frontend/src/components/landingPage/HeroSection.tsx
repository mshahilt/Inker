import { Button } from "@/components/ui/button";



const HeroSection = () => {
  return (
    <section className="py-20 px-6  h-[700px] flex flex-col gap-10 items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold ">
        Your Gateway to Knowledge,<br />
        Connections, and Growth
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Connect, learn, and grow with our platform designed for professional development
      </p>
      <Button className="bg-black text-white hover:bg-gray-800 px-8 py-6 w-fit">
        Get Started Now
      </Button>

    </section>
  );
};

export default HeroSection