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
        className="mx-auto max-w-3xl space-y-16"
      >
        {/* Centered heading */}
        <motion.div variants={fadeUp} className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Getting started
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Up and running in three steps.
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
            Intentionally boring. Skip the bikeshedding and get to shipping.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="space-y-4">
          {setupSteps.map((step) => (
            <motion.article
              key={step.number}
              variants={fadeUp}
              className="group relative flex gap-6 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.02] hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background font-mono text-lg font-black text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/5 group-hover:text-primary">
                {step.number}
              </div>
              <div className="space-y-1.5 pt-1 text-left">
                <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
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
