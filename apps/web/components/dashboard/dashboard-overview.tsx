"use client"

import { RiArrowRightLine } from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import {
  dashboardActivity,
  dashboardStats,
} from "@/components/dashboard/dashboard-data"
import { BrandThemeSettings } from "@/components/dashboard/brand-theme-settings"

type DashboardOverviewProps = {
  user: {
    name: string
  }
}

function DashboardOverview({ user }: DashboardOverviewProps) {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Dashboard</p>
          <h1 className="font-heading text-3xl font-semibold tracking-normal md:text-4xl">
            Welcome back, {user.name}
          </h1>
        </div>
        <Button>
          New workspace
          <RiArrowRightLine data-icon="inline-end" />
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon

          return (
            <Card key={stat.label} className="rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Icon className="size-4 text-primary" />
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              The authenticated app surface is ready for real product work.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              "Clerk auth is connected",
              "Webhook sync is receiving events",
              "API user records are ready to build from",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3 text-sm"
              >
                <span>{item}</span>
                <span className="text-xs font-medium text-primary">Done</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Latest workspace events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardActivity.map((item) => (
              <div key={item} className="flex gap-3 text-sm">
                <span className="mt-1 size-2 rounded-full bg-primary" />
                <div>
                  <p className="font-medium">{item}</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <BrandThemeSettings />
    </main>
  )
}

export { DashboardOverview }
