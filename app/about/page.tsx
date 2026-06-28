import PageShell from "@/components/PageShell";
import AboutHero from "@/components/about/AboutHero";
import AboutSubNav from "@/components/about/AboutSubNav";
import AboutQuote from "@/components/about/AboutQuote";
import PhilosophySection from "@/components/about/PhilosophySection";
import QualityStandardsSection from "@/components/about/QualityStandardsSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";

export const metadata = {
  title: "About Us | Har Ghar Shudhi",
  description:
    "Rooted in nature, driven by purpose. Discover our vision, mission, and promise of pure Ayurvedic wellness for every home.",
};

export default function AboutPage() {
  return (
    <PageShell showPromo={false} proofSectionClassName="!pt-10 about-page__proof">
      <AboutHero />

      <div className="about-page">
        <AboutSubNav />

        <AboutQuote />

        <VisionMissionSection />

        <WhoWeAreSection />

        <PhilosophySection />

        <QualityStandardsSection />
      </div>
    </PageShell>
  );
}
