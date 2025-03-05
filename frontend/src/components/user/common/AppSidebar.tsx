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
        {isExpanded ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full h-12 flex items-center justify-center">
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
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
			<>
		<div className=" w-8 h-8 my-3 bg-black rounded-md">
		</div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full h-12 flex items-center justify-center bg-black text-white">
                <Plus size={18} strokeWidth={3} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
			</>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {isExpanded && (
            <SidebarGroupLabel>
              <Button className="w-full mt-1.5 mb-1.5 h-[32px]">
                <Plus /> New Post
              </Button>
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      w-full h-12 flex items-center 
                      ${
                        isExpanded
                          ? "justify-start pl-4 gap-4"
                          : "justify-center"
                      }
                    `}
                  >
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
