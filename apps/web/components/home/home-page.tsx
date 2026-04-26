"use client"

import { AuthHeader } from "@/components/auth/auth-header"
import { ContributorsSection } from "@/components/home/contributors-section"
import { HomeHero } from "@/components/home/home-hero"
import { SetupSteps } from "@/components/home/setup-steps"
import { StackSection } from "@/components/home/stack-section"
import { WhyThisExists } from "@/components/home/why-this-exists"

export function HomePage() {
  return (
    <>
      <AuthHeader />
      <main className="min-h-svh bg-background text-foreground">
        <HomeHero />
        <StackSection />
        <SetupSteps />
        <WhyThisExists />
        <ContributorsSection />
      </main>
    </>
  )
}
