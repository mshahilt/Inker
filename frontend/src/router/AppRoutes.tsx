import AppLayout from "@/layouts/AppLayout";
import LoginPage from "@/pages/auth/Auth";
import LandingPage from "@/pages/landingPage/LandingPage";
import EditProfile from "@/pages/profile/editProfile";
import Profile from "@/pages/profile/Profile";
import { createBrowserRouter } from "react-router-dom";
import BlogDetail from "@/components/user/blogDetailed";
import AddBlog from "@/components/user/blogpost/index";
import OtpForm from "@/pages/auth/OtpForm";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "@/config/env";
import Feed from "@/pages/profile/Feed";
import Community from "@/pages/community/Community";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "home", element: <Feed /> },
      { path: "explore", element: <div> Explore </div> },
      { path: "activity", element: <div> Activity </div> },
      { path: "profile", element: <Profile /> },
      { path: "account/profile", element: <EditProfile /> },
      { path: "blog/create", element: <AddBlog /> },
      { path: "blog/:id", element: <BlogDetail /> },
      { path: "community", element: <Community /> },
    ],
  },
  {
    path: "auth",
    element: (
      <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
        <LoginPage />
      </GoogleOAuthProvider>
    ),
  },
  { path: "otp-verification", element: <OtpForm /> },
]);
