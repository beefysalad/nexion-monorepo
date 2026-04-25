"use client"

import { motion } from "framer-motion"

import {
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/components/home/motion-presets"

const setupSteps = [
  {
    number: "01",
    title: "Configure env files",
    description:
      "Copy the example env files, then point the frontend at the API and the API at Postgres.",
  },
  {
    number: "02",
    title: "Start local services",
    description:
      "Use Docker Compose for Postgres or run the apps directly from the root workspace.",
  },
  {
    number: "03",
    title: "Build features",
    description:
      "Keep routes thin, put query hooks in hooks, API wrappers in lib/api, and schemas in validations.",
  },
]

export function SetupSteps() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background px-6 py-24 sm:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Suggested flow
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Start boring. <br /> Stay organized.
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            This page is intentionally a boilerplate dashboard, not a product
            landing page. Swap sections out as the actual app takes shape.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="space-y-4">
          {setupSteps.map((step) => (
            <motion.article
              key={step.number}
              variants={fadeUp}
              className="group flex gap-6 rounded-[2rem] border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:bg-muted/50"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-background font-mono text-sm font-bold text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                {step.number}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold transition-colors group-hover:text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-7 text-muted-foreground transition-colors group-hover:text-muted-foreground/80">
                  {step.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
