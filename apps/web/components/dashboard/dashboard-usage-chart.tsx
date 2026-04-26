"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Bar, BarChart, CartesianGrid, XAxis, Rectangle } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"

import { useUsageData } from "@/hooks/dashboard/use-usage-data"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#10b981",
  },
} satisfies ChartConfig

export function DashboardUsageChart() {
  const { data, currencySymbol } = useUsageData()

  return (
    <Card className="min-w-0 overflow-hidden rounded-xl shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Platform Revenue</CardTitle>
            <CardDescription>
              Total accounting revenue across all synced accounts.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              Live
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer
          config={chartConfig}
          className="h-[190px] w-full min-w-0 sm:h-[240px]"
        >
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={24}
              className="text-[10px] font-bold tracking-widest uppercase"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value) =>
                    `${currencySymbol}${Number(value).toLocaleString()}`
                  }
                />
              }
            />
            <Bar
              dataKey="revenue"
              radius={[4, 4, 0, 0]}
              strokeWidth={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
