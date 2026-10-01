import Link from "next/link"

import { Button } from "@workspace/ui/components/button"

import { getServerSession } from "@/lib/auth/session"

const navItems = [
  { href: "#stack", label: "Stack" },
  { href: "#setup", label: "Setup" },
  { href: "#contribute", label: "Contribute" },
]

// Fixed instead of sticky: the root html/body both set overflow-x-hidden,
// which prevents `position: sticky` from sticking. The layout reserves the
// 60px via the spacer in HomePage.
async function HomeHeader() {
  const session = await getServerSession()

  return (
    <header className="border-lp-rule bg-lp-paper fixed inset-x-0 top-0 z-50 h-[60px] border-b">
      <div className="mx-auto flex h-full max-w-[1200px] items-center gap-8 px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-base font-bold tracking-[-0.02em]"
        >
          <span aria-hidden className="bg-lp-accent size-2.5" />
          Nexion
        </Link>
        <nav
          aria-label="Sections"
          className="hidden items-center gap-6 sm:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-lp-muted hover:text-lp-ink text-sm transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {session ? (
            <Button
              asChild
              className="bg-lp-ink text-lp-paper hover:bg-lp-ink h-[34px] rounded-md px-3.5 text-sm font-medium shadow-none hover:opacity-85 hover:shadow-none"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="text-lp-ink hover:bg-lp-panel dark:hover:bg-lp-panel h-[34px] rounded-md px-3.5 text-sm font-medium shadow-none hover:shadow-none"
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button
                asChild
                className="bg-lp-ink text-lp-paper hover:bg-lp-ink h-[34px] rounded-md px-3.5 text-sm font-medium shadow-none hover:opacity-85 hover:shadow-none"
              >
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export { HomeHeader }
