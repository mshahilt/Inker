import {Newspaper, Search, SquareActivity, Plus, ChevronUp, Boxes, LogIn} from "lucide-react";
import InkerLogo from "../../../assets/inker_main.svg";
import InkerIcon from "../../../assets/inker_icon.svg";
import InkerLogoDark from "../../../assets/inker_main_dark.svg";
import InkerIconDark from "../../../assets/inker_icon_dark.svg";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {Link, useNavigate} from "react-router-dom";
import {Label} from "@/components/ui/label";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useLocation} from "react-router-dom";
import {showConfirmDialog} from "@/store/slices/confirmDialogSlice";
import useAuthStore from "@/store/authStore.ts";
import {useDispatch} from "react-redux";
import {toast} from "sonner";
import { DEFAULT_IMG } from "@/utils/constents";
import { useBlogEditorStore } from "@/store/useBlogEditorStore";


const items = [
    {title: "My feed", url: "/feed", icon: Newspaper},
    {title: "Explore", url: "/explore", icon: Search},
    {title: "Activity", url: "/activity", icon: SquareActivity},
    {title: "Community", url: "/community", icon: Boxes},
];

export function AppSidebar() {
    const {isAuthenticated, user} = useAuthStore();
    const {clearBlog} = useBlogEditorStore()
    const {state} = useSidebar();
    const isExpanded = state === "expanded";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {logout} = useAuthStore();

    const handleLogout = async () => {
        const {error} = await logout();
        if (error) {
            toast.error("Logout failed");
            return
        }
        navigate("/auth");
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full h-12 flex items-center justify-center">
                                    {isExpanded ? (
                                        <div className="w-full flex justify-center items-center">
                                            <img
                                                src={InkerLogo}
                                                alt="Inker Logo"
                                                className="max-w-32 dark:hidden"
                                            />
                                            <img
                                                src={InkerLogoDark}
                                                alt="Inker Dark Logo"
                                                className="max-w-32  dark:block hidden"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full flex justify-center items-center">
                                            <img
                                                src={InkerIcon}
                                                alt="Inker Icon"
                                                className="max-w-8 dark:hidden"
                                            />
                                            <img
                                                src={InkerIconDark}
                                                alt="Inker Dark Icon"
                                                className="max-w-8 dark:block hidden"
                                            />
                                        </div>
                                    )}
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu></SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="mt-2">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                    <SidebarMenuButton
                                        className="!bg-black !text-white dark:!bg-white dark:!text-black flex justify-center mb-2"
                                        onClick={async () => {
                                            await clearBlog()
                                            navigate('/blog/create')
                                        }}>
                                        <Plus size={18} strokeWidth={3}/>
                                        {isExpanded && <Label className="whitespace-nowrap">New Post</Label>}
                                    </SidebarMenuButton>
                            </SidebarMenuItem>
                            {items.map((item) => {
                                const isActive = location.pathname.startsWith(item.url);
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={`w-full ${
                                                isActive
                                                    ? "bg-muted dark:bg-neutral-800 text-black dark:text-white"
                                                    : "hover:bg-muted"
                                            }`}
                                        >
                                            <Link to={item.url} className="flex items-center w-full">
                                                <item.icon size={18} strokeWidth={2}/>
                                                {isExpanded && <span className="ml-2">{item.title}</span>}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {isAuthenticated ? <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="h-fit">
                                        <Avatar className="rounded -translate-x-2">
                                            <AvatarImage
                                                src={user?.profilePicture || DEFAULT_IMG}/>
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-sm">{user?.name}</span>
                                            <span className="text-xs text-neutral-500">@{user?.username}</span>
                                        </div>
                                        <ChevronUp className="ml-auto"/>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="top" className=" w-[--radix-popper-anchor-]">
                                    <DropdownMenuItem onClick={() => navigate(`/profile/${user?.username}`)}>
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => dispatch(showConfirmDialog({
                                                title: "Logout",
                                                confirmText: "Logout",
                                                cancelText: "Cancel",
                                                description: "Are you sure you want to logout?",
                                                onConfirm: () => handleLogout(),
                                            })
                                        )}
                                    >
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> :
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        className="h-fit w-full flex justify-center items-center font-medium "
                                        onClick={() => navigate("/auth")}>
                                        <LogIn/>
                                        {isExpanded && <span className="ml-2">Login</span>}
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                            </DropdownMenu>}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
