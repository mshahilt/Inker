import { FormLayout } from "@/components/user/auth/FormLayout";
import { SideLayout } from "@/components/user/auth/SideLayout";
import { useState } from "react";

export default function LoginPage() {
  const [isSwap, setSwap] = useState<boolean>(false);

  return (
    <div className="dark:bg-black relative grid grid-cols-1 lg:grid-cols-2 h-screen">
      <SideLayout isSwap={isSwap} />
      <FormLayout isSwap={isSwap} setSwap={setSwap} />
    </div>
  );
}
