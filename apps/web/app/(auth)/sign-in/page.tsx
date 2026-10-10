import { redirect } from "next/navigation"

import { SignInForm } from "@/components/auth/sign-in-form"
import { getServerSession } from "@/lib/auth/session"

export default async function Page() {
  if (await getServerSession()) {
    redirect("/dashboard")
  }

  return <SignInForm />
}
