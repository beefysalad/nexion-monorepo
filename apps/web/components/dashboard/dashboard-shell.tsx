"use client"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { RiMoonLine, RiSunLine } from "@remixicon/react"

import { getDashboardBreadcrumbSegments } from "@/components/dashboard/dashboard-breadcrumbs"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { AppearanceCustomizer } from "@/components/theme/appearance-customizer"
import { useBrandTheme } from "@/components/theme/brand-theme-provider"
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
import { Button } from "@workspace/ui/components/button"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"

type DashboardShellProps = {
  children: React.ReactNode
}

function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()
  const { appearance } = useBrandTheme()
  const { resolvedTheme, setTheme } = useTheme()
  const breadcrumbSegments = getDashboardBreadcrumbSegments(pathname)
  const isDark = resolvedTheme === "dark"

  return (
    <TooltipProvider>
      <SidebarProvider
        key={appearance.sidebarMode}
        defaultOpen={appearance.sidebarMode !== "icon"}
      >
        <div className="bg-app-canvas dark:bg-background flex min-h-screen w-full">
          <DashboardSidebar mode={appearance.sidebarMode} />
          <SidebarInset className="bg-app-canvas dark:bg-background min-w-0 overflow-x-hidden">
            <header className="bg-background/95 flex h-14 shrink-0 items-center gap-3 overflow-hidden border-b px-4">
              <SidebarTrigger />
              <div
                aria-hidden="true"
                className="bg-border my-auto h-4 w-px shrink-0"
              />
              <Breadcrumb className="min-w-0 flex-1 overflow-hidden">
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
              <div className="ml-auto flex shrink-0 items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={
                    isDark ? "Switch to light mode" : "Switch to dark mode"
                  }
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                  {isDark ? <RiSunLine /> : <RiMoonLine />}
                </Button>
                <AppearanceCustomizer />
              </div>
            </header>
            <main className="bg-app-canvas dark:bg-background min-w-0 flex-1 overflow-x-hidden">
              <div
                className={cn(
                  "min-h-full",
                  appearance.contentLayout === "contained" &&
                    "mx-auto w-full max-w-7xl"
                )}
              >
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export { DashboardShell }
