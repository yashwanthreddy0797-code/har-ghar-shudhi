import Link from "next/link";
import { Check } from "lucide-react";
import { COMPARISON_ROWS } from "@/lib/brand/scienceTrust";

export default function ScienceComparisonSection() {
  return (
    <section
      aria-labelledby="science-comparison-heading"
      className="border-b border-brand-green/10 bg-[#f4fbe8] px-6 py-10 md:px-12 md:py-14"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <div className="shrink-0 lg:max-w-[220px] lg:pt-2">
          <h2
            id="science-comparison-heading"
            className="font-shop text-xl font-bold leading-snug text-brand-green-dark md:text-2xl"
          >
            Why Har Ghar Shudhi Stands Out?
          </h2>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-green-dark px-7 py-2.5 font-shop text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#234430]"
          >
            Shop Now
          </Link>
        </div>

        <div className="min-w-0 flex-1 lg:flex lg:justify-end">
          <div className="w-full max-w-[min(100%,22rem)] sm:max-w-[24rem]">
            <div className="grid grid-cols-[1.15fr_0.85fr] gap-0">
              <div
                className="flex min-h-[3.25rem] items-center rounded-tl-xl bg-brand-green-dark px-3 sm:min-h-[3.5rem]"
                aria-hidden
              />
              <div className="flex min-h-[3.25rem] items-center justify-center rounded-t-lg rounded-tr-xl border-2 border-b-0 border-brand-green-dark bg-white px-2.5 shadow-sm sm:min-h-[3.5rem]">
                <p className="font-shop text-xs font-bold leading-tight text-brand-green-dark sm:text-sm">
                  Har Ghar Shudhi
                </p>
              </div>
            </div>

            {COMPARISON_ROWS.map((feature, index) => {
              const isLast = index === COMPARISON_ROWS.length - 1;

              return (
                <div key={feature} className="grid grid-cols-[1.15fr_0.85fr] gap-0">
                  <div
                    className={`flex min-h-[2.75rem] items-center bg-brand-green-dark px-3 py-2.5 sm:min-h-[3rem] sm:py-3 ${
                      isLast ? "rounded-bl-xl" : ""
                    }`}
                  >
                    <p className="font-shop text-xs font-semibold leading-snug text-white sm:text-[13px]">
                      {feature}
                    </p>
                  </div>

                  <div
                    className={`flex min-h-[2.75rem] items-center justify-center border-x-2 border-brand-green-dark bg-white px-2 py-2.5 sm:min-h-[3rem] sm:py-3 ${
                      isLast
                        ? "rounded-b-lg rounded-br-xl border-b-2"
                        : "border-b border-b-brand-green-dark/15"
                    }`}
                  >
                    <Check
                      className="mx-auto h-5 w-5 text-brand-green-dark sm:h-5 sm:w-5"
                      strokeWidth={2.75}
                      aria-hidden
                    />
                    <span className="sr-only">{feature}: included</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
