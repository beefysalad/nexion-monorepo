"use client"

import { useMemo } from "react"

export interface UsageDataPoint {
  time: string
  revenue: number
  fill: string
}

const COLORS = [
  "#10b981", // emerald
  "#38bdf8", // sky
  "#8b5cf6", // violet
  "#f43f5e", // rose
  "#fbbf24", // amber
  "#d946ef", // fuchsia
  "#22d3ee", // cyan
]

export function useUsageData() {
  const data = useMemo(() => {
    return [...Array(12)].map((_, i) => {
      const hour = i * 2
      const time = `${hour.toString().padStart(2, "0")}:00`
      const revenue = Math.floor(Math.random() * 85000) + 15000
      return {
        time,
        revenue,
        fill: COLORS[i % COLORS.length],
      }
    })
  }, [])

  return {
    data,
    currencySymbol: "₱",
  }
}
