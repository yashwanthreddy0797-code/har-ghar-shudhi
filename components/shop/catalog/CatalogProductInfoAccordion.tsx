"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog/types";
import {
  getProductInfoPanelsData,
  type ProductInfoPanelContent,
  type ProductInfoPanelId,
} from "@/lib/catalog/productInfoSections";

function PanelBody({ content }: { content: ProductInfoPanelContent }) {
  switch (content.type) {
    case "description":
      return (
        <div className="space-y-4">
          <p className="font-body text-[15px] leading-[1.85] text-brand-text">
            {content.lead}
          </p>
          <p className="font-body text-sm leading-[1.85] text-brand-muted">
            {content.body}
          </p>
          {content.highlights.length > 0 ? (
            <ul className="space-y-2 border-t border-brand-border/60 pt-4">
              {content.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 font-shop text-sm text-brand-muted"
                >
                  <span className="text-brand-green" aria-hidden>
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      );

    case "ingredients":
      return (
        <div className="space-y-4">
          <p className="font-shop text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">
            {content.title}
          </p>
          <ul className="space-y-4">
            {content.items.map((item) => (
              <li key={item.name}>
                <p className="font-shop text-sm font-semibold text-brand-text">
                  {item.name}
                </p>
                <p className="mt-1 font-body text-sm leading-[1.8] text-brand-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      );

    case "usage":
      return (
        <ol className="space-y-4">
          {content.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-green/25 bg-brand-green-light font-shop text-xs font-semibold text-brand-green">
                {index + 1}
              </span>
              <div>
                <p className="font-shop text-sm font-semibold text-brand-text">
                  {step.title}
                </p>
                <p className="mt-1 font-body text-sm leading-[1.8] text-brand-muted">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "benefits":
      return (
        <div className="space-y-6">
          <ul className="grid gap-3 sm:grid-cols-2">
            {content.keyBenefits.map((benefit) => (
              <li
                key={benefit.label}
                className="flex items-center gap-3 rounded-md border border-brand-border/70 bg-brand-white/60 px-4 py-3"
              >
                <span className="text-xl" aria-hidden>
                  {benefit.icon}
                </span>
                <span className="font-shop text-sm font-medium text-brand-text">
                  {benefit.label}
                </span>
              </li>
            ))}
          </ul>
          <ul className="space-y-3 border-t border-brand-border/60 pt-4">
            {content.features.map((feature) => (
              <li key={feature.title}>
                <p className="font-shop text-sm font-semibold text-brand-text">
                  {feature.title}
                </p>
                <p className="mt-1 font-body text-sm leading-[1.8] text-brand-muted">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      );

    case "storage":
      return (
        <p className="font-body text-sm leading-[1.85] text-brand-muted md:text-[15px]">
          {content.text}
        </p>
      );

    default:
      return null;
  }
}

export default function CatalogProductInfoAccordion({
  product,
}: {
  product: CatalogProduct;
}) {
  const panels = getProductInfoPanelsData(product);
  const [openId, setOpenId] = useState<ProductInfoPanelId | null>(null);

  return (
    <div className="border-y border-brand-border/80">
      {panels.map((panel) => {
        const open = openId === panel.id;
        return (
          <div key={panel.id} className="border-b border-brand-border/80 last:border-b-0">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : panel.id)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:opacity-80 md:py-6"
            >
              <span className="font-shop text-sm font-bold uppercase tracking-[0.12em] text-brand-green md:text-[15px]">
                {panel.label}
              </span>
              <Plus
                className={`h-4 w-4 shrink-0 text-brand-green transition-transform duration-300 ${
                  open ? "rotate-45" : ""
                }`}
                strokeWidth={2.25}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-5 md:pb-6">
                  <PanelBody content={panel.content} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
