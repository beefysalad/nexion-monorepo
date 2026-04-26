import { currentUser } from "@clerk/nextjs/server"

type DashboardUser = {
  email: string
  imageUrl?: string
  name: string
}

async function getCurrentDashboardUser(): Promise<DashboardUser> {
  const user = await currentUser()
  const primaryEmail =
    user?.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    ) ?? user?.emailAddresses[0]

  return {
    imageUrl: user?.imageUrl,
    name:
      [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
      user?.username ||
      primaryEmail?.emailAddress ||
      "Nexion user",
    email: primaryEmail?.emailAddress ?? "Signed in",
  }
}

export { getCurrentDashboardUser }
export type { DashboardUser }
