import { auth } from "@clerk/nextjs/server"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardUserProvider } from "@/components/dashboard/dashboard-user-provider"
import { BrandThemeProvider } from "@/components/theme/brand-theme-provider"
import { getCurrentDashboardUser } from "@/lib/auth/current-dashboard-user"

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await auth.protect()

  const user = await getCurrentDashboardUser()

  return (
    <BrandThemeProvider>
      <DashboardUserProvider user={user}>
        <DashboardShell>{children}</DashboardShell>
      </DashboardUserProvider>
    </BrandThemeProvider>
  )
}
