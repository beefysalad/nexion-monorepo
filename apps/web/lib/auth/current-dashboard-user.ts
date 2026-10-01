type DashboardUser = {
  email: string
  imageUrl?: string
  name: string
}

// TODO: no auth provider is configured. This is the single seam for the
// signed-in user: resolve the real session here and redirect unauthenticated
// visitors (also wire this into `app/(protected)/layout.tsx`).
async function getCurrentDashboardUser(): Promise<DashboardUser> {
  return {
    name: "Nexion user",
    email: "user@example.com",
  }
}

export { getCurrentDashboardUser }
export type { DashboardUser }
