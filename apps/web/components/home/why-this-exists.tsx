"use client"

import { RiBookOpenLine, RiGithubFill } from "@remixicon/react"
import { motion } from "framer-motion"

import { Button } from "@workspace/ui/components/button"
import { fadeUp, staggerContainer, viewportOnce } from "@/components/home/motion-presets"

function WhyThisExists() {
  return (
    <section className="border-b border-border bg-background px-6 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
      >
        <motion.div variants={fadeUp} className="space-y-4">
          <p className="text-muted-foreground text-sm font-medium">Why this exists</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Every side project starts with the same chores.
          </h2>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button asChild>
              <a href="https://github.com/beefysalad/nexion-monorepo" target="_blank" rel="noreferrer">
                <RiGithubFill />
                View on GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/docs">
                <RiBookOpenLine />
                Read the docs
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="space-y-5 text-base leading-8 text-muted-foreground">
          <p>
            Lately I&apos;ve been in the mood of building side projects using Next,
            and every new project starts the same way: install Next.js, set up
            an API, wire Postgres, add React Hook Form, wire up TanStack Query,
            get dark mode working, set up the folder structure that makes sense,
            and make sure Docker does not immediately betray me.
          </p>
          <p>
            After doing this setup a couple of times, I finally made a template
            for me and maybe for you too! :3
          </p>
          <p>
            Clone it, change the database URL, and you&apos;re building features.
            That&apos;s it.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export { WhyThisExists }
