"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { signInPath, signUpPath } from "@/paths";
import { getActivePath } from "@/utils/get-active-path";
import { usePathname } from "next/navigation";
import { navItems } from "../constants";
import { AppSidebarItem } from "./app-sidebar-item";

const AppSidebar = () => {
  const { user, isFetched } = useAuth();
  const pathName = usePathname();

  const { activeIndex } = getActivePath(
    pathName,
    navItems.map((navItem) => navItem.href),
    [signInPath(), signUpPath()]
  );

  if (!user || !isFetched) {
    return null;
  }

  return (
    <Sidebar className="pt-[61px] animate-sidebar-from-left" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((navItem, index) => (
                <AppSidebarItem
                  key={navItem.title}
                  isOpen={true}
                  isActive={activeIndex === index}
                  navItem={navItem}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export { AppSidebar };
