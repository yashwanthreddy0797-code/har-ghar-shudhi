import PageShell from "@/components/PageShell";
import AboutHero from "@/components/about/AboutHero";
import AboutSubNav from "@/components/about/AboutSubNav";
import AboutQuote from "@/components/about/AboutQuote";
import AboutSection from "@/components/about/AboutSection";
import AboutEditorialSplit from "@/components/about/AboutEditorialSplit";
import AboutCertifications from "@/components/about/AboutCertifications";
import AboutBrandCreative from "@/components/about/AboutBrandCreative";
import AboutMarquee from "@/components/about/AboutMarquee";
import BrandPillarsBar from "@/components/about/BrandPillarsBar";
import PhilosophySection from "@/components/about/PhilosophySection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import {
  AFFORDABLE_WELLNESS,
  BRAND_PROMISE,
  DELIVERY,
  NATURE_TO_YOU,
  QUALITY,
  TRANSPARENCY,
} from "@/lib/brand/content";
import {
  Clock,
  Headphones,
  Package,
  QrCode,
} from "lucide-react";

export const metadata = {
  title: "About Us | Har Ghar Shudhi",
  description:
    "Rooted in nature, driven by purpose. Discover our vision, mission, and promise of pure Ayurvedic wellness for every home.",
};

const DELIVERY_ICONS = [Package, Clock, Headphones];

export default function AboutPage() {
  return (
    <PageShell showPromo={false} proofSectionClassName="!pt-10">
      <AboutHero />
      <BrandPillarsBar variant="dark" />
      <AboutSubNav />

      {/* Kama-style editorial quote + story */}
      <AboutQuote />

      {/* Vision & Mission */}
      <VisionMissionSection />

      {/* Philosophy — Why We Exist */}
      <PhilosophySection />

      {/* Promise */}
      <AboutSection
        id="promise"
        eyebrow="Our Commitment"
        title="The Har Ghar Shudhi Promise"
        variant="forest"
        align="center"
      >
        <ul className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {BRAND_PROMISE.map((item) => (
            <li
              key={item.title}
              className="bg-brand-green-dark/40 px-8 py-10 text-center backdrop-blur-[2px] transition-colors hover:bg-white/[0.06] md:px-10 md:py-12"
            >
              <h3 className="font-display text-lg font-medium text-luxury-gold">
                {item.title}
              </h3>
              <p className="mx-auto mt-3 max-w-xs font-body text-sm leading-relaxed text-white/68">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </AboutSection>

      {/* Journey — editorial split like FE Origin */}
      <AboutEditorialSplit
        id="journey"
        eyebrow="Our Process"
        title={NATURE_TO_YOU.headline}
        description={NATURE_TO_YOU.subline}
        imageSrc="/hero/moringa/sequence/frame-001.webp"
        imageAlt="Natural herbs and botanical ingredients"
        imagePosition="left"
        variant="light"
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

      {/* Transparency */}
      <AboutSection
        id="transparency"
        eyebrow="Traceability"
        title={TRANSPARENCY.headline}
        description={TRANSPARENCY.subline}
        variant="deep"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div className="about-luxury-glass rounded-sm border border-luxury-gold/20 p-8 md:p-10">
            <QrCode className="h-7 w-7 text-luxury-gold" strokeWidth={1.25} />
            <p className="mt-6 font-body text-base leading-[1.9] text-white/85">
              {TRANSPARENCY.cta}
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2">
            {TRANSPARENCY.points.map((point) => (
              <li
                key={point.title}
                className="bg-white/[0.04] p-7 md:p-8"
              >
                <h3 className="font-display text-base font-medium text-luxury-gold">
                  {point.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/65">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </AboutSection>

      {/* Quality */}
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

      <AboutCertifications />

      {/* Fair Value */}
      <AboutSection
        id="value"
        eyebrow="Fair Value"
        title={AFFORDABLE_WELLNESS.headline}
        description={AFFORDABLE_WELLNESS.subline}
        variant="white"
        align="center"
      >
        <ul className="grid gap-6 md:grid-cols-3">
          {AFFORDABLE_WELLNESS.points.map((point) => (
            <li
              key={point.title}
              className="about-luxury-card bg-brand-cream/50 text-center"
            >
              <h3 className="font-display text-lg font-medium text-brand-text">
                {point.title}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-brand-muted">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-14 max-w-2xl text-center font-display text-xl italic leading-snug text-brand-green md:text-2xl">
          {AFFORDABLE_WELLNESS.closing}
        </p>
      </AboutSection>

      <AboutBrandCreative />

      {/* Delivery — editorial split */}
      <AboutEditorialSplit
        id="delivery"
        eyebrow="Fulfillment"
        title={DELIVERY.headline}
        description={DELIVERY.subline}
        imageSrc="/footer/landscape-illustration.jpg"
        imageAlt="Natural landscape"
        imagePosition="right"
        variant="dark"
      >
        <ul className="space-y-8">
          {DELIVERY.services.map((service, index) => {
            const Icon = DELIVERY_ICONS[index];
            return (
              <li key={service.title} className="flex gap-4">
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-luxury-gold"
                  strokeWidth={1.25}
                />
                <div>
                  <h3 className="font-display text-base font-medium text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/65">
                    {service.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 font-shop text-[10px] font-semibold uppercase tracking-[0.22em] text-luxury-gold">
          {DELIVERY.tagline}
        </p>
      </AboutEditorialSplit>

      <AboutMarquee />

      <WhoWeAreSection />
    </PageShell>
  );
}
