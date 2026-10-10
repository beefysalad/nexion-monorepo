import { redirect } from "next/navigation"

import { SignUpForm } from "@/components/auth/sign-up-form"
import { getServerSession } from "@/lib/auth/session"

export default async function Page() {
  if (await getServerSession()) {
    redirect("/dashboard")
  }

  return <SignUpForm />
}
