"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { dashboardNavItems } from "@/components/dashboard/dashboard-data"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { TooltipProvider } from "@workspace/ui/components/tooltip"

type DashboardShellProps = {
  children: React.ReactNode
}

function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()
  const currentItem =
    dashboardNavItems.find((item) => item.href === pathname) ??
    dashboardNavItems[0]

  return (
    <TooltipProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset className="min-w-0 overflow-x-hidden">
          <header className="flex h-14 shrink-0 items-center gap-3 overflow-hidden border-b px-4">
            <SidebarTrigger />
            <div aria-hidden="true" className="my-auto h-4 w-px shrink-0 bg-border" />
            <Breadcrumb className="min-w-0 overflow-hidden">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard">Workspace</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="truncate">
                    {currentItem?.label ?? "Overview"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export { DashboardShell }
