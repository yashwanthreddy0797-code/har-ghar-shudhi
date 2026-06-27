import PageShell from "@/components/PageShell";
import AboutHero from "@/components/about/AboutHero";
import AboutSubNav from "@/components/about/AboutSubNav";
import AboutQuote from "@/components/about/AboutQuote";
import AboutSection from "@/components/about/AboutSection";
import AboutEditorialSplit from "@/components/about/AboutEditorialSplit";
import PhilosophySection from "@/components/about/PhilosophySection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import { NATURE_TO_YOU, QUALITY } from "@/lib/brand/content";

export const metadata = {
  title: "About Us | Har Ghar Shudhi",
  description:
    "Rooted in nature, driven by purpose. Discover our vision, mission, and promise of pure Ayurvedic wellness for every home.",
};

export default function AboutPage() {
  return (
    <PageShell showPromo={false} proofSectionClassName="!pt-10">
      <AboutHero />
      <AboutSubNav />

      <AboutQuote />

      <VisionMissionSection />

      <PhilosophySection />

      <AboutEditorialSplit
        id="journey"
        eyebrow="Our Process"
        title={NATURE_TO_YOU.headline}
        description={NATURE_TO_YOU.subline}
      >
        <ol className="space-y-5">
          {NATURE_TO_YOU.steps.map((step, index) => (
            <li
              key={step}
              className="flex items-start gap-4 border-b border-brand-border/60 pb-5 last:border-0 last:pb-0"
            >
              <span className="mt-0.5 font-shop text-[11px] font-semibold tabular-nums tracking-[0.12em] text-luxury-gold-dim">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-base font-medium leading-snug text-brand-text">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </AboutEditorialSplit>

      <AboutSection
        id="quality"
        eyebrow="Standards"
        title={QUALITY.headline}
        description={QUALITY.subline}
        variant="cream"
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {QUALITY.pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="about-luxury-card border-t-2 border-brand-green/30 bg-brand-white"
            >
              <h3 className="font-display text-base font-medium text-brand-text">
                {pillar.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-brand-muted">
                {pillar.description}
              </p>
            </li>
          ))}
        </ul>
      </AboutSection>

      <WhoWeAreSection />
    </PageShell>
  );
}
