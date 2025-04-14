import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/user/common/AppSidebar";
import {Outlet} from "react-router-dom";
import Navbar from "@/components/user/common/Navbar";
import BottomNavigation from "@/components/user/common/BottomNavbar";
import {GlobalConfirmDialog} from "@/components/user/common/GlobalConfirmDialog";
import useAuthStore from "@/store/authStore.ts";
import {useEffect} from "react";
import Loader from "@/components/user/common/Loader";

export default function AppLayout() {

    const {refreshUser, isLoading, isAuthenticated} = useAuthStore();
    useEffect(() => {
        refreshUser();
        
    }, [refreshUser, isAuthenticated]);

    if (isLoading ) {
        return (
          <div className="flex items-center justify-center h-screen">
          <Loader className="max-w-[200px]"/>
          </div>
        );
    }

    return (
        <>
            <SidebarProvider>
                <AppSidebar/>
                <SidebarInset>
                    <Navbar/>
                    <main className="w-full flex flex-col h-full mb-24 sm:mb-0">
                        <Outlet/>
                    </main>
                </SidebarInset>
                <BottomNavigation/>
            </SidebarProvider>
            <GlobalConfirmDialog/>
        </>
    );
}
