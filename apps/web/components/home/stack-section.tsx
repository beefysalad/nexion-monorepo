import {
  LandingHeading,
  LandingSection,
} from "@/components/home/landing-section"

const stackRows = [
  {
    layer: "Frontend",
    tool: "Next.js 16 App Router",
    description:
      "shadcn/ui through the shared workspace UI package. RSC-ready.",
    path: "apps/web",
  },
  {
    layer: "API",
    tool: "NestJS REST",
    description: "Thin controllers, injectable services, Prisma repositories.",
    path: "apps/api",
  },
  {
    layer: "Database",
    tool: "Postgres + Prisma",
    description:
      "Dockerized Postgres, Prisma configured and ready for migrations.",
    path: ":5433",
  },
  {
    layer: "Server state",
    tool: "TanStack Query",
    description: "Dedicated hooks with explicit loading and error states.",
    path: "web/hooks",
  },
  {
    layer: "Forms",
    tool: "React Hook Form + Zod",
    description: "Typed, schema-driven validation, pre-installed.",
    path: "lib/validations",
  },
  {
    layer: "Auth",
    tool: "Better Auth",
    description:
      "Email and password sessions hosted by the API. Routes guarded on both ends.",
    path: "api/src/auth",
  },
]

function StackSection() {
  return (
    <LandingSection id="stack" label="01 — The stack">
      <LandingHeading>
        Everything is wired.{" "}
        <span className="text-lp-muted">Nothing is left to configure.</span>
      </LandingHeading>
      <dl className="border-lp-ink border-t">
        {stackRows.map((row) => (
          <div
            key={row.layer}
            className="border-lp-rule flex flex-wrap items-baseline gap-x-8 gap-y-1.5 border-b py-[22px]"
          >
            <dt className="text-lp-muted w-[140px] flex-none font-mono text-[13px] font-medium">
              {row.layer}
            </dt>
            <dd className="min-w-[200px] flex-[1_1_200px] text-lg font-semibold tracking-[-0.015em]">
              {row.tool}
            </dd>
            <dd className="text-lp-muted min-w-[300px] flex-[2_1_300px] text-[15px] leading-[1.55]">
              {row.description}
            </dd>
            <dd className="w-[150px] flex-none font-mono text-[13px]">
              {row.path}
            </dd>
          </div>
        ))}
      </dl>
    </LandingSection>
  )
}

export { StackSection }
