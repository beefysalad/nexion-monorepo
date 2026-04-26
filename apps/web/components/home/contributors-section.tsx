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
import { Card, CardContent } from "@workspace/ui/components/card"
import Image from "next/image"

const contributionSteps = [
  {
    number: "1",
    title: "Fork and clone the repo",
    description: "Standard GitHub flow. You know the drill.",
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
      "Describe what changed and why. Small, focused PRs are easier to review.",
  },
]

export function ContributorsSection() {
  return (
    <section className="bg-background relative px-6 py-20 sm:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto max-w-3xl space-y-20 text-center"
      >
        <div className="space-y-12">
          <motion.div variants={fadeUp} className="space-y-3">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase">
              Contributing
            </p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Bugs, ideas, and clean PRs are welcome.
            </h2>
            <p className="text-muted-foreground mx-auto max-w-lg text-base leading-relaxed">
              Found something broken? Have an idea? Open an issue or submit a PR
              — just keep it clean and follow the monorepo patterns.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4">
            {contributionSteps.map((step) => (
              <motion.div key={step.number} variants={fadeUp}>
                <ContributionStep {...step} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={scaleIn} className="mx-auto w-full max-w-md">
          <Card className="border-border bg-card">
            <CardContent className="space-y-5 p-6">
              <div className="space-y-1">
                <p className="text-primary text-xs font-semibold tracking-widest uppercase">
                  Contributors
                </p>
                <h3 className="text-lg font-bold tracking-tight">
                  The people who made this possible.
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "beefysalad",
                    role: "Author",
                    image: "/patrick.jpeg",
                  },
                ].map((contributor) => (
                  <a
                    key={contributor.name}
                    href={`https://github.com/${contributor.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="border-border bg-muted/40 hover:border-primary/40 hover:bg-muted/70 flex items-center gap-3 rounded-xl border p-4 transition-colors"
                  >
                    <div className="bg-foreground text-background relative flex size-10 items-center justify-center rounded-full">
                      <Image
                        src={contributor.image}
                        alt={contributor.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">{contributor.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {contributor.role}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="border-border bg-muted/20 rounded-xl border border-dashed p-4 text-center">
                <p className="text-muted-foreground text-xs">
                  Your name could be here 👋
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
