import { motion } from "motion/react";
import { AuroraBackground } from "@/components/animated/aurora";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Interface for Props
interface PropsType {
    isSwap: boolean;
}

// Side layout component
export const SideLayout = ({ isSwap }: PropsType) => {
    return (
        <div
            className={cn(
                "relative z-50 h-full hidden lg:flex flex-col text-white transition-all duration-500 ease-in-out",
                isSwap ? "translate-x-full" : "translate-x-0"
            )}
        >
            <div className="h-full w-full relative z-20 flex items-center text-lg font-medium">
                <AuroraBackground>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="relative flex flex-col gap-0 items-center justify-center px-4"
                    >
                        <div className="text-3xl md:text-6xl font-bold dark:text-white text-center font-serif scale-90 leading-tight">
                            <i>Unlock</i> New Opportunities and Achieve More
                        </div>
                        <Link
                            to={"https://chat.whatsapp.com/DHVXMvx8nWi9SA9XBfziab"}
                            className="font-extralight text-center text-base md:text-4xl dark:text-neutral-200 py-4"
                        >
                            Beyond the <i>Code</i>
                        </Link>
                    </motion.div>
                </AuroraBackground>
            </div>
        </div>
    );
};
