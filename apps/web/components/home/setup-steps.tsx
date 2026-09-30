import {
  LandingHeading,
  LandingSection,
} from "@/components/home/landing-section"

type CodeLine = { prefix?: string; text: string }

const steps: {
  number: string
  title: string
  description: string
  code: CodeLine[]
}[] = [
  {
    number: "1",
    title: "Configure env files",
    description:
      "Copy the examples. Point the frontend at the API, and the API at Postgres.",
    code: [
      { prefix: "$", text: "cp .env.example .env" },
      { prefix: "$", text: "cp apps/web/.env.example apps/web/.env.local" },
      { prefix: "$", text: "cp apps/api/.env.example apps/api/.env" },
    ],
  },
  {
    number: "2",
    title: "Start local services",
    description: "Postgres runs in Docker. Both apps start from the root.",
    code: [
      { prefix: "$", text: "docker compose up -d postgres" },
      { prefix: "$", text: "npm run dev:apps" },
    ],
  },
  {
    number: "3",
    title: "Build your features",
    description: "Keep routes thin. Everything else has a place.",
    code: [
      { prefix: "queries", text: "→ hooks/" },
      { prefix: "requests", text: "→ lib/api/" },
      { prefix: "schemas", text: "→ lib/validations/" },
    ],
  },
]

function SetupSteps() {
  return (
    <LandingSection
      id="setup"
      label="02 — Getting started"
      className="bg-lp-panel"
    >
      <LandingHeading>Three steps. Intentionally boring.</LandingHeading>
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-8">
        {steps.map((step) => (
          <li key={step.number} className="flex min-w-0 flex-col gap-3.5">
            <div className="border-lp-ink flex items-baseline gap-3 border-b pb-3.5">
              <span className="font-mono text-[13px] font-semibold">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
            </div>
            <p className="text-lp-muted text-[15px] leading-[1.55]">
              {step.description}
            </p>
            <pre className="bg-lp-code-bg text-lp-code-fg overflow-x-auto rounded-lg px-4 py-3.5 font-mono text-[12.5px] leading-[1.8]">
              {step.code.map((line) => (
                <div key={line.text}>
                  {line.prefix ? (
                    <span className="text-lp-code-dim">{line.prefix} </span>
                  ) : null}
                  {line.text}
                </div>
              ))}
            </pre>
          </li>
        ))}
      </ol>
    </LandingSection>
  )
}

export { SetupSteps }
