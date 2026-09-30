import { RiAddLine } from "@remixicon/react"
import Image from "next/image"

import {
  LandingHeading,
  LandingSection,
} from "@/components/home/landing-section"

const REPO_URL = "https://github.com/beefysalad/nexion-monorepo"

const contributionSteps = [
  {
    number: "1",
    title: "Fork and clone",
    description: "Standard GitHub flow.",
  },
  {
    number: "2",
    title: "Make your changes",
    description: "Feature branch, atomic commits, existing patterns.",
  },
  {
    number: "3",
    title: "Open a pull request",
    description: "Say what changed and why. Small PRs get reviewed faster.",
  },
]

const contributors = [
  {
    name: "beefysalad",
    role: "Author",
    avatar: "/patrick.jpeg",
    href: "https://github.com/beefysalad",
  },
]

function ContributorsSection() {
  return (
    <LandingSection id="contribute" label="04 — Contributing">
      <div className="flex flex-col gap-4">
        <LandingHeading>Bugs, ideas and clean PRs are welcome.</LandingHeading>
        <p className="text-lp-muted max-w-[560px] text-[17px] leading-[1.55]">
          Found something broken? Open an issue or send a PR. Keep it small and
          follow the monorepo patterns.
        </p>
      </div>
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-8">
        {contributionSteps.map((step) => (
          <li
            key={step.number}
            className="border-lp-ink flex flex-col gap-2 border-t pt-3.5"
          >
            <span className="font-mono text-[13px] font-semibold">
              {step.number}
            </span>
            <h3 className="text-[17px] font-semibold">{step.title}</h3>
            <p className="text-lp-muted text-[15px] leading-[1.55]">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
      <ul className="flex flex-wrap gap-3">
        {contributors.map((person) => (
          <li key={person.name}>
            <a
              href={person.href}
              target="_blank"
              rel="noreferrer"
              className="border-lp-rule hover:border-lp-ink inline-flex items-center gap-3 rounded-full border py-2.5 pr-[18px] pl-2.5 transition-colors"
            >
              <Image
                src={person.avatar}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-full object-cover"
              />
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">{person.name}</span>
                <span className="text-lp-muted text-xs">{person.role}</span>
              </span>
            </a>
          </li>
        ))}
        <li>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="border-lp-muted text-lp-muted hover:border-lp-ink hover:text-lp-ink inline-flex h-full items-center gap-2 rounded-full border border-dashed px-[18px] py-2.5 text-sm transition-colors"
          >
            <RiAddLine className="size-4" />
            Your name here — open a PR
          </a>
        </li>
      </ul>
    </LandingSection>
  )
}

export { ContributorsSection }
