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

import { fadeUp, viewportOnce } from "@/components/home/motion-presets"
import { StackCard } from "@/components/home/stack-card"

const stackItems = [
  {
    icon: <RiNextjsLine className="size-5" />,
    title: "Next.js 15 App Router",
    description:
      "Frontend wired with shadcn/ui through the shared workspace UI package. RSC-ready.",
  },
  {
    icon: <RiNodejsLine className="size-5" />,
    title: "NestJS REST API",
    description:
      "Backend lives under apps/api with thin controllers, services, and Prisma repositories.",
  },
  {
    icon: <RiDatabase2Line className="size-5" />,
    title: "Postgres + Prisma",
    description:
      "Dockerized Postgres on port 5433. Prisma ORM configured and ready for migrations.",
  },
  {
    icon: <RiRefreshLine className="size-5" />,
    title: "TanStack Query",
    description:
      "All server state goes through dedicated hooks with explicit loading and error states.",
  },
  {
    icon: <RiShieldCheckLine className="size-5" />,
    title: "Forms + Validation",
    description:
      "React Hook Form and Zod pre-installed for typed, schema-driven form validation.",
  },
  {
    icon: <RiTerminalBoxLine className="size-5" />,
    title: "One-command dev",
    description:
      "Start both apps from the root with npm run dev:apps. No context switching.",
  },
]

export function StackSection() {
  return (
    <section className="border-border bg-muted/30 relative border-b px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-16 max-w-2xl space-y-3"
        >
          <p className="text-primary text-xs font-semibold tracking-widest uppercase">
            The Stack
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Everything wired.{" "}
            <span className="text-muted-foreground font-normal">
              Nothing left to configure.
            </span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Battle-tested tools, pre-configured so you can skip straight to
            building your actual product.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stackItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
              className="h-full"
            >
              <StackCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
