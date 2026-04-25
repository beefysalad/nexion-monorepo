import type { ReactNode } from "react"

type StackCardProps = {
  icon: ReactNode
  title: string
  description: string
}

export function StackCard({ icon, title, description }: StackCardProps) {
  return (
    <article className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-5 flex size-11 items-center justify-center rounded-2xl border border-border bg-background text-foreground">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </article>
  )
}
