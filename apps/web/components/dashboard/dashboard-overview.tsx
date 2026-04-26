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
            System status: <span className="text-emerald-500 font-medium">All systems operational</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Download report
          </Button>
          <Button size="sm">
            <RiArrowRightLine data-icon="inline-start" className="rotate-180" />
            Go to workspace
          </Button>
        </div>
      </section>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="space-y-6">
          <DashboardUsageChart />
          
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">System Health</CardTitle>
              <CardDescription>
                API and infrastructure performance across regions.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {[
                { label: "API Latency", value: "42ms", state: "Optimal" },
                { label: "Database Load", value: "12%", state: "Healthy" },
                { label: "Webhook Success", value: "99.9%", state: "Healthy" },
                { label: "Memory Usage", value: "1.2GB", state: "Normal" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl border bg-muted/20 p-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-bold">{item.value}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                    {item.state}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <RecentUsersCard />
        </div>
      </div>
    </main>
  )
}

export { DashboardOverview }
