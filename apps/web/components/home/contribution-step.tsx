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
    <Card className="group relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.02] hover:shadow-2xl hover:shadow-primary/5">
      <CardContent className="flex items-start gap-6 p-6">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background font-mono text-lg font-black text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/5 group-hover:text-primary">
          {number}
        </div>
        <div className="space-y-1 pt-1 text-left">
          <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
