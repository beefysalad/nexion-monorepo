import { currentUser } from "@clerk/nextjs/server"

async function getCurrentDashboardUser() {
  const user = await currentUser()
  const primaryEmail =
    user?.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    ) ?? user?.emailAddresses[0]

  return {
    name:
      [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
      user?.username ||
      primaryEmail?.emailAddress ||
      "Nexion user",
    email: primaryEmail?.emailAddress ?? "Signed in",
  }
}

export { getCurrentDashboardUser }
