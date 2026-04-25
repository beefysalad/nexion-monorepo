"use client"

import * as React from "react"

import { useSyncCurrentUser } from "@/hooks/api/use-sync-current-user"

function UserSyncProvider({ children }: { children: React.ReactNode }) {
  useSyncCurrentUser()

  return children
}

export { UserSyncProvider }
