import Image from "next/image"

import {
  LandingHeading,
  LandingSection,
} from "@/components/home/landing-section"

const chores = [
  "Install Next.js",
  "Scaffold NestJS",
  "Wire the API",
  "Set up Postgres",
  "Add form validation",
  "Configure dark mode",
  "Fight Docker",
]

function WhyThisExists() {
  return (
    <LandingSection label="03 — Why this exists">
      <div className="flex flex-wrap gap-x-16 gap-y-12">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-6">
          <LandingHeading>
            Every project starts with the same chores.
          </LandingHeading>
          <p className="text-[19px] leading-[1.55]">
            After doing them four times, I templatized it. Clone, swap the
            database URL, start building. No more boilerplate fatigue.
          </p>
          <div className="flex items-center gap-3 text-sm">
            <Image
              src="/patrick.jpeg"
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
            />
            <span>
              <a
                href="https://github.com/beefysalad"
                target="_blank"
                rel="noreferrer"
                className="decoration-lp-rule hover:decoration-lp-ink font-semibold underline underline-offset-4"
              >
                beefysalad
              </a>
              , author
            </span>
          </div>
        </div>
        <ul className="border-lp-ink min-w-0 flex-[1_1_260px] self-start border-t">
          {chores.map((chore) => (
            <li
              key={chore}
              className="border-lp-rule flex items-baseline justify-between gap-4 border-b py-3 text-base"
            >
              <s className="text-lp-muted">{chore}</s>
              <span className="font-mono text-xs">done</span>
            </li>
          ))}
        </ul>
      </div>
    </LandingSection>
  )
}

export { WhyThisExists }
