"use client"

import {
  RiDatabase2Line,
  RiNextjsLine,
  RiNodejsLine,
  RiRefreshLine,
  RiShieldCheckLine,
  RiTerminalBoxLine,
} from "@remixicon/react"
import { motion } from "framer-motion"

import { fadeUp, staggerContainer, viewportOnce } from "@/components/home/motion-presets"
import { StackCard } from "@/components/home/stack-card"

const stackItems = [
  {
    icon: <RiNextjsLine className="size-5" />,
    title: "Next.js frontend",
    description: "App Router frontend with shadcn/ui through the shared UI package.",
  },
  {
    icon: <RiNodejsLine className="size-5" />,
    title: "NestJS API",
    description: "Backend app lives beside the frontend under apps/api with thin controllers and services.",
  },
  {
    icon: <RiDatabase2Line className="size-5" />,
    title: "Postgres + Prisma",
    description: "Dockerized Postgres on localhost:5433 and Prisma configured for PostgreSQL.",
  },
  {
    icon: <RiRefreshLine className="size-5" />,
    title: "TanStack Query",
    description: "Frontend server state goes through dedicated hooks with explicit loading states.",
  },
  {
    icon: <RiShieldCheckLine className="size-5" />,
    title: "Forms ready",
    description: "React Hook Form and Zod are installed for typed form validation.",
  },
  {
    icon: <RiTerminalBoxLine className="size-5" />,
    title: "One command dev",
    description: "Run web and API together from the root with npm run dev:apps.",
  },
]

function StackSection() {
  return (
    <section className="border-b border-border bg-muted/30 px-6 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={fadeUp} className="mb-10 max-w-2xl space-y-3">
          <p className="text-muted-foreground text-sm font-medium">What is wired</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            The pieces every project keeps needing.
          </h2>
        </motion.div>
        <motion.div variants={staggerContainer} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stackItems.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <StackCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export { StackSection }
