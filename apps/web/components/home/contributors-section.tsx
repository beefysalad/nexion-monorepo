"use client"

import { RiGithubFill } from "@remixicon/react"
import { motion } from "framer-motion"

import { ContributionStep } from "@/components/home/contribution-step"
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from "@/components/home/motion-presets"

const contributionSteps = [
  {
    number: "1",
    title: "Fork and clone the repo",
    description: "Standard GitHub workflow. You know the drill.",
  },
  {
    number: "2",
    title: "Make your changes",
    description: "Create a feature branch. Keep commits atomic. Follow the existing patterns.",
  },
  {
    number: "3",
    title: "Open a pull request",
    description: "Describe what changed and why. Small, focused PRs are easier to review and merge.",
  },
]

function ContributorsSection() {
  return (
    <section className="bg-muted/30 px-6 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <motion.div variants={staggerContainer} className="space-y-8">
          <motion.div variants={fadeUp} className="space-y-3">
            <p className="text-muted-foreground text-sm font-medium">Want to contribute?</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Bugs, ideas, and clean PRs are welcome.
            </h2>
            <p className="text-muted-foreground max-w-2xl text-sm leading-6">
              Found a bug? Have an idea? Wanna collaborate on this? Open an
              issue or submit a PR. Just keep it clean and follow the existing
              monorepo patterns.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4">
            {contributionSteps.map((step) => (
              <motion.div key={step.number} variants={fadeUp}>
                <ContributionStep {...step} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-sm lg:self-start"
        >
          <p className="text-muted-foreground text-sm font-medium">Contributors</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            The people who made this template possible.
          </h3>

          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-background p-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-foreground text-background">
              <RiGithubFill className="size-6" />
            </div>
            <div>
              <p className="font-semibold">beefysalad</p>
              <p className="text-muted-foreground text-sm">beefysalad</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export { ContributorsSection }
