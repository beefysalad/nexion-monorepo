type ContributionStepProps = {
  number: string
  title: string
  description: string
}

function ContributionStep({
  number,
  title,
  description,
}: ContributionStepProps) {
  return (
    <article className="flex gap-5 rounded-3xl border border-border bg-card p-5 shadow-sm">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-border bg-background font-mono text-xs font-semibold text-muted-foreground">
        {number}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          {description}
        </p>
      </div>
    </article>
  )
}

export { ContributionStep }
export type { ContributionStepProps }
