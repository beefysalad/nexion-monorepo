import { redirect } from "next/navigation"

import { getServerSession } from "@/lib/auth/session"

type DashboardUser = {
  email: string
  imageUrl?: string
  name: string
}

// Resolves the signed-in user for protected routes, or redirects to sign in.
async function getCurrentDashboardUser(): Promise<DashboardUser> {
  const session = await getServerSession()

  if (!session) {
    redirect("/sign-in")
  }

  return {
    name: session.user.name,
    email: session.user.email,
    imageUrl: session.user.image ?? undefined,
  }
}

export { getCurrentDashboardUser }
export type { DashboardUser }
