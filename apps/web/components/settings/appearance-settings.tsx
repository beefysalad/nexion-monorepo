"use client"

import { useTheme } from "next-themes"
import {
  RiCheckLine,
  RiComputerLine,
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react"
import { BrandThemeSettings } from "@/components/dashboard/brand-theme-settings"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

const themeOptions = [
  {
    icon: RiSunLine,
    label: "Light",
    value: "light",
  },
  {
    icon: RiMoonLine,
    label: "Dark",
    value: "dark",
  },
  {
    icon: RiComputerLine,
    label: "System",
    value: "system",
  },
]

export function AppearanceSettings() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Display theme</CardTitle>
          <CardDescription>
            Select how Nexion looks on your device.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {themeOptions.map((option) => {
            const Icon = option.icon
            const isActive = theme === option.value

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setTheme(option.value)}
                className={cn(
                  "relative flex flex-col items-center gap-3 rounded-xl border bg-background p-6 text-center transition-all hover:border-primary/50 hover:bg-accent/50",
                  isActive && "border-primary bg-primary/[0.02] ring-1 ring-primary"
                )}
              >
                <div className={cn(
                  "flex size-12 items-center justify-center rounded-full bg-muted transition-colors",
                  isActive && "bg-primary/10 text-primary"
                )}>
                  <Icon className="size-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{option.label}</p>
                </div>
                {isActive && (
                  <div className="absolute right-3 top-3">
                    <RiCheckLine className="size-5 text-primary" />
                  </div>
                )}
              </button>
            )
          })}
        </CardContent>
      </Card>

      <BrandThemeSettings />
    </div>
  )
}
