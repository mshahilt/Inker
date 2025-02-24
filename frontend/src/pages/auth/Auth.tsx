import UserAuth from "@/components/user/auth";

export default function LoginPage() {
  // const [signin, setSignin] = useState<"register" | "login">("login");

  return (
    <div className="min-h-screen flex">
      <UserAuth />
      {/* <AuthLeftPanel />
      <Login signin={signin} setSignin={setSignin} /> */}
    </div>
  );
}
