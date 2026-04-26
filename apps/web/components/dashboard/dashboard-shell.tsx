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
import { Separator } from "@workspace/ui/components/separator"
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
          <header className="flex h-auto min-h-14 shrink-0 flex-wrap items-center gap-3 border-b px-4 py-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-5" />
            <Breadcrumb className="min-w-0">
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
