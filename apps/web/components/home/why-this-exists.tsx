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
    <section className="border-border bg-muted/30 relative overflow-hidden border-b px-6 py-24 sm:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto max-w-3xl space-y-12 text-center"
      >
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase">
            The backstory
          </p>
          <h2 className="mx-auto max-w-2xl text-4xl leading-[0.95] font-black tracking-tight sm:text-5xl">
            Every project starts with the same
            <span className="text-primary block"> setup chores.</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed sm:text-xl">
            Install Next.js. Scaffold NestJS. Wire the API. Set up Postgres. Add
            form validation. Configure dark mode. Fight Docker. Repeat.
          </p>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed">
            After doing this four times, I templatized it. Clone, swap the DB
            URL, start building.{" "}
            <span className="text-foreground font-semibold">
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
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {[
            { value: "1", label: "command to start everything" },
            { value: "0", label: "boilerplate decisions left" },
            { value: "5+", label: "tools pre-wired together" },
            { value: "∞", label: "features left for you to build" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group border-border bg-card hover:border-primary/50 hover:bg-primary/[0.02] relative flex flex-col items-center justify-center rounded-2xl border p-6 transition-all duration-300"
            >
              <p className="text-primary text-4xl font-black transition-transform duration-300 group-hover:scale-110">
                {stat.value}
              </p>
              <p className="text-muted-foreground mt-2 text-[10px] leading-tight font-bold tracking-widest uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
