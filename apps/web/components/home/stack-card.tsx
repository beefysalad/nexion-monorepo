import type { ReactNode } from "react"
import { Card, CardContent } from "@workspace/ui/components/card"

type StackCardProps = {
  icon: ReactNode
  title: string
  description: string
}

export function StackCard({ icon, title, description }: StackCardProps) {
  return (
    <Card className="group border-border bg-card hover:border-primary/40 hover:shadow-primary/5 relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Hover glow */}
      <div className="from-primary/5 absolute inset-0 -z-10 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardContent className="p-6">
        <div className="border-border bg-muted text-foreground/70 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary mb-4 flex size-10 items-center justify-center rounded-xl border transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-foreground mb-2 text-base font-bold tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
