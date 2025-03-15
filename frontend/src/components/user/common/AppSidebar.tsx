import { Newspaper, Search, SquareActivity, Plus, ChevronUp, Boxes } from "lucide-react";
import LightLogo from "../../../assets/Logo Light.svg";
import DarkLogo from "../../../assets/Logo Dark.svg";
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

const items = [
  { title: "My feed", url: "/home", icon: Newspaper },
  { title: "Explore", url: "/explore", icon: Search },
  { title: "Activity", url: "/activity", icon: SquareActivity },
  { title: "Community", url: "/community", icon: Boxes },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  const navigate = useNavigate();

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
                        src={LightLogo}
                        alt="Light Logo"
                        className="max-w-[100px] dark:hidden"
                      />
                      <img
                        src={DarkLogo}
                        alt="Dark Logo"
                        className="max-w-[100px] dark:block hidden"
                      />
                    </div>
                  ) : (
                    <div className="w-full flex justify-center items-center">
                      <img
                        src={LightLogo}
                        alt="Light Logo"
                        className="max-w-[100px] dark:hidden"
                      />
                      <img
                        src={DarkLogo}
                        alt="Dark Logo"
                        className="max-w-[100px] dark:block hidden"
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center w-full">
                      <item.icon size={18} strokeWidth={2} />
                      {isExpanded && <span className="ml-2">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-fit">
                  <Avatar className="rounded">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm">User Name</span>
                    <span className="text-xs text-neutral-500">@username</span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-]">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
