import UserAuth from "@/components/user/auth";

export default function LoginPage() {

  return (
    <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <UserAuth />
    </div>
  );
}
