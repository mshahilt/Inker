import { UserRound, Newspaper, Search, SquareActivity, Plus } from "lucide-react";
import LightLogo from "../../../assets/Logo Light.svg";
import DarkLogo from "../../../assets/Logo Dark.svg";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import Button from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

const items = [
	{
		title: "My feed",
		url: "/home",
		icon: Newspaper,
	},
	{
		title: "Explore",
		url: "/explore",
		icon: Search,
	},
	{
		title: "Activity",
		url: "/activity",
		icon: SquareActivity,
	},
	{
		title: "Profile",
		url: "/profile",
		icon: UserRound,
	},
];

export function AppSidebar() {
	const navigate = useNavigate();

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton size="lg">
									<div className="w-full flex justify-center items-center">
										<img src={LightLogo} alt="" className="max-w-[100px] dark:hidden" />
										<img src={DarkLogo} alt="" className="max-w-[100px] dark:block hidden" />
									</div>
								</SidebarMenuButton>
							</DropdownMenuTrigger>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						<Button className="w-full mt-1.5 mb-1.5 h-[32px]">
							{" "}
							<Plus /> New Post
						</Button>
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-2">
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link to={item.url}>
											<button className="flex justify-center items-center gap-4">
												<item.icon size={18} strokeWidth={2}/>
												<span>{item.title}</span>
											</button>
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
