"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export function DashboardUsageChart() {
  return (
    <Card className="rounded-xl shadow-sm overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Platform Usage</CardTitle>
            <CardDescription>
              Real-time events processed across all sync nodes.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[200px] w-full bg-muted/10 relative flex items-end gap-1 px-4 pb-4">
          {[...Array(20)].map((_, i) => {
            const height = Math.floor(Math.random() * 80) + 20
            return (
              <div 
                key={i} 
                className="flex-1 bg-primary/20 rounded-t-sm transition-all hover:bg-primary/40 group relative"
                style={{ height: `${height}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {Math.floor(height * 2.4)}%
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
