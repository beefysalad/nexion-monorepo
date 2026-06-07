"use client"

import { RiCheckLine } from "@remixicon/react"

import { useBrandTheme } from "@/components/theme/brand-theme-provider"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

function BrandThemeSettings() {
  const { activeTheme, presets, setBrandTheme } = useBrandTheme()

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Brand Theme</CardTitle>
        <CardDescription>
          Color presets that keep buttons readable in light and dark mode.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {presets.map((preset) => {
            const isActive = preset.id === activeTheme.id

            return (
              <button
                key={preset.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setBrandTheme(preset.id)}
                className={cn(
                  "bg-background hover:border-foreground/40 focus-visible:ring-ring/30 flex min-h-16 items-center gap-3 rounded-xl border p-3 text-left text-sm transition-colors focus-visible:ring-3 focus-visible:outline-none",
                  isActive && "border-foreground ring-foreground/20 ring-2"
                )}
              >
                <span
                  className="border-border size-7 shrink-0 rounded-full border"
                  style={{ backgroundColor: preset.swatch }}
                />
                <span className="min-w-0 flex-1 truncate font-medium">
                  {preset.label}
                </span>
                {isActive ? (
                  <RiCheckLine className="text-primary size-4" />
                ) : null}
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export { BrandThemeSettings }
