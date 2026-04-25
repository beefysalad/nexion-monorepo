"use client"

import * as React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { GlobalLoadingIndicator } from "@/components/loading/global-loading-indicator"
import { LoadingProvider } from "@/components/providers/loading-provider"
import { QueryProvider } from "@/components/providers/query-provider"

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <QueryProvider>
        <ThemeProvider>
          {children}
          <GlobalLoadingIndicator />
        </ThemeProvider>
      </QueryProvider>
    </LoadingProvider>
  )
}

export { AppProviders }
