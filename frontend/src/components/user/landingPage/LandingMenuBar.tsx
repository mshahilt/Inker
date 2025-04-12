import { useNavigate } from "react-router-dom"
import LightLogo from "../../../assets/inker_main.svg"
import DarkLogo from "../../../assets/inker_main_dark.svg"
import Button from "../../ui/button"
import { useTheme } from "../common/theme-provider"
import { LogIn } from "lucide-react"
import { Link } from "react-router-dom"
import ThemeToggle from "../common/ThemeToggle";

const LandingMenuBar = () => {
    const navigate = useNavigate()
    const { theme } = useTheme()

    return (
        <div className='w-full z-40 fixed flex justify-between px-10 items-center py-3  rounded-xl max-w-[1000px] left-[50%] -translate-x-[50%] top-2 backdrop-blur-2xl'>
            <Link to={'/home'}><img src={theme == 'light' ? LightLogo : DarkLogo} alt="" className="max-w-[100px] rounded-md" /></Link>
            <div className="flex items-center gap-4">
                <Button onClick={() => navigate("/auth")} className="duration-300 active:scale-95 bg-black  hover:scale-105 text-white cursor-pointer  transition-all">
                    <LogIn /> Sign In</Button>
                    <ThemeToggle/>
            </div>
        </div>

    )
}

export default LandingMenuBar
