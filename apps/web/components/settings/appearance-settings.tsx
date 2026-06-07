"use client"

import { BrandThemeSettings } from "@/components/dashboard/brand-theme-settings"
import { AppearanceCustomizer } from "@/components/theme/appearance-customizer"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Theme preset, scale, radius, layout, and sidebar preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Workspace appearance</p>
            <p className="text-muted-foreground text-sm">
              Open the customizer to tune the dashboard shell.
            </p>
          </div>
          <AppearanceCustomizer />
        </CardContent>
      </Card>

      <BrandThemeSettings />
    </div>
  )
}
