"use client"

import { RiBookOpenLine, RiGithubFill } from "@remixicon/react"
import { motion } from "framer-motion"

import { Button } from "@workspace/ui/components/button"
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/components/home/motion-presets"

export function WhyThisExists() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background px-6 py-24 sm:py-40">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl gap-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
      >
        <motion.div variants={fadeUp} className="space-y-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            The Motivation
          </p>
          <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
            Every side project <br /> 
            <span className="text-muted-foreground italic">starts with chores.</span>
          </h2>
          
          <div className="flex flex-wrap gap-4 pt-6">
            <Button size="lg" className="h-14 rounded-2xl px-8 font-bold" asChild>
              <a
                href="https://github.com/beefysalad/nexion-monorepo"
                target="_blank"
                rel="noreferrer"
              >
                <RiGithubFill className="size-5" />
                View on GitHub
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-14 rounded-2xl px-8 transition-all hover:border-primary/50" asChild>
              <a href="#" className="flex items-center gap-2">
                <RiBookOpenLine className="size-5" />
                Read the Docs
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="space-y-8 text-xl leading-relaxed text-muted-foreground"
        >
          <p>
            Lately I&apos;ve been in the mood of building side projects using
            Next, and every new project starts the same way: install Next.js,
            set up an API, wire Postgres, add React Hook Form, wire up TanStack
            Query, get dark mode working, set up the folder structure that makes
            sense, and make sure Docker does not immediately betray me.
          </p>
          <div className="rounded-lg border border-border bg-card p-8">
            <p className="font-bold text-foreground italic">
              &quot;After doing this setup a couple of times, I finally made a template
              that wires all of this up for me.&quot;
            </p>
          </div>
          <p>
            Clone it, change the database URL, and you&apos;re building
            features. That&apos;s it. <span className="text-foreground font-bold">No more boilerplate fatigue.</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
