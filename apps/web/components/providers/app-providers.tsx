"use client"

import * as React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { GlobalLoadingIndicator } from "@/components/loading/global-loading-indicator"
import { LoadingProvider } from "@/components/providers/loading-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { UserSyncProvider } from "@/components/providers/user-sync-provider"
import { Toaster } from "@workspace/ui/components/sonner"

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <QueryProvider>
        <UserSyncProvider>
          <ThemeProvider>
            {children}
            <GlobalLoadingIndicator />
            <Toaster richColors />
          </ThemeProvider>
        </UserSyncProvider>
      </QueryProvider>
    </LoadingProvider>
  )
}

export { AppProviders }
