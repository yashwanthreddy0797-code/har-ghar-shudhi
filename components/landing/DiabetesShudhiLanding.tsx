"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, Play, Star, X } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog/types";
import { formatPrice } from "@/lib/types/product";
import {
  CASE_STUDIES,
  CLINICAL_STATS,
  COMPARISON_ROWS,
  HERO,
  HERO_TICKER,
  LANDING_FAQS,
  MEDIA_HEADLINE,
  MEDIA_LOGOS,
  MEDIA_SUBLINE,
  RESULTS,
  SHORT_QUOTES,
  SUPPLEMENT_FACTS,
  TESTIMONIALS,
  TOP_TICKER,
  TRUST_STRIP,
} from "@/lib/landing/diabetesShudhiLanding";
import A1cProgressChart from "@/components/landing/A1cProgressChart";
import LandingBuyCta from "@/components/landing/LandingBuyCta";
import LandingDotsCarousel from "@/components/landing/LandingDotsCarousel";
import LandingHeroBanners from "@/components/landing/LandingHeroBanners";
import { LandingMarquee, LANDING_BG } from "@/components/landing/LandingMarquee";

function StatIcon({ type }: { type: string }) {
  const cls = "h-10 w-10 text-brand-green";
  if (type === "sugar")
    return (
      <svg viewBox="0 0 40 40" className={cls} aria-hidden>
        <rect x="8" y="12" width="24" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  if (type === "drop")
    return (
      <svg viewBox="0 0 40 40" className={cls} aria-hidden>
        <path d="M20 8c0 0-10 12-10 18a10 10 0 1020 0C30 20 20 8 20 8z" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  return (
    <svg viewBox="0 0 40 40" className={cls} aria-hidden>
      <rect x="10" y="14" width="20" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-[#f5d547] text-[#f5d547]" : "text-brand-border"}`}
          />
        ))}
      </div>
      <span className="font-shop text-sm text-brand-green">
        Rated {rating}/5 by {count}+ Happy Customers
      </span>
    </div>
  );
}

function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      {LANDING_FAQS.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.question} className="border-b border-brand-green/20">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center gap-3 py-5 text-left"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                <Check className="h-4 w-4" />
              </span>
              <span className="flex-1 font-shop text-base font-semibold text-brand-green underline decoration-brand-green/30 underline-offset-4 md:text-lg">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-brand-green transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pl-10 font-body text-sm leading-relaxed text-brand-muted md:text-base">
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

