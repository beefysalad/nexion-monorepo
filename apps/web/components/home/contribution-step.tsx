import { Card, CardContent } from "@workspace/ui/components/card"

type ContributionStepProps = {
  number: string
  title: string
  description: string
}

export function ContributionStep({
  number,
  title,
  description,
}: ContributionStepProps) {
  return (
    <Card className="group transition-all hover:border-primary/30 hover:bg-muted/50 hover:shadow-md">
      <CardContent className="flex gap-5 p-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-border bg-background font-mono text-xs font-bold text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
          {number}
        </div>
        <div>
          <h3 className="font-semibold transition-colors group-hover:text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground transition-colors group-hover:text-muted-foreground/80">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
