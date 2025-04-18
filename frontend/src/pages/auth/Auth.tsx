import { FormLayout } from "@/components/user/auth/FormLayout";
import { SideLayout } from "@/components/user/auth/SideLayout";
import { useState } from "react";
import DarkLogo from "@/assets/inker_main_dark.svg";
import LightLogo from "@/assets/inker_main.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useIsTab } from "@/hooks/userTab";

export default function LoginPage() {
  // swap state
  const [isSwap, setSwap] = useState<boolean>(false);

  // Navigate
  const navigate = useNavigate();

  // isTabSize
  const isTabSize = useIsTab();

  return (
    <div className="dark:bg-black relative grid grid-cols-1 lg:grid-cols-2 h-screen">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isTabSize ? 0 : 1 }}
        transition={{ duration: isSwap ? 0.1 : 1.3, ease: "easeInOut" }}
        key={isSwap ? "light" : "dark"}
        src={isSwap ? LightLogo : DarkLogo}
        className="fixed z-[60] left-5 top-5 w-24 transition-opacity duration-300"
        alt="Inker"
        onClick={() => navigate("/")}
      />
      <SideLayout isSwap={isSwap} />
      <FormLayout isSwap={isSwap} setSwap={setSwap} />
    </div>
  );
}
