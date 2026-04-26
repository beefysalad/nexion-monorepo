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
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

const growthData = [
  { week: "W1", growth: 14 },
  { week: "W2", growth: 19 },
  { week: "W3", growth: 17 },
  { week: "W4", growth: 24 },
  { week: "W5", growth: 29 },
  { week: "W6", growth: 33 },
  { week: "W7", growth: 31 },
]

const growthChartConfig = {
  growth: {
    label: "Growth",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function DashboardGrowthChart() {
  return (
    <Card className="min-w-0 overflow-hidden rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Growth Trend</CardTitle>
        <CardDescription>
          Weekly active account expansion across the workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer
          config={growthChartConfig}
          className="h-[190px] w-full min-w-0 sm:h-[240px]"
        >
          <LineChart
            data={growthData}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={24}
              className="text-[10px] font-bold tracking-widest uppercase"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value) => `${value}%`}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="growth"
              stroke="var(--color-growth)"
              strokeWidth={3}
              dot={{ r: 4, fill: "var(--color-growth)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
