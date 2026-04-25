"use client"

import { motion } from "framer-motion"

import { fadeUp, staggerContainer, viewportOnce } from "@/components/home/motion-presets"

const setupSteps = [
  {
    number: "01",
    title: "Configure env files",
    description: "Copy the example env files, then point the frontend at the API and the API at Postgres.",
  },
  {
    number: "02",
    title: "Start local services",
    description: "Use Docker Compose for Postgres or run the apps directly from the root workspace.",
  },
  {
    number: "03",
    title: "Build features",
    description: "Keep routes thin, put query hooks in hooks, API wrappers in lib/api, and schemas in validations.",
  },
]

function SetupSteps() {
  return (
    <section className="border-b border-border bg-background px-6 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <motion.div variants={fadeUp} className="space-y-3">
          <p className="text-muted-foreground text-sm font-medium">Suggested flow</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Start boring. Stay organized.
          </h2>
          <p className="text-muted-foreground text-sm leading-6">
            This page is intentionally a boilerplate dashboard, not a product
            landing page. Swap sections out as the actual app takes shape.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="space-y-4">
          {setupSteps.map((step) => (
            <motion.article
              key={step.number}
              variants={fadeUp}
              className="flex gap-5 rounded-3xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-border bg-background font-mono text-xs font-semibold text-muted-foreground">
                {step.number}
              </div>
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm leading-6">
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

export { SetupSteps }
