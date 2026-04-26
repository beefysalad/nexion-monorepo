"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { RiFlashlightLine } from "@remixicon/react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar"

import { dashboardNavItems } from "@/components/dashboard/dashboard-data"

type DashboardSidebarProps = {
  user: {
    email: string
    name: string
  }
}

function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-0">
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          <SidebarMenuItem className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
            <SidebarMenuButton
              asChild
              tooltip="Nexion"
              className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!"
            >
              <Link href="/dashboard">
                {/* Expanded: icon + text */}
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground group-data-[collapsible=icon]:hidden">
                  <RiFlashlightLine className="size-5" />
                </span>
                <span className="grid min-w-0 leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">Nexion</span>
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    Workspace
                  </span>
                </span>

                {/* Collapsed: just "N" */}
                <span className="hidden size-10 items-center justify-center rounded-full bg-sidebar-primary text-lg font-black text-sidebar-primary-foreground group-data-[collapsible=icon]:flex">
                  N
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-0">
        <SidebarGroup className="group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:pt-0">
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent className="group-data-[collapsible=icon]:w-full">
            <SidebarMenu className="group-data-[collapsible=icon]:items-center">
              {dashboardNavItems.map((item, index) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href &&
                  (item.href !== "/dashboard" || index === 0)

                return (
                  <SidebarMenuItem
                    key={item.label}
                    className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center"
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
                    >
                      <Link href={item.href}>
                        <Icon className="size-5" />
                        <span className="group-data-[collapsible=icon]:hidden [[data-collapsible=icon]_&]:hidden">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="shrink-0 overflow-visible group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:pt-2 group-data-[collapsible=icon]:pb-4">
        <div className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-1.5 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:overflow-visible group-data-[collapsible=icon]:p-0">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-7",
                userButtonAvatarBox: "size-7",
                userButtonTrigger: "size-8",
              },
            }}
          />
          <div className="min-w-0 group-data-[collapsible=icon]:hidden [[data-collapsible=icon]_&]:hidden">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-sidebar-foreground/70">
              {user.email}
            </p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export { DashboardSidebar }
