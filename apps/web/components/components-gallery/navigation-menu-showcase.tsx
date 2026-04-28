"use client"

import Link from "next/link"
import {
  RiAddLine,
  RiArrowRightUpLine,
  RiContactsBook3Line,
  RiFileChartLine,
  RiNotification3Line,
  RiQuestionLine,
  RiReceiptLine,
  RiScales3Line,
  RiSearchLine,
  RiSparklingLine,
} from "@remixicon/react"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu"
import { cn } from "@workspace/ui/lib/utils"

function NavigationMenuShowcase() {
  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-xl border p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Xero-style product header</p>
          <p className="text-muted-foreground text-sm">
            A full-width application bar with module navigation, utility
            actions, and a clean secondary workspace row.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border shadow-sm">
          <div className="bg-primary text-primary-foreground flex items-center justify-between gap-4 px-4 py-3">
            <div className="flex min-w-0 items-center gap-4">
              <div className="text-2xl font-semibold tracking-tight">atlas</div>

              <Button
                variant="secondary"
                className="h-10 rounded-full border-0 bg-white/10 px-4 text-primary-foreground hover:bg-white/16"
              >
                Atlas
              </Button>

              <NavigationMenu
                className="hidden max-w-full justify-start lg:flex"
                viewport={false}
              >
                <NavigationMenuList className="justify-start gap-0.5">
                  <HeaderLink label="Home" active />
                  <HeaderLink label="Sales" />
                  <HeaderLink label="Purchases" />
                  <HeaderLink label="Reporting" />

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-10 rounded-full bg-transparent px-4 text-primary-foreground hover:bg-white/10 focus:bg-white/10 data-popup-open:bg-white/10 data-open:bg-white/10">
                      Accounting
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-[680px]">
                      <div className="grid gap-2 p-1 md:grid-cols-2">
                        <MenuPanelLink
                          title="Chart of accounts"
                          description="Manage your codes and reporting structure."
                          href="#"
                          icon={RiScales3Line}
                        />
                        <MenuPanelLink
                          title="Manual journals"
                          description="Post adjustments and period-end corrections."
                          href="#"
                          icon={RiReceiptLine}
                        />
                        <MenuPanelLink
                          title="Reports"
                          description="Profit and loss, balance sheet, and ledger views."
                          href="#"
                          icon={RiFileChartLine}
                        />
                        <MenuPanelLink
                          title="Contacts"
                          description="Customers, suppliers, and account relationships."
                          href="#"
                          icon={RiContactsBook3Line}
                        />
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <HeaderLink label="Contacts" />
                  <HeaderLink label="Projects" />
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <HeaderIconButton icon={RiAddLine} label="Create" />
              <HeaderIconButton icon={RiSearchLine} label="Search" />
              <HeaderIconButton icon={RiSparklingLine} label="Quick actions" />
              <HeaderIconButton icon={RiQuestionLine} label="Help" />
              <HeaderIconButton
                icon={RiNotification3Line}
                label="Notifications"
              />
              <Avatar className="size-10 border border-white/20">
                <AvatarFallback className="bg-white/18 text-primary-foreground">
                  JP
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t bg-background px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-lg font-semibold tracking-tight">Atlas</p>
              <p className="text-muted-foreground text-sm">
                Inventory, purchasing, and accounting workspace
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-full border px-3 py-1.5 text-sm">
                You&apos;re in a free trial
              </div>
              <Button className="rounded-full px-5">Buy now</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Section header variant</p>
          <p className="text-muted-foreground text-sm">
            Same general feel, but more grounded for a module-level workspace
            screen.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border shadow-sm">
          <div className="bg-primary text-primary-foreground flex items-center justify-between gap-4 px-4 py-3">
            <div className="flex min-w-0 items-center gap-4">
              <div className="text-xl font-semibold tracking-tight">atlas</div>

              <NavigationMenu
                className="hidden max-w-full justify-start md:flex"
                viewport={false}
              >
                <NavigationMenuList className="justify-start gap-0.5">
                  <HeaderLink label="Overview" />
                  <HeaderLink label="Inventory" active />
                  <HeaderLink label="Sales" />
                  <HeaderLink label="Purchases" />
                  <HeaderLink label="Reports" />
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <Button
                variant="secondary"
                className="h-9 rounded-full border-0 bg-white/10 px-4 text-primary-foreground hover:bg-white/16"
              >
                + New item
              </Button>
              <HeaderIconButton icon={RiSearchLine} label="Search" />
              <Avatar className="size-9 border border-white/20">
                <AvatarFallback className="bg-white/18 text-primary-foreground">
                  JP
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="bg-surface-subtle border-t px-4 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1">
                <p className="text-xl font-semibold tracking-tight">
                  Products and services
                </p>
                <p className="text-muted-foreground text-sm">
                  Track stocked items, service lines, and operational supplies.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" className="rounded-full">
                  Import
                </Button>
                <Button variant="outline" className="rounded-full">
                  Export
                </Button>
                <Button className="rounded-full">New item</Button>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border bg-background p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="bg-background flex min-w-0 flex-1 items-center gap-3 rounded-xl border px-4 py-3">
                  <RiSearchLine className="text-muted-foreground size-4 shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    Search products and services
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium">
                  <Button variant="ghost" className="rounded-full px-4">
                    Filter
                  </Button>
                  <Button variant="ghost" className="rounded-full px-4">
                    Columns
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="bg-muted/40 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium">
                  Active
                </button>
                <button className="text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm">
                  Inventory tracked
                </button>
                <button className="text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm">
                  Sellable
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeaderLink({
  label,
  active = false,
}: {
  label: string
  active?: boolean
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        active={active}
        className={cn(
          navigationMenuTriggerStyle(),
          "h-10 rounded-full bg-transparent px-4 text-primary-foreground hover:bg-white/10 focus:bg-white/10 data-[active=true]:bg-white/12 data-[active=true]:hover:bg-white/14"
        )}
      >
        <Link href="#">{label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

function HeaderIconButton({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="hover:bg-white/16 flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors"
    >
      <Icon className="size-4.5" />
    </button>
  )
}

function MenuPanelLink({
  description,
  href,
  icon: Icon,
  title,
}: {
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
}) {
  return (
    <NavigationMenuLink asChild>
      <Link href={href} className="group rounded-2xl border p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
            <Icon className="size-4.5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{title}</p>
              <RiArrowRightUpLine className="text-muted-foreground size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="text-muted-foreground text-sm leading-5">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </NavigationMenuLink>
  )
}

export { NavigationMenuShowcase }
