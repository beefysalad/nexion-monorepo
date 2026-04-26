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
      "Copy the example env files, point the frontend at the API, and the API at Postgres.",
  },
  {
    number: "02",
    title: "Start local services",
    description:
      "Use Docker Compose for Postgres, then npm run dev:apps from the root.",
  },
  {
    number: "03",
    title: "Build your features",
    description:
      "Keep routes thin, query hooks in hooks/, API wrappers in lib/api/, schemas in validations/.",
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
        className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-start"
      >
        {/* Left sticky heading */}
        <motion.div variants={fadeUp} className="lg:sticky lg:top-32 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Getting started
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Up and running in three steps.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Intentionally boring. Skip the bikeshedding and get to shipping.
          </p>
        </motion.div>

        {/* Right — steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-8 top-8 -z-10 h-[calc(100%-4rem)] w-px bg-border" />

          <motion.div variants={staggerContainer} className="space-y-4">
            {setupSteps.map((step) => (
              <motion.article
                key={step.number}
                variants={fadeUp}
                className="group relative flex gap-6 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background font-mono text-sm font-black text-muted-foreground transition-colors group-hover:border-primary/60 group-hover:text-primary">
                  {step.number}
                </div>
                <div className="space-y-1.5 pt-1">
                  <h3 className="text-base font-bold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
