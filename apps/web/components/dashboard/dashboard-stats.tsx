"use client"

import {
  RiBillLine,
  RiMoneyDollarCircleLine,
  RiPieChartLine,
} from "@remixicon/react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

const dashboardStats = [
  {
    icon: RiMoneyDollarCircleLine,
    label: "Total Revenue",
    value: "₱128,430.00",
    trend: "+14.2%",
  },
  {
    icon: RiBillLine,
    label: "Outstanding",
    value: "₱12,340.50",
    trend: "3 Overdue",
  },
  {
    icon: RiPieChartLine,
    label: "Net Profit",
    value: "₱45,210.00",
    trend: "+8.1%",
  },
]

export function DashboardStats() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {dashboardStats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card key={stat.label} className="rounded-xl shadow-sm border-none bg-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <Icon className="size-3.5" />
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
