"use client"

import { useRouter } from "next/navigation"
import { RiLogoutBoxRLine } from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"

import { authClient } from "@/lib/auth-client"

function SignOutButton({ className }: { className?: string }) {
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.replace("/sign-in")
    router.refresh()
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label="Sign out"
      title="Sign out"
      className={className}
      onClick={handleSignOut}
    >
      <RiLogoutBoxRLine />
    </Button>
  )
}

export { SignOutButton }
