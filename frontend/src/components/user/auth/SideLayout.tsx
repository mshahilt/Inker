import DarkLogo from "@/assets/inker_main_dark.svg";
import { motion } from "motion/react";
import { AuroraBackground } from "@/components/animated/aurora";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// Interface for Props
interface PropsType {
    isSwap: boolean;
}

// Side layout component
export const SideLayout = ({ isSwap }: PropsType) => {
    // Navigate
    const navigate = useNavigate();

    return (
        <div
            className={cn(
                "relative z-50 h-full hidden lg:flex flex-col text-white transition-all duration-500 ease-in-out",
                isSwap ? "translate-x-full" : "translate-x-0"
            )}
        >
            <div className="h-full w-full relative z-20 flex items-center text-lg font-medium">
                <img
                    src={DarkLogo}
                    className="fixed z-50 left-5 top-5 w-24"
                    alt="Inker"
                    onClick={() => navigate("/")}
                />

                <AuroraBackground>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="relative flex flex-col gap-4 items-center justify-center px-4"
                    >
                        <div className="text-3xl md:text-6xl font-bold dark:text-white text-center font-serif scale-90 leading-tight">
                            <i>Unlock</i> New Opportunities and Achieve More
                        </div>
                        <Link
                            to={"https://chat.whatsapp.com/DHVXMvx8nWi9SA9XBfziab"}
                            className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4"
                        >
                            And this, is Inker.
                        </Link>
                    </motion.div>
                </AuroraBackground>
            </div>
        </div>
    );
};
