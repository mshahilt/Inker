import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar"; 
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex flex-col">
        <div className="w-full border-b">
          <SidebarTrigger/>
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
