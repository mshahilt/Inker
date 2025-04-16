import * as React from "react";

export function useIsTab() {
  const [isTab, setIsTab] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsTab(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isTab;
}
