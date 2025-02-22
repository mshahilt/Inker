import AuthLeftPanel from "@/components/auth/AuthLeftPanel";
import Login from "@/components/auth/Login";
import { useState } from "react";

export default function LoginPage() {
  const [signin, setSignin] = useState<"register" | "login">("login");
  
  return (
    <div className="min-h-screen flex">
      <AuthLeftPanel/>
      <Login signin={signin} setSignin={setSignin}/>
    </div>
  );
}
