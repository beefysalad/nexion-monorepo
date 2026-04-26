"use client"

import { RiGithubFill } from "@remixicon/react"
import { motion } from "framer-motion"

import { ContributionStep } from "@/components/home/contribution-step"
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "@/components/home/motion-presets"

const contributionSteps = [
  {
    number: "1",
    title: "Fork and clone the repo",
    description: "Standard GitHub workflow. You know the drill.",
  },
  {
    number: "2",
    title: "Make your changes",
    description:
      "Create a feature branch. Keep commits atomic. Follow the existing patterns.",
  },
  {
    number: "3",
    title: "Open a pull request",
    description:
      "Describe what changed and why. Small, focused PRs are easier to review and merge.",
  },
]

import { Card, CardContent } from "@workspace/ui/components/card"

export function ContributorsSection() {
  return (
    <section className="relative overflow-hidden bg-muted/30 px-6 py-20 sm:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
      >
        <motion.div variants={staggerContainer} className="space-y-10">
          <motion.div variants={fadeUp} className="space-y-4">
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">
              Want to contribute?
            </p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Bugs, ideas, and clean <br /> PRs are welcome.
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              Found a bug? Have an idea? Wanna collaborate on this? Open an
              issue or submit a PR. Just keep it clean and follow the existing
              monorepo patterns.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-5">
            {contributionSteps.map((step) => (
              <motion.div key={step.number} variants={fadeUp}>
                <ContributionStep {...step} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={scaleIn}>
          <Card className="relative rounded-lg p-2 shadow-sm shadow-foreground/10">
            <CardContent className="space-y-6 p-6">
              <div>
                <p className="text-sm font-semibold text-primary">Contributors</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">
                  The people who made this template possible.
                </h3>
              </div>

              <div className="grid gap-4">
                {[
                  { name: "beefysalad", role: "Author", github: "beefysalad" },
                ].map((contributor) => (
                  <div
                    key={contributor.github}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-primary/50"
                  >
                    <div className="flex size-12 items-center justify-center rounded-full bg-foreground text-background shadow-inner">
                      <RiGithubFill className="size-6" />
                    </div>
                    <div>
                      <p className="font-bold">{contributor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {contributor.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Your name could be here!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
