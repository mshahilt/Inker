import Layout from "@/layouts/Layout";
import LoginPage from "@/pages/auth/Auth";
import Profile from "@/pages/profile/Profile";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true , element: <div> home </div>},
        { path: "profile", element: <Profile /> },
      ],
    },
    { path: "/auth", element: < LoginPage /> },
  ]);

