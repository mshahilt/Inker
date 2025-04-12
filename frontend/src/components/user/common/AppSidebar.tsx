import { Newspaper, Search, SquareActivity, Plus, ChevronUp, Boxes, LogIn } from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { useLocation } from "react-router-dom";
import { showConfirmDialog } from "@/store/slices/confirmDialogSlice";


const items = [
  { title: "My feed", url: "/feed", icon: Newspaper },
  { title: "Explore", url: "/explore", icon: Search },
  { title: "Activity", url: "/activity", icon: SquareActivity },
  { title: "Community", url: "/community", icon: Boxes },
];

export function AppSidebar() {
  const { user, accessToken } = useSelector((state: RootState) => state.auth)
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();

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
                <Link to="/blog/create">
                  <SidebarMenuButton className="!bg-black !text-white dark:!bg-white dark:!text-black flex justify-center mb-2">
                    <Plus size={18} strokeWidth={3} />
                    {isExpanded && <Label className="whitespace-nowrap">New Post</Label>}
                  </SidebarMenuButton>
                </Link>
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
                        <item.icon size={18} strokeWidth={2} />
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
            { accessToken ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-fit">
                  <Avatar className={`rounded ${isExpanded ? '' : '-translate-x-2' } `}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm">Full Name</span>
                    <span className="text-xs text-neutral-500">@{user?.username}</span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-]">
                <DropdownMenuItem onClick={() => navigate(`/profile/${user?.username}`)}>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    dispatch(
                      showConfirmDialog({
                        title: "Are you sure you want to log out?",
                        description: "You will be signed out from your account.",
                        confirmText: "Log out",
                        cancelText: "Cancel",
                        onConfirm: () => dispatch(logout()),
                      })
                    )
                  }
                >
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : 
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="h-fit w-full flex justify-center items-center font-medium " onClick={() => navigate("/auth")}>
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
