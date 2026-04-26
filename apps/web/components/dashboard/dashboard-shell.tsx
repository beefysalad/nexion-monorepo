"use client"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { getDashboardBreadcrumbSegments } from "@/components/dashboard/dashboard-breadcrumbs"
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
  const breadcrumbSegments = getDashboardBreadcrumbSegments(pathname)

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
                {breadcrumbSegments.map((segment, index) => {
                  const isCurrent = index === breadcrumbSegments.length - 1

                  return (
                    <Fragment key={segment.href}>
                      <BreadcrumbSeparator className="hidden sm:block" />
                      <BreadcrumbItem className="min-w-0">
                        {isCurrent ? (
                          <BreadcrumbPage className="truncate">
                            {segment.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={segment.href} className="truncate">
                              {segment.label}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </Fragment>
                  )
                })}
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
