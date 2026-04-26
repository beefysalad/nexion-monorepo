"use client"

import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { TooltipProvider } from "@workspace/ui/components/tooltip"

type DashboardShellProps = {
  user: {
    email: string
    name: string
  }
}

function DashboardShell({ user }: DashboardShellProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <DashboardSidebar user={user} />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
            <SidebarTrigger />
          </header>
          <DashboardOverview user={user} />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export { DashboardShell }
