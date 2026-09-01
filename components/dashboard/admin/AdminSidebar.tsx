"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Overview",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Gear",
    href: "/dashboard/admin/gear",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/dashboard/admin/orders",
    icon: ShoppingBag,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>GearUp Admin</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard/admin" &&
                    pathname.startsWith(item.href + "/"));

                return (
                  <SidebarMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <Icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
