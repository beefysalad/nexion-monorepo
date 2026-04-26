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
        <div className="h-[200px] w-full bg-muted/5 relative flex items-end gap-1.5 px-6 pb-6">
          {[...Array(24)].map((_, i) => {
            const height = Math.floor(Math.random() * 85) + 15
            // Curated vibrant colors that ignore the theme branding
            const colors = [
              "bg-emerald-400", 
              "bg-sky-400", 
              "bg-violet-500", 
              "bg-rose-500", 
              "bg-amber-400",
              "bg-fuchsia-500",
              "bg-cyan-400"
            ]
            const colorClass = colors[i % colors.length]
            
            return (
              <div 
                key={i} 
                className={`flex-1 ${colorClass} rounded-t-md transition-all hover:scale-x-110 hover:brightness-110 cursor-pointer group relative`}
                style={{ height: `${height}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl z-10 whitespace-nowrap">
                  ₱{Math.floor(height * 1250).toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex justify-between px-6 pb-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:59</span>
        </div>
      </CardContent>
    </Card>
  )
}
