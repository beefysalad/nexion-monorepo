import Link from "next/link"

import { Button } from "@workspace/ui/components/button"

function HomeHeader() {
  return (
    <header className="border-border bg-background/80 fixed inset-x-0 top-0 z-50 border-b px-6 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Nexion
        </Link>
        <Button asChild size="sm">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </header>
  )
}

export { HomeHeader }
