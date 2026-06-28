"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Microscope,
  Stethoscope,
  Users,
} from "lucide-react";
import CertificatesProofSection from "@/components/CertificatesProofSection";
import ScienceComparisonSection from "@/components/science/ScienceComparisonSection";
import ScienceProductPromo from "@/components/science/ScienceProductPromo";
import ScienceProductsSection from "@/components/science/ScienceProductsSection";
import ScienceTrustHero from "@/components/science/ScienceTrustHero";
import { LandingMarquee } from "@/components/landing/LandingMarquee";
import {
  ADVISORY_NOTE,
  EXPERTS,
  SCIENCE_FAQS,
  SCIENCE_HERO,
  TRUST_STATS,
} from "@/lib/brand/scienceTrust";

const TICKER = [
  "Ayush Licensed Formulations",
  "GMP Certified Facility",
  "Lab Tested Every Batch",
  "Expert Advisory Panel",
];

function ScienceFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      {SCIENCE_FAQS.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.question} className="border-b border-brand-border">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-lg font-medium text-brand-text md:text-xl">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-brand-muted transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 font-body text-sm leading-relaxed text-brand-muted md:text-[15px]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ScienceTrustPage() {
  return (
    <div className="bg-brand-cream text-brand-text">
      <LandingMarquee items={TICKER} />

      <ScienceTrustHero />

      <ScienceProductPromo />

      <ScienceComparisonSection />

      {/* Intro */}
      <section className="border-b border-brand-border bg-brand-white px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            {SCIENCE_HERO.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-tight text-brand-text">
            {SCIENCE_HERO.headline}
          </h1>
          <p className="mt-5 font-body text-base leading-relaxed text-brand-muted md:text-lg">
            {SCIENCE_HERO.subline}
          </p>
        </div>
      </section>

      <ScienceProductsSection />

      {/* Trust stats */}
      <section className="border-b border-brand-border bg-brand-sand px-6 py-12 md:px-12 md:py-16">
        <ul className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <li
              key={stat.label}
              className="rounded-xl border border-brand-border bg-brand-white px-6 py-8 text-center shadow-sm"
            >
              <p className="font-shop text-3xl font-bold text-brand-green md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 font-shop text-sm text-brand-muted">{stat.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Expert advisory */}
      <section
        id="experts"
        className="border-b border-brand-border bg-brand-white px-6 py-14 md:px-12 md:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
              Expert Advisory
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium text-brand-text md:text-4xl">
              Backed by Certified Doctors & Nutritionists
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-brand-muted">
              {ADVISORY_NOTE}
            </p>
          </div>

          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {EXPERTS.map((expert) => (
              <li
                key={expert.id}
                className="rounded-2xl border border-brand-border bg-brand-cream/40 p-8 text-center shadow-sm"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-green text-2xl font-semibold text-white">
                  {expert.initials}
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-brand-text">
                  {expert.name}
                </h3>
                <p className="mt-1 font-shop text-sm font-semibold text-brand-green">
                  {expert.role}
                </p>
                <p className="mt-2 font-shop text-xs text-brand-muted">
                  {expert.credentials}
                </p>
                <p className="mt-4 font-body text-sm leading-relaxed text-brand-muted">
                  {expert.focus}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Stethoscope, label: "Ayurvedic oversight" },
              { icon: Users, label: "Nutrition guidance" },
              { icon: Microscope, label: "Lab-verified quality" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-3 rounded-lg border border-brand-green/20 bg-brand-green-light/50 px-4 py-4"
              >
                <Icon className="h-5 w-5 text-brand-green" />
                <span className="font-shop text-sm font-medium text-brand-green">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <CertificatesProofSection className="border-b border-brand-border" />

      {/* FAQ */}
      <section className="border-b border-brand-border bg-brand-sand px-6 py-14 md:px-12 md:py-20">
        <h2 className="mb-10 text-center font-display text-3xl font-medium text-brand-text">
          Frequently Asked Questions
        </h2>
        <ScienceFaq />
      </section>

      {/* Final CTA */}
      <section className="bg-brand-green px-6 py-16 text-center text-white md:px-12 md:py-20">
        <h2 className="font-display text-3xl font-medium md:text-4xl">
          Your Trust. Our Greatest Strength.
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-base italic opacity-90">
          Pure, certified, and expert-guided wellness — delivered to your doorstep.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-md bg-white px-10 py-3.5 font-shop text-xs font-semibold uppercase tracking-[0.18em] text-brand-green transition-colors hover:bg-brand-cream"
          >
            Explore Products
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-md border border-white/60 px-10 py-3.5 font-shop text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
          >
            Our Story
          </Link>
        </div>
      </section>
    </div>
  );
}
