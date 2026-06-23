import Link from "next/link";
import { Check } from "lucide-react";
import { COMPARISON_ROWS } from "@/lib/brand/scienceTrust";

const GREEN = "#3d9e2a";
const GREEN_DARK = "#2d7a1f";
const CREAM = "#f4fbe8";

export default function ScienceComparisonSection() {
  return (
    <section
      aria-labelledby="science-comparison-heading"
      className="border-b border-brand-green/10 px-4 py-12 md:px-8 md:py-16 lg:py-20"
      style={{ backgroundColor: CREAM }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
        <div className="shrink-0 lg:max-w-[240px] lg:pt-4">
          <h2
            id="science-comparison-heading"
            className="font-shop text-2xl font-bold leading-snug md:text-[1.75rem]"
            style={{ color: GREEN_DARK }}
          >
            Why Har Ghar Shudhi Stands Out?
          </h2>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center justify-center rounded-md px-9 py-3.5 font-shop text-sm font-bold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: GREEN }}
          >
            Shop Now
          </Link>
        </div>

        <div className="min-w-0 flex-1 overflow-x-auto">
          <div className="min-w-[380px]">
            <div className="grid grid-cols-[1.2fr_0.8fr] items-end gap-0">
              <div
                className="rounded-tl-2xl px-4 py-5"
                style={{ backgroundColor: GREEN }}
                aria-hidden
              />
              <div
                className="-mb-px rounded-t-xl rounded-tr-2xl border-2 border-b-0 bg-white px-3 py-4 text-center shadow-sm"
                style={{ borderColor: GREEN }}
              >
                <p
                  className="font-shop text-sm font-bold leading-tight md:text-base"
                  style={{ color: GREEN_DARK }}
                >
                  Har Ghar Shudhi
                </p>
              </div>
            </div>

            {COMPARISON_ROWS.map((feature, index) => {
              const isLast = index === COMPARISON_ROWS.length - 1;

              return (
                <div key={feature} className="grid grid-cols-[1.2fr_0.8fr] gap-0">
                  <div
                    className={`flex items-center px-4 py-4 md:py-5 ${
                      isLast ? "rounded-bl-2xl" : ""
                    }`}
                    style={{ backgroundColor: GREEN }}
                  >
                    <p className="font-shop text-sm font-semibold text-white md:text-[15px]">
                      {feature}
                    </p>
                  </div>

                  <div
                    className={`flex items-center justify-center border-x-2 bg-white px-3 py-4 md:py-5 ${
                      isLast
                        ? "rounded-b-xl rounded-br-2xl border-b-2"
                        : "border-b border-b-brand-green/15"
                    }`}
                    style={{ borderColor: GREEN }}
                  >
                    <Check
                      className="mx-auto h-7 w-7 text-[#3d9e2a]"
                      strokeWidth={3}
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
