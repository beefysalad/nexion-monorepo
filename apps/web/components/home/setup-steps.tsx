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
    <section className="border-border bg-background relative overflow-hidden border-b px-6 py-24 sm:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto max-w-3xl space-y-16"
      >
        {/* Centered heading */}
        <motion.div variants={fadeUp} className="space-y-4 text-center">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase">
            Getting started
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Up and running in three steps.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl text-base leading-relaxed">
            Intentionally boring. Skip the bikeshedding and get to shipping.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="space-y-4">
          {setupSteps.map((step) => (
            <motion.article
              key={step.number}
              variants={fadeUp}
              className="group border-border bg-card hover:border-primary/50 hover:bg-primary/[0.02] hover:shadow-primary/5 relative flex gap-6 rounded-xl border p-6 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="border-border bg-background text-muted-foreground group-hover:border-primary group-hover:bg-primary/5 group-hover:text-primary flex size-12 shrink-0 items-center justify-center rounded-xl border font-mono text-lg font-black transition-all duration-300 group-hover:scale-110">
                {step.number}
              </div>
              <div className="space-y-1.5 pt-1 text-left">
                <h3 className="text-foreground group-hover:text-primary text-lg font-bold tracking-tight transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
