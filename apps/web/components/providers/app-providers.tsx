"use client"

import * as React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { GlobalLoadingIndicator } from "@/components/loading/global-loading-indicator"
import { LoadingProvider } from "@/components/providers/loading-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { Toaster } from "@workspace/ui/components/sonner"

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <QueryProvider>
        <ThemeProvider>
          {children}
          <GlobalLoadingIndicator />
          <Toaster richColors />
        </ThemeProvider>
      </QueryProvider>
    </LoadingProvider>
  )
}

export { AppProviders }
