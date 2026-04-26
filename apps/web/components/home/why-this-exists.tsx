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
        className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center"
      >
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            The backstory
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Every project starts with the same setup chores.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Install Next.js. Wire an API. Set up Postgres. Add form validation.
            Configure dark mode. Fight Docker. Repeat.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            After doing this four times, I templatized it. Clone, swap the DB
            URL, start building.{" "}
            <span className="font-semibold text-foreground">
              No more boilerplate fatigue.
            </span>
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
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

        {/* Right — quick stats */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
          {[
            { value: "1", label: "command to start everything" },
            { value: "0", label: "boilerplate decisions left" },
            { value: "5+", label: "tools pre-wired together" },
            { value: "∞", label: "features left for you to build" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <p className="text-4xl font-black text-primary">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
