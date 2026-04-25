"use client"

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

function AuthHeader() {
  const pathname = usePathname()

  if (pathname.startsWith("/dashboard")) {
    return null
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Nexion
        </Link>
        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
              <Button size="sm">Sign up</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  )
}

export { AuthHeader }
