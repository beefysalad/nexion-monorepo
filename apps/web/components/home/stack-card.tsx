import type { ReactNode } from "react"

import { Card, CardContent } from "@workspace/ui/components/card"

type StackCardProps = {
  icon: ReactNode
  title: string
  description: string
}

export function StackCard({ icon, title, description }: StackCardProps) {
  return (
    <Card className="group relative transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-muted/50 hover:shadow-xl">
      <div className="absolute inset-0 -z-10 rounded-[inherit] bg-primary/5 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
      <CardContent className="p-6">
        <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-border bg-background text-muted-foreground transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <h3 className="text-lg font-bold transition-colors group-hover:text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground transition-colors group-hover:text-muted-foreground/80">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
