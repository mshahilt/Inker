import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/common/Navbar";

export default function Layout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset >
          <Navbar />
          <main className="w-full flex flex-col h-full">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
