import { cloneElement } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavItem } from "../types";

type SidebarItemProps = {
  isOpen: boolean;
  isActive: boolean;
  navItem: NavItem;
};

const AppSidebarItem = ({ navItem }: SidebarItemProps) => {
  return (
    <>
      {/* {navItem.separator && <Separator />} */}
      <SidebarMenuItem key={navItem.title}>
        <SidebarMenuButton asChild>
          <a href={navItem.href}>
            {cloneElement(navItem.icon, {
              className: "h-5 w-5",
            })}
            <span>{navItem.title}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
};

export { AppSidebarItem };
