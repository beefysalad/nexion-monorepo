import { auth } from "@clerk/nextjs/server"

import { ComponentsGalleryPage } from "@/components/components-gallery/components-gallery-page"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { getCurrentDashboardUser } from "@/lib/auth/current-dashboard-user"

export default async function ComponentsPage() {
  await auth.protect()

  const user = await getCurrentDashboardUser()

  return (
    <DashboardShell user={user}>
      <ComponentsGalleryPage />
    </DashboardShell>
  )
}
