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
    <Card className="group hover:border-primary/50 hover:bg-primary/[0.02] hover:shadow-primary/5 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <CardContent className="flex items-start gap-6 p-6">
        <div className="border-border bg-background text-muted-foreground group-hover:border-primary group-hover:bg-primary/5 group-hover:text-primary flex size-12 shrink-0 items-center justify-center rounded-xl border font-mono text-lg font-black transition-all duration-300 group-hover:scale-110">
          {number}
        </div>
        <div className="space-y-1 pt-1 text-left">
          <h3 className="text-foreground group-hover:text-primary text-lg font-bold tracking-tight transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
