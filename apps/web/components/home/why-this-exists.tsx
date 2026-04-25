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
    <section className="relative overflow-hidden border-b border-border bg-background px-6 py-24 sm:py-32">
      <div className="absolute right-0 top-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-20 [mask-image:linear-gradient(to_left,white,transparent)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
      >
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why this exists
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Every side project <br /> starts with the same chores.
          </h2>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="h-12 rounded-2xl px-6" asChild>
              <a
                href="https://github.com/beefysalad/nexion-monorepo"
                target="_blank"
                rel="noreferrer"
              >
                <RiGithubFill className="size-5" />
                View on GitHub
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-2xl px-6" asChild>
              <a href="#" className="flex items-center gap-2">
                <RiBookOpenLine className="size-5" />
                Read Docs
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="space-y-6 text-lg leading-relaxed text-muted-foreground"
        >
          <p>
            Lately I&apos;ve been in the mood of building side projects using
            Next, and every new project starts the same way: install Next.js,
            set up an API, wire Postgres, add React Hook Form, wire up TanStack
            Query, get dark mode working, set up the folder structure that makes
            sense, and make sure Docker does not immediately betray me.
          </p>
          <p className="font-medium text-foreground/80">
            After doing this setup a couple of times, I finally made a template
            that wires all of this up for me.
          </p>
          <p>
            Clone it, change the database URL, and you&apos;re building
            features. That&apos;s it. No more boilerplate fatigue.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
