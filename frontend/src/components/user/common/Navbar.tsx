import { SidebarTrigger } from "../../ui/sidebar";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { DEFAULT_IMG } from "@/utils/constents";

const Navbar = () => {
  const {isAuthenticated, user} = useAuthStore()


  return (
    <header className="px-0 sm:px-6 py-4 w-full sticky top-0 border-b bg-white dark:bg-black z-20">
      <div className=" flex justify-end md:justify-between items-center">
        <SidebarTrigger className="-translate-x-4 hidden md:block" />
        <div className="flex items-center gap-4 mr-2">
          <SearchBar />
          <ThemeToggle />
          { isAuthenticated && <Link to={`/profile/${user?.username}`}><img className="w-10 h-10 rounded-md border-2" src={user?.profilePicture  || DEFAULT_IMG} alt="" /></Link>}
        </div>
      </div>
    </header>
  );
};

export default Navbar;