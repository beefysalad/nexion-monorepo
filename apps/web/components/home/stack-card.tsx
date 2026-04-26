import type { ReactNode } from "react"

import { Card, CardContent } from "@workspace/ui/components/card"

type StackCardProps = {
  icon: ReactNode
  title: string
  description: string
}

export function StackCard({ icon, title, description }: StackCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-lg border-border bg-card transition-colors hover:border-primary/40">
      <CardContent className="p-8">
        <div className="mb-6 flex size-14 items-center justify-center rounded-2xl border border-border bg-background text-muted-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold tracking-tight transition-colors duration-500 group-hover:text-primary">
          {title}
        </h3>
        
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
