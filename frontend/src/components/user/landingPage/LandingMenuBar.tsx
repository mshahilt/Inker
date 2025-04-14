import { useNavigate } from "react-router-dom"
import LightLogo from "../../../assets/inker_main.svg"
import DarkLogo from "../../../assets/inker_main_dark.svg"
import { Button } from "../../ui/button"
import { useTheme } from "../common/theme-provider"
import { LogIn } from "lucide-react"
import { Link } from "react-router-dom"
import ThemeToggle from "../common/ThemeToggle";
import { useState, useEffect } from "react";
import useAuthStore from "@/store/authStore.ts";
import { DEFAULT_IMG } from "@/utils/constents"

const LandingMenuBar = () => {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const {isAuthenticated, user} = useAuthStore();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`
            w-full z-40 fixed flex justify-between items-center 
            max-w-[1000px] left-[50%] -translate-x-[50%] top-2
            backdrop-blur-2xl rounded-xl transition-all duration-300 ease-in-out
            ${isScrolled ? "py-2 px-6 shadow-lg bg-white/80 dark:bg-gray-800/80" : "py-3 px-10 shadow-md bg-white/70 dark:bg-gray-800/70"}
          `}>
            <Link to={'/feed'}>
              <img src={theme == 'light' ? LightLogo : DarkLogo}
                className={`rounded-md transition-all duration-300 ${isScrolled ? "max-w-[80px]" : "max-w-[100px]"}`} alt="Inker Logo"/>
            </Link>
            <div className="flex items-center gap-4">
                <ThemeToggle/>
                {isAuthenticated ? (
                    <Link to={`/profile/${user?.username}`}>
                        <img
                            src={user?.profilePicture || DEFAULT_IMG} 
                            alt="Profile"
                            className={`
                                rounded-md border-2 object-cover transition-all duration-300
                                ${isScrolled ? "w-8 h-8" : "w-10 h-10"}
                            `}
                        />
                    </Link>
                ) : (
                    <Button
                        onClick={() => navigate(`/auth`)}
                       className={`
                        duration-300 active:scale-95 hover:scale-105 transition-transform ease-in-out
                        ${isScrolled ? "py-1 px-3 text-sm" : "py-2 px-4"}
                      `}>
                        <LogIn className={isScrolled ? "w-4 h-4" : "w-5 h-5"} /> Sign In
                    </Button>
                )}
            </div>
        </div>

    )
}

export default LandingMenuBar
