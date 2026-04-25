import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { HomePage } from "@/components/home/home-page"

export default async function Page() {
  const { userId } = await auth()

  if (userId) {
    redirect("/dashboard")
  }

  return <HomePage />
}
