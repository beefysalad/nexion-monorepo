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
    <section className="relative overflow-hidden border-b border-border bg-background px-6 py-24 sm:py-40">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl gap-20 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <motion.div variants={fadeUp} className="sticky top-40 h-fit space-y-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Suggested flow
          </p>
          <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
            Start boring. <br /> 
            <span className="text-muted-foreground italic">Stay organized.</span>
          </h2>
          <p className="text-xl leading-relaxed text-muted-foreground">
            This page is intentionally a boilerplate dashboard, not a product
            landing page. Swap sections out as the actual app takes shape.
          </p>
        </motion.div>

        <div className="relative space-y-8">
          <div className="absolute left-12 top-0 -z-10 h-full w-[2px] bg-border" />

          <motion.div variants={staggerContainer} className="space-y-8">
            {setupSteps.map((step) => (
              <motion.article
                key={step.number}
                variants={fadeUp}
                className="group relative flex gap-8 rounded-lg border border-border bg-card p-8 shadow-sm transition-colors hover:border-primary/30"
              >
                <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-background font-mono text-lg font-black text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                  {step.number}
                </div>
                
                <div className="space-y-3 pt-2">
                  <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
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
