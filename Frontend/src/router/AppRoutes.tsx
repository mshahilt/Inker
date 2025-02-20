import Layout from "@/layouts/Layout";
import LoginPage from "@/pages/auth/Auth";
import LandingPage from "@/pages/landingPage/LandingPage";
import Profile from "@/pages/profile/Profile";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    { path: "/", element: <LandingPage/> },
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "home" , element: <div> home </div>},
        { path: "profile", element: <Profile /> },
      ],
    },
    { path: "/auth", element: < LoginPage /> },
  ]);

