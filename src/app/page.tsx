import { LandingHeader } from "@/components/landing-header";
import { LandingHero } from "@/components/landing-hero";
import { LandingFeatures } from "@/components/landing-features";
import { LandingHowItWorks } from "@/components/landing-how-it-works";
import { LandingTestimonials } from "@/components/landing-testimonials";
import { LandingCTA } from "@/components/landing-cta";
import { LandingFooter } from "@/components/landing-footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingTestimonials />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
