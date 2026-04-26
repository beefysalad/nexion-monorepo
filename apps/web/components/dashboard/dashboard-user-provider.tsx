"use client"

import { createContext, useContext } from "react"

import type { DashboardUser } from "@/lib/auth/current-dashboard-user"

const DashboardUserContext = createContext<DashboardUser | null>(null)

function DashboardUserProvider({
  children,
  user,
}: {
  children: React.ReactNode
  user: DashboardUser
}) {
  return (
    <DashboardUserContext.Provider value={user}>
      {children}
    </DashboardUserContext.Provider>
  )
}

function useDashboardUser() {
  const user = useContext(DashboardUserContext)

  if (!user) {
    throw new Error(
      "useDashboardUser must be used within DashboardUserProvider"
    )
  }

  return user
}

export { DashboardUserProvider, useDashboardUser }
