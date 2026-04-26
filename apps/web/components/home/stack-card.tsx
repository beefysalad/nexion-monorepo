import type { ReactNode } from "react"
import { Card, CardContent } from "@workspace/ui/components/card"

type StackCardProps = {
  icon: ReactNode
  title: string
  description: string
}

export function StackCard({ icon, title, description }: StackCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      {/* Hover glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardContent className="p-6">
        <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-border bg-muted text-foreground/70 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary">
          {icon}
        </div>
        <h3 className="mb-2 text-base font-bold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
