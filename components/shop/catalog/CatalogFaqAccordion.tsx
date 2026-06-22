"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CatalogFaq } from "@/lib/catalog/types";

export default function CatalogFaqAccordion({ faqs }: { faqs: CatalogFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-brand-border border-y border-brand-border">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-brand-green"
            >
              <span className="font-display text-lg font-medium tracking-[0.01em] text-brand-text md:text-xl">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-brand-muted transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 font-body text-sm leading-[1.85] text-brand-muted md:text-[15px]">
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
