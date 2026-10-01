"use client"

import { ContributorsSection } from "@/components/home/contributors-section"
import { HomeHeader } from "@/components/home/home-header"
import { HomeHero } from "@/components/home/home-hero"
import { SetupSteps } from "@/components/home/setup-steps"
import { StackSection } from "@/components/home/stack-section"
import { WhyThisExists } from "@/components/home/why-this-exists"

export function HomePage() {
  return (
    <>
      <HomeHeader />
      <main className="bg-background text-foreground min-h-svh">
        <HomeHero />
        <StackSection />
        <SetupSteps />
        <WhyThisExists />
        <ContributorsSection />
      </main>
    </>
  )
}
