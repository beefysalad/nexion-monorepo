"use client"

import { RiGithubFill } from "@remixicon/react"
import { motion } from "framer-motion"

import { Button } from "@workspace/ui/components/button"
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/components/home/motion-presets"

export function WhyThisExists() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-muted/30 px-6 py-24 sm:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto max-w-3xl space-y-12 text-center"
      >
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            The backstory
          </p>
          <h2 className="mx-auto max-w-2xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl">
            Every project starts with the same
            <span className="block text-primary"> setup chores.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Install Next.js. Scaffold NestJS. Wire the API. Set up Postgres.
            Add form validation. Configure dark mode. Fight Docker. Repeat.
          </p>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            After doing this four times, I templatized it. Clone, swap the DB
            URL, start building.{" "}
            <span className="font-semibold text-foreground">
              No more boilerplate fatigue.
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="default" className="gap-2 rounded-xl" asChild>
              <a
                href="https://github.com/beefysalad/nexion-monorepo"
                target="_blank"
                rel="noreferrer"
              >
                <RiGithubFill className="size-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "1", label: "command to start everything" },
            { value: "0", label: "boilerplate decisions left" },
            { value: "5+", label: "tools pre-wired together" },
            { value: "∞", label: "features left for you to build" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group relative flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.02]"
            >
              <p className="text-4xl font-black text-primary transition-transform duration-300 group-hover:scale-110">
                {stat.value}
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
