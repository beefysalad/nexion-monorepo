import { ContributorsSection } from "@/components/home/contributors-section"
import { HomeFooter } from "@/components/home/home-footer"
import { HomeHeader } from "@/components/home/home-header"
import { HomeHero } from "@/components/home/home-hero"
import { SetupSteps } from "@/components/home/setup-steps"
import { StackSection } from "@/components/home/stack-section"
import { WhyThisExists } from "@/components/home/why-this-exists"

export function HomePage() {
  return (
    <div className="landing font-landing bg-lp-paper text-lp-ink min-h-svh">
      <HomeHeader />
      <div aria-hidden className="h-[60px]" />
      <main>
        <HomeHero />
        <StackSection />
        <SetupSteps />
        <WhyThisExists />
        <ContributorsSection />
      </main>
      <HomeFooter />
    </div>
  )
}
