"use client"

import {
  RiAddLine,
  RiArrowRightLine,
  RiCheckLine,
  RiLoader4Line,
  RiMoonLine,
  RiSearchLine,
  RiSunLine,
} from "@remixicon/react"
import { useTheme } from "next-themes"

import { BrandThemeSettings } from "@/components/dashboard/brand-theme-settings"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Separator } from "@workspace/ui/components/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"
import { Skeleton } from "@workspace/ui/components/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

function ComponentsGalleryPage() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <TooltipProvider>
      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Design System POC</p>
            <h1 className="font-heading text-3xl font-semibold tracking-normal md:text-4xl">
              Components Gallery
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              A quick place to inspect available shadcn primitives against the
              active brand color, light mode, and dark mode.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? <RiSunLine /> : <RiMoonLine />}
            {isDark ? "Light mode" : "Dark mode"}
          </Button>
        </section>

        <BrandThemeSettings />

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>
                Primary, secondary, outline, ghost, destructive, and disabled
                states.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>
                <RiAddLine />
                Primary
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>
                <RiLoader4Line className="animate-spin" />
                Disabled
              </Button>
              <Button size="icon" aria-label="Confirm">
                <RiCheckLine />
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>
                Basic form surface with normal, disabled, and invalid states.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium">
                Search
                <div className="relative">
                  <RiSearchLine className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search components..." className="pl-9" />
                </div>
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="Disabled input" disabled />
                <Input aria-invalid placeholder="Invalid input" />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Cards</CardTitle>
              <CardDescription>
                Default card with text, actions, and borders.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Cards should read clearly in both themes without relying on glow
                or gradients.
              </p>
              <Button size="sm">
                Open
                <RiArrowRightLine data-icon="inline-end" />
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>
                Separator, tooltip, and compact status examples.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Webhook sync</span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  Online
                </span>
              </div>
              <Separator />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    Hover for tooltip
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Tooltips inherit the active theme.</TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Skeleton</CardTitle>
              <CardDescription>Loading placeholders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </CardContent>
          </Card>
        </section>

        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Sidebar Preview</CardTitle>
            <CardDescription>
              Mini preview of sidebar colors without leaving this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 overflow-hidden rounded-lg border">
              <SidebarProvider>
                <Sidebar collapsible="none">
                  <SidebarHeader>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive>
                          <RiCheckLine />
                          <span>Active item</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarHeader>
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupLabel>Preview</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {["Dashboard", "Components", "Settings"].map(
                            (item) => (
                              <SidebarMenuItem key={item}>
                                <SidebarMenuButton>
                                  <RiArrowRightLine />
                                  <span>{item}</span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            )
                          )}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
                <div className="flex flex-1 items-center justify-center bg-background p-6 text-sm text-muted-foreground">
                  Sidebar tokens are driven by the selected brand theme.
                </div>
              </SidebarProvider>
            </div>
          </CardContent>
        </Card>
      </main>
    </TooltipProvider>
  )
}

export { ComponentsGalleryPage }
