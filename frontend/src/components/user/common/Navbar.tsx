import { SidebarTrigger } from "../../ui/sidebar";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";



const Navbar = () => {

  return (
    <header className="px-6 py-4 w-full sticky top-0 border-b bg-white dark:bg-black z-20">
      <div className=" flex justify-end md:justify-between items-center">
        <SidebarTrigger className="-translate-x-4 hidden md:block" />
        <div className="flex items-center gap-4">
          <SearchBar />
          <ThemeToggle />
          <Link to={'/profile'}><img className="w-10 h-10 rounded-md border-2" src="https://res.cloudinary.com/dwyxogyrk/image/upload/v1737433466/h0xf7zi0blmclfqrjeo7.png" alt="" /></Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;