"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog/types";

export default function CatalogProductFaqSection({
  product,
}: {
  product: CatalogProduct;
}) {
  const { faqs } = product;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section
      aria-labelledby={`${product.slug}-faq-heading`}
      className="border-b border-[#e8dcc8] bg-[#f7ebe0] px-4 py-12 sm:px-6 md:px-10 md:py-16"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-14 lg:gap-20">
        <div className="md:pt-2">
          <h2
            id={`${product.slug}-faq-heading`}
            className="font-display text-[clamp(2.75rem,7vw,4rem)] font-medium leading-none tracking-[0.02em] text-[#3d2518]"
          >
            FAQ
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-[#6b5344]/90 md:text-[1.05rem]">
            Have questions? We&apos;ve got answers
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(61,37,24,0.06)]"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                >
                  <span className="font-body text-[15px] font-medium leading-snug text-brand-green-dark md:text-base">
                    {index + 1}. {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-green transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 font-body text-sm leading-[1.85] text-brand-muted md:px-6 md:pb-6 md:text-[15px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
