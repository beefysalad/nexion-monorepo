import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

type AuthCardProps = {
  title: string
  description: string
  footer: React.ReactNode
  children: React.ReactNode
}

function AuthCard({ title, description, footer, children }: AuthCardProps) {
  return (
    <main className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 px-6 py-12">
      <Link href="/" className="text-sm font-semibold tracking-tight">
        Nexion
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-heading text-2xl font-semibold tracking-normal">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
          <p className="text-muted-foreground text-center text-sm">{footer}</p>
        </CardContent>
      </Card>
    </main>
  )
}

export { AuthCard }
