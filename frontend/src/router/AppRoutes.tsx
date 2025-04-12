import AppLayout from "@/layouts/AppLayout";
import LoginPage from "@/pages/auth/Auth";
import LandingPage from "@/pages/landingPage/LandingPage";
import NotFoundPage from "@/pages/notfound/NotFoundPage";
import EditProfile from "@/pages/profile/editProfile";
import Profile from "@/pages/profile/Profile";
import { createBrowserRouter } from "react-router-dom";
import AddBlog from "@/components/user/blogpost/CreateBlog";
import OtpForm from "@/pages/auth/OtpForm";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "@/config/env";
import Feed from "@/pages/feed/Feed";
import Community from "@/pages/community/Community";
import EditBlog from "@/components/user/blogpost/EditBlog";
import ViewBlog from "@/components/user/blogpost/ViewBlog";
import { ProfileProvider } from "@/contexts/ProfileContext";
import ProtectedRoute from "./ProtectedRoutes";
export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "home", element: <ProtectedRoute><Feed /></ProtectedRoute> },
      { path: "explore", element: <div> Explore </div> },
      { path: "activity", element: <div> Activity </div> },
      { path: "profile", element: <ProtectedRoute><Profile/> </ProtectedRoute> },
      { path: "account/profile", element: <ProtectedRoute><ProfileProvider><EditProfile /></ProfileProvider></ProtectedRoute>},
      { path: "blog/create", element: <ProtectedRoute><AddBlog /></ProtectedRoute> },
      { path: "blog/edit/:blogId", element: <ProtectedRoute><EditBlog /></ProtectedRoute> },
      { path: "blog/:blogId", element: <ViewBlog /> },
      { path: "community", element: <Community /> },
      { path: "*", element: <NotFoundPage />},
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
