import { cn } from "@workspace/ui/lib/utils"

type LandingSectionProps = {
  id?: string
  label: string
  className?: string
  children: React.ReactNode
}

function LandingSection({
  id,
  label,
  className,
  children,
}: LandingSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "border-lp-rule scroll-mt-[60px] border-b py-[88px]",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-x-12 gap-y-6 px-6">
        <p className="text-lp-muted w-[200px] flex-none font-mono text-[13px] font-medium">
          {label}
        </p>
        <div className="flex min-w-0 flex-[1_1_640px] flex-col gap-12">
          {children}
        </div>
      </div>
    </section>
  )
}

function LandingHeading({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <h2
      className={cn(
        "max-w-[760px] text-[clamp(32px,4.2vw,52px)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance",
        className
      )}
    >
      {children}
    </h2>
  )
}

export { LandingHeading, LandingSection }
