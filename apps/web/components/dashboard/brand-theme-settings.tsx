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
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Brand Theme</CardTitle>
        <CardDescription>
          Color presets that keep buttons readable in light and dark mode.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
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
                  "bg-background hover:border-primary flex min-h-20 flex-col items-start justify-between rounded-lg border p-3 text-left text-sm transition-colors",
                  isActive && "border-primary ring-ring/25 ring-2"
                )}
              >
                <span
                  className="border-border size-7 rounded-full border"
                  style={{ backgroundColor: preset.swatch }}
                />
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="font-medium">{preset.label}</span>
                  {isActive ? (
                    <RiCheckLine className="text-primary size-4" />
                  ) : null}
                </span>
              </button>
            )
          })}
        </div>

        <div className="bg-surface-subtle flex flex-wrap items-center gap-3 rounded-lg border p-4">
          <span className="text-muted-foreground text-sm">
            Active preset: {activeTheme.label}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export { BrandThemeSettings }
