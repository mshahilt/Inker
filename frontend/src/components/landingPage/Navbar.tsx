import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate()
    return (
      <header className="bg-white shadow-sm px-6 py-4 fixed top-0 w-full z-50 ">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-Black-600 text-2xl font-bold">Inker</div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Blog</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button onClick={()=>navigate("/auth")} className="duration-300 active:scale-95 bg-black text-white cursor-pointer hover:scale-105 transition-all">Sign In</Button>
          </div>
        </div>
      </header>
    );
};

export default Navbar;