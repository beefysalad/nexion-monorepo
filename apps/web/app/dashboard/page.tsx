import { auth, currentUser } from "@clerk/nextjs/server"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default async function DashboardPage() {
  await auth.protect()

  const user = await currentUser()
  const primaryEmail =
    user?.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    ) ?? user?.emailAddresses[0]

  return (
    <DashboardShell
      user={{
        name:
          [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
          user?.username ||
          primaryEmail?.emailAddress ||
          "Nexion user",
        email: primaryEmail?.emailAddress ?? "Signed in",
      }}
    />
  )
}
