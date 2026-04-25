"use client"

import * as React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { GlobalLoadingIndicator } from "@/components/loading/global-loading-indicator"
import { LoadingProvider } from "@/components/providers/loading-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { UserSyncProvider } from "@/components/providers/user-sync-provider"

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <QueryProvider>
        <UserSyncProvider>
          <ThemeProvider>
            {children}
            <GlobalLoadingIndicator />
          </ThemeProvider>
        </UserSyncProvider>
      </QueryProvider>
    </LoadingProvider>
  )
}

export { AppProviders }
