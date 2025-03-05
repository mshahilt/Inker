import {
  UserRound,
  Newspaper,
  Search,
  SquareActivity,
  Plus,
} from "lucide-react";
import LightLogo from "../../../assets/Logo Light.svg";
import DarkLogo from "../../../assets/Logo Dark.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import Button from "@/components/ui/button";
import { Link } from "react-router-dom";

const items = [
  { title: "My feed", url: "/home", icon: Newspaper },
  { title: "Explore", url: "/explore", icon: Search },
  { title: "Activity", url: "/activity", icon: SquareActivity },
  { title: "Profile", url: "/profile", icon: UserRound },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full h-12 flex items-center justify-center">
                  {isExpanded ?
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
                    </div> :
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

                    </div>}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="!bg-black !text-white dark:!bg-white dark:!text-black flex justify-center mb-2">
                  <Plus size={18} strokeWidth={3} />
                  {isExpanded && <Label className="whitespace-nowrap">New Post</Label>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild>
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
    </Sidebar>
  );
}