export default function DiabetesShudhiLanding({
  product,
}: {
  product: CatalogProduct;
}) {
  const variantId = product.variants[0]?.id ?? "";

  return (
    <div className={`${LANDING_BG} text-brand-text`}>
      <LandingMarquee items={TOP_TICKER} />

      <LandingHeroBanners
        variantId={variantId}
        availableForSale={product.availableForSale}
      />

      <LandingMarquee items={[HERO_TICKER]} variant="dark" />

      {/* Clinical stats */}
      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="hidden gap-8 md:grid md:grid-cols-3">
            {CLINICAL_STATS.map((stat) => (
              <div key={stat.value} className="text-center">
                <div className="mx-auto mb-4 flex justify-center">
                  <StatIcon type={stat.icon} />
                </div>
                <p className="font-shop text-5xl font-bold text-brand-green">{stat.value}</p>
                <p className="mt-3 font-shop text-base font-medium text-brand-text">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="md:hidden">
            <LandingDotsCarousel
              items={CLINICAL_STATS}
              intervalMs={5000}
              renderItem={(stat) => (
                <div className="text-center">
                  <div className="mx-auto mb-4 flex justify-center">
                    <StatIcon type={stat.icon} />
                  </div>
                  <p className="font-shop text-5xl font-bold text-brand-green">{stat.value}</p>
                  <p className="mt-3 font-shop text-base font-medium text-brand-text">{stat.label}</p>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* Social proof CTA */}
      <section className="border-y border-brand-green/10 px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-shop text-3xl font-bold leading-tight text-brand-green md:text-4xl">
              Look At How Others Are Loving Our Product!
            </h2>
            <div className="mt-8">
              <LandingBuyCta
                variantId={variantId}
                availableForSale={product.availableForSale}
                label="Buy Now"
                size="large"
              />
            </div>
            <div className="mt-6">
              <StarRating rating={product.rating} count={product.reviewCount} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["Customer story 1", "Customer story 2", "Customer story 3"].map((label, i) => (
              <div
                key={i}
                className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-gradient-to-b from-brand-green/20 to-brand-green/40"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <Play className="ml-1 h-5 w-5 fill-brand-green text-brand-green" />
                  </span>
                </div>
                <span className="sr-only">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 font-shop text-2xl font-bold text-brand-green md:text-3xl">
            Our Results
          </h2>
          <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {RESULTS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-[#3d9e2a] px-5 py-8 text-center text-white shadow-md"
              >
                <p className="font-shop text-4xl font-bold md:text-5xl">{item.value}</p>
                <p className="mt-3 font-shop text-sm leading-snug opacity-95">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="sm:hidden">
            <LandingDotsCarousel
              items={RESULTS}
              intervalMs={4500}
              renderItem={(item) => (
                <div className="rounded-2xl bg-[#3d9e2a] px-5 py-8 text-center text-white shadow-md">
                  <p className="font-shop text-4xl font-bold">{item.value}</p>
                  <p className="mt-3 font-shop text-sm leading-snug opacity-95">{item.label}</p>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* Media recognition */}
      <section className="border-y border-brand-green/10 bg-white/40 px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-shop text-2xl font-bold leading-snug text-brand-green md:text-3xl">
            {MEDIA_HEADLINE}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-shop text-sm text-brand-muted md:text-base">
            {MEDIA_SUBLINE}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {MEDIA_LOGOS.map((logo) => (
              <span
                key={logo.name}
                className={`font-shop text-sm md:text-base ${logo.style}`}
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Product showcase */}
      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-white px-4 py-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#f5d547] text-[#f5d547]" />
                ))}
              </div>
              <span className="font-shop text-sm text-brand-green">
                Excellent <strong>4.8/5 Rated</strong>
              </span>
            </div>
            <h2 className="mt-6 font-shop text-3xl font-bold text-brand-green md:text-4xl">
              {product.name} — Advanced Ayurvedic Formula
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-brand-muted">
              {product.description} Enriched with time-tested Ayurvedic ingredients including
              Bitter Melon, Fenugreek, Jamun, Gudmar, and Neem — crafted to support metabolism,
              balance sugar cravings, and long-term metabolic wellness as part of a healthy lifestyle.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <LandingBuyCta
                variantId={variantId}
                availableForSale={product.availableForSale}
                label="Buy Now"
                size="large"
              />
              <p className="font-shop text-2xl font-bold text-brand-text">
                {formatPrice(product.price)}
              </p>
            </div>
            <div className="mt-6">
              <StarRating rating={product.rating} count={product.reviewCount} />
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-brand-green/15 bg-white shadow-lg">
            <Image
              src="/shop/explore/diabetes-shudhi.png"
              alt={product.name}
              fill
              className="object-contain p-6"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="border-y border-brand-green/10 bg-white/50 px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {CASE_STUDIES.map((study, index) => (
            <div key={study.name}>
              <A1cProgressChart
                id={String(index)}
                startA1c={study.startA1c}
                threeMonthA1c={study.threeMonthA1c}
                reversedMonths={study.reversedMonths}
                medicineStoppedDays={study.medicineStoppedDays}
              />
              <p className="mt-3 text-center font-shop text-sm font-semibold text-brand-green">
                {study.name} · {study.location}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials carousel */}
      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          <LandingDotsCarousel
            items={TESTIMONIALS}
            intervalMs={8000}
            renderItem={(item) => (
              <article className="text-center md:px-8">
                <h3 className="font-shop text-2xl font-bold text-brand-text md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-6 font-body text-base leading-relaxed text-brand-green md:text-lg">
                  {item.body}
                </p>
                <p className="mt-6 font-shop text-sm font-bold text-brand-green">
                  — {item.author}
                </p>
              </article>
            )}
          />
        </div>
      </section>

      {/* Mission card */}
      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-shop text-2xl font-bold text-brand-green md:text-3xl">
            Transforming Chronic Wellness With Ayurveda
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-shop text-sm text-brand-muted md:text-base">
            Research-backed tradition: Har Ghar Shudhi delivers natural, Ayurvedic-based solutions
            for metabolic conditions as part of diet, activity, and medical guidance.
          </p>
          <div className="relative mt-10 overflow-hidden rounded-3xl bg-brand-green px-6 py-12 md:px-12 md:py-16">
            <div className="relative z-10 grid items-center gap-8 md:grid-cols-3">
              <div className="text-left text-white">
                <p className="font-shop text-xl font-bold">Har Ghar Shudhi</p>
                <p className="mt-2 font-shop text-sm opacity-90">
                  India&apos;s trusted way to support blood sugar naturally.
                </p>
              </div>
              <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-white/30 md:h-56 md:w-56">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
              </div>
              <div className="text-left text-white md:text-right">
                <p className="font-shop text-sm leading-relaxed opacity-95">
                  Ayurvedic excellence meets modern science — enhanced by rigorous quality
                  testing for real, honest results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Triple cards */}
      <section className="border-t border-brand-green/10 px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {/* Supplement facts */}
          <div className="rounded-xl border-2 border-brand-text bg-white p-5 shadow-sm">
            <h3 className="border-b-4 border-brand-text pb-2 font-shop text-lg font-bold">
              Supplement Facts
            </h3>
            <p className="mt-2 font-shop text-xs text-brand-muted">
              Serving Size: 2 Capsules · Servings Per Container: 30
            </p>
            <table className="mt-4 w-full font-shop text-xs">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="py-1 text-left font-semibold">Ingredient</th>
                  <th className="py-1 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {SUPPLEMENT_FACTS.map((row) => (
                  <tr key={row.name} className="border-b border-brand-border/60">
                    <td className="py-1.5 pr-2 text-brand-text">{row.name}</td>
                    <td className="py-1.5 text-right text-brand-muted">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 font-shop text-[10px] text-brand-muted">
              *Daily Value not established
            </p>
          </div>

          {/* Product description */}
          <div className="rounded-xl border-2 border-brand-green bg-brand-green-light/40 p-6">
            <p className="font-body text-sm leading-relaxed text-brand-text md:text-base">
              Diabetes Shudhi is an Ayurvedic formula made in a GMP-certified facility, designed to
              support metabolic care by naturally balancing blood sugar and boosting daily energy.
              Crafted with trusted herbal ingredients for safe, effective glucose wellness. 100%
              satisfaction guaranteed.
            </p>
            <div className="mt-8">
              <LandingBuyCta
                variantId={variantId}
                availableForSale={product.availableForSale}
                label="Buy Now"
                size="large"
                className="w-full"
              />
            </div>
          </div>

          {/* Promo card */}
          <div className="rounded-xl border border-brand-green/20 bg-white p-6 shadow-sm">
            <h3 className="font-shop text-lg font-bold leading-snug text-brand-text">
              Your Natural Solution for{" "}
              <span className="text-brand-green">Sugar Control & Metabolic Relief!</span>
            </h3>
            <ul className="mt-4 space-y-2">
              {HERO.checks.map((item) => (
                <li key={item} className="flex items-center gap-2 font-shop text-sm text-brand-green">
                  <Check className="h-4 w-4" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="relative mx-auto mt-6 h-40 w-32">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="mt-4 text-center">
              <LandingBuyCta
                variantId={variantId}
                availableForSale={product.availableForSale}
                label="Shop Now"
                size="yellow"
              />
            </div>
          </div>
        </div>

        {/* Short quotes */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          {SHORT_QUOTES.map((quote, i) => (
            <blockquote
              key={i}
              className="rounded-xl bg-white/60 p-5 font-body text-sm italic leading-relaxed text-brand-green"
            >
              &ldquo;{quote}&rdquo;
            </blockquote>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="border-y border-brand-green/10 bg-white/40 px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <h2 className="font-shop text-2xl font-bold text-brand-green md:text-3xl">
              Why Diabetes Shudhi Stands Out?
            </h2>
            <LandingBuyCta
              variantId={variantId}
              availableForSale={product.availableForSale}
              label="Buy Now"
            />
          </div>
          <div className="overflow-x-auto rounded-xl border border-brand-green/30">
            <table className="w-full min-w-[480px] border-collapse font-shop text-sm">
              <thead>
                <tr>
                  <th className="bg-brand-green p-4 text-left font-semibold text-white" />
                  <th className="border-l border-brand-green/30 bg-white p-4 text-center font-bold text-brand-green">
                    Har Ghar Shudhi
                  </th>
                  <th className="border-l border-brand-green/30 bg-white p-4 text-center font-bold text-brand-green">
                    Allopathy
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="border-t border-brand-green/20">
                    <td className="bg-brand-green p-4 font-medium text-white">{row.feature}</td>
                    <td className="border-l border-brand-green/20 bg-white p-4 text-center">
                      {row.hgs ? (
                        <Check className="mx-auto h-6 w-6 text-brand-green" />
                      ) : (
                        <X className="mx-auto h-6 w-6 text-brand-muted/40" />
                      )}
                    </td>
                    <td className="border-l border-brand-green/20 bg-white p-4 text-center">
                      {row.allopathy ? (
                        <Check className="mx-auto h-6 w-6 text-brand-green/40" />
                      ) : (
                        <X className="mx-auto h-6 w-6 text-brand-muted/40" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-12 md:px-8 md:py-16">
        <h2 className="mb-10 text-center font-shop text-3xl font-bold text-brand-green md:text-4xl">
          Frequently Asked <span className="font-display italic font-normal">Questions</span>
        </h2>
        <LandingFaq />
      </section>

      <LandingMarquee items={TRUST_STRIP} />

      {/* Final CTA */}
      <section className="bg-brand-green px-4 py-14 text-center text-white md:px-8 md:py-20">
        <h2 className="font-display text-3xl font-medium md:text-4xl">
          {product.finalCta.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-base italic opacity-90">
          {product.finalCta.subline}
        </p>
        <div className="mt-8">
          <LandingBuyCta
            variantId={variantId}
            availableForSale={product.availableForSale}
            label="Buy Now"
            size="large"
            className="bg-white text-brand-green hover:bg-brand-cream"
          />
        </div>
      </section>
    </div>
  );
}
