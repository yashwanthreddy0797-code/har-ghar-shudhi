import Link from "next/link";
import PageShell from "@/components/PageShell";
import AboutHero from "@/components/about/AboutHero";
import AboutSection from "@/components/about/AboutSection";
import AboutSectionNav from "@/components/about/AboutSectionNav";
import AboutMarquee from "@/components/about/AboutMarquee";
import BrandPillarsBar from "@/components/about/BrandPillarsBar";
import {
  AFFORDABLE_WELLNESS,
  BRAND_CLOSING,
  BRAND_MISSION,
  BRAND_PROMISE,
  BRAND_VISION,
  DELIVERY,
  NATURE_TO_YOU,
  QUALITY,
  TRANSPARENCY,
  WHY_WE_EXIST,
} from "@/lib/brand/content";
import {
  ArrowRight,
  Clock,
  Globe,
  Headphones,
  Leaf,
  Package,
  QrCode,
  Shield,
  Users,
} from "lucide-react";

export const metadata = {
  title: "About Us | Har Ghar Shudhi",
  description:
    "Rooted in nature, driven by purpose. Discover our vision, mission, and promise of pure Ayurvedic wellness for every home.",
};

const WHY_ICONS = [Leaf, Shield, Users, Globe];
const DELIVERY_ICONS = [Package, Clock, Headphones];

export default function AboutPage() {
  return (
    <PageShell showPromo={false} proofSectionClassName="!pt-10">
      <AboutHero />
      <BrandPillarsBar variant="dark" />
      <AboutSectionNav />

      {/* Vision & Mission */}
      <AboutSection
        id="vision-mission"
        eyebrow="Purpose"
        title="Vision & Mission"
        variant="white"
      >
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <article className="about-brand-card group">
            <p className="font-shop text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-green">
              Our Vision
            </p>
            <p className="mt-5 font-display text-2xl font-medium leading-snug text-brand-text md:text-[1.75rem]">
              {BRAND_VISION}
            </p>
          </article>
          <article className="about-brand-card about-brand-card--accent group">
            <p className="font-shop text-[10px] font-semibold uppercase tracking-[0.22em] text-luxury-gold-dim">
              Our Mission
            </p>
            <p className="mt-5 font-body text-base leading-[1.85] text-brand-muted md:text-lg">
              {BRAND_MISSION}
            </p>
          </article>
        </div>
      </AboutSection>

      {/* Why We Exist */}
      <AboutSection
        id="why-we-exist"
        eyebrow="Why We Exist"
        title="Purpose in every choice we make"
        variant="cream"
        align="center"
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_WE_EXIST.map((item, index) => {
            const Icon = WHY_ICONS[index];
            return (
              <li
                key={item.id}
                className="about-brand-card flex flex-col items-center text-center"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-luxury-gold/25 bg-white shadow-[0_8px_24px_rgba(45,82,57,0.06)]">
                  <Icon className="h-5 w-5 text-brand-green" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-lg font-medium text-brand-text">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-brand-muted">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </AboutSection>

      {/* Promise */}
      <AboutSection
        id="promise"
        eyebrow="Our Commitment"
        title="The Har Ghar Shudhi Promise"
        variant="forest"
        align="center"
      >
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BRAND_PROMISE.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:border-luxury-gold/30 hover:bg-white/[0.07]"
            >
              <h3 className="font-display text-lg font-medium text-luxury-gold">
                {item.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-white/70">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </AboutSection>

      {/* Journey */}
      <AboutSection
        id="journey"
        eyebrow="Our Process"
        title={NATURE_TO_YOU.headline}
        description={NATURE_TO_YOU.subline}
        variant="white"
        align="center"
      >
        <ol className="about-brand-journey">
          {NATURE_TO_YOU.steps.map((step, index) => (
            <li key={step} className="about-brand-journey-step">
              <span className="about-brand-journey-num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-sm font-medium leading-snug text-brand-text md:text-base">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </AboutSection>

      {/* Transparency */}
      <AboutSection
        id="transparency"
        eyebrow="Traceability"
        title={TRANSPARENCY.headline}
        description={TRANSPARENCY.subline}
        variant="deep"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="rounded-xl border border-luxury-gold/25 bg-luxury-gold/[0.08] p-7 md:p-8">
            <QrCode
              className="h-6 w-6 text-luxury-gold"
              strokeWidth={1.5}
            />
            <p className="mt-5 font-body text-base leading-relaxed text-white/85">
              {TRANSPARENCY.cta}
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {TRANSPARENCY.points.map((point) => (
              <li
                key={point.title}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="font-display text-base font-medium text-luxury-gold">
                  {point.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/68">
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
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {QUALITY.pillars.map((pillar) => (
            <li key={pillar.title} className="about-brand-card">
              <h3 className="font-display text-base font-medium text-brand-text">
                {pillar.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-brand-muted">
                {pillar.description}
              </p>
            </li>
          ))}
        </ul>
        <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
          {QUALITY.exclusions.map((label) => (
            <li
              key={label}
              className="rounded-full border border-brand-green/20 bg-brand-green-light px-4 py-2 font-shop text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-green"
            >
              {label}
            </li>
          ))}
        </ul>
      </AboutSection>

      {/* Fair Value */}
      <AboutSection
        id="value"
        eyebrow="Fair Value"
        title={AFFORDABLE_WELLNESS.headline}
        description={AFFORDABLE_WELLNESS.subline}
        variant="forest"
        align="center"
      >
        <ul className="grid gap-5 md:grid-cols-3">
          {AFFORDABLE_WELLNESS.points.map((point) => (
            <li
              key={point.title}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-7 text-center"
            >
              <h3 className="font-display text-lg font-medium text-luxury-gold">
                {point.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/68">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-12 max-w-2xl text-center font-display text-xl italic text-white/90 md:text-2xl">
          {AFFORDABLE_WELLNESS.closing}
        </p>
      </AboutSection>

      {/* Delivery */}
      <AboutSection
        id="delivery"
        eyebrow="Fulfillment"
        title={DELIVERY.headline}
        description={DELIVERY.subline}
        variant="white"
        align="center"
      >
        <ul className="grid gap-6 md:grid-cols-3">
          {DELIVERY.services.map((service, index) => {
            const Icon = DELIVERY_ICONS[index];
            return (
              <li
                key={service.title}
                className="about-brand-card flex flex-col items-center text-center"
              >
                <Icon className="h-5 w-5 text-brand-green" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-base font-medium text-brand-text">
                  {service.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-brand-muted">
                  {service.description}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 font-shop text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green">
          {DELIVERY.tagline}
        </p>
      </AboutSection>

      <AboutMarquee />

      {/* Closing */}
      <section className="about-brand-closing px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-tight text-white">
            {BRAND_CLOSING.headline}
          </h2>
          <p className="mt-6 font-body text-base leading-[1.9] text-white/72 md:text-lg">
            {BRAND_CLOSING.body}
          </p>
          <p className="mt-8 font-display text-xl italic text-luxury-gold md:text-2xl">
            {BRAND_CLOSING.closing}
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-luxury-gold px-8 py-3.5 font-shop text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green-dark transition-colors hover:bg-[#d4b872]"
            >
              Shop Wellness
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-white/25 px-8 py-3.5 font-shop text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white/50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <BrandPillarsBar />
    </PageShell>
  );
}
