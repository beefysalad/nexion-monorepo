"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"
import { Cell, Pie, PieChart } from "recharts"

const segmentData = [
  {
    segment: "Enterprise",
    value: 46,
    fill: "var(--color-enterprise)",
  },
  {
    segment: "Growth",
    value: 31,
    fill: "var(--color-growth)",
  },
  {
    segment: "Starter",
    value: 23,
    fill: "var(--color-starter)",
  },
]

const segmentChartConfig = {
  enterprise: {
    label: "Enterprise",
    color: "var(--chart-1)",
  },
  growth: {
    label: "Growth",
    color: "var(--chart-2)",
  },
  starter: {
    label: "Starter",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function DashboardSegmentChart() {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Customer Mix Donut</CardTitle>
        <CardDescription>
          Active account share by subscription segment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ChartContainer config={segmentChartConfig} className="mx-auto h-[240px] w-full">
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="segment"
                  hideLabel
                  formatter={(value, name) => (
                    <>
                      <span className="text-muted-foreground">{name}</span>
                      <span className="font-mono font-medium text-foreground">
                        {value}%
                      </span>
                    </>
                  )}
                />
              }
            />
            <Pie
              data={segmentData}
              dataKey="value"
              nameKey="segment"
              innerRadius={56}
              outerRadius={84}
              paddingAngle={3}
              strokeWidth={4}
            >
              {segmentData.map((entry) => (
                <Cell key={entry.segment} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="segment" />} />
          </PieChart>
        </ChartContainer>

        <div className="grid gap-3 sm:grid-cols-3">
          {segmentData.map((item) => (
            <div key={item.segment} className="rounded-xl border bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">{item.segment}</p>
              <p className="mt-1 text-lg font-semibold">{item.value}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
