"use client"

import { RiArrowRightLine } from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"

import { DashboardGrowthChart } from "@/components/dashboard/dashboard-growth-chart"
import { DashboardSegmentChart } from "@/components/dashboard/dashboard-segment-chart"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardUsageChart } from "@/components/dashboard/dashboard-usage-chart"
import { useDashboardUser } from "@/components/dashboard/dashboard-user-provider"
import { RecentUsersCard } from "@/components/dashboard/recent-users-card"

function DashboardOverview() {
  const user = useDashboardUser()

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Overview</p>
          <h1 className="font-heading text-3xl font-semibold tracking-normal md:text-4xl">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            System status:{" "}
            <span className="font-medium text-emerald-500">
              All systems operational
            </span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            Download report
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <RiArrowRightLine data-icon="inline-start" className="rotate-180" />
            Go to workspace
          </Button>
        </div>
      </section>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="space-y-6">
          <DashboardUsageChart />
          <DashboardGrowthChart />
        </div>

        <div className="space-y-6">
          <RecentUsersCard />
          <DashboardSegmentChart />
        </div>
      </div>
    </main>
  )
}

export { DashboardOverview }
