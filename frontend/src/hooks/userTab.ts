import { useEffect, useState } from "react";

export function useIsTab() {
    const [isTab, setIsTab] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsTab(window.innerWidth < 1024); // Tailwind's lg is 1024px
        };

        handleResize(); // Set on mount
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isTab;
}