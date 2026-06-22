import { BRAND_PILLARS } from "@/lib/brand/content";
import {
  Heart,
  Leaf,
  Package,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const PILLAR_ICONS = {
  natural: Leaf,
  transparent: ShieldCheck,
  quality: Sparkles,
  affordable: Heart,
  delivered: Package,
} as const;

export default function BrandPillarsBar({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={[
        "border-y",
        isDark
          ? "border-white/10 bg-brand-green-dark"
          : "border-brand-border bg-brand-cream/60",
        className,
      ].join(" ")}
    >
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-4 px-6 py-5 md:gap-x-10 md:px-12 md:py-6">
        {BRAND_PILLARS.map((pillar) => {
          const Icon = PILLAR_ICONS[pillar.id as keyof typeof PILLAR_ICONS];
          return (
            <li
              key={pillar.id}
              className="flex items-center gap-2.5 font-shop text-[10px] font-semibold uppercase tracking-[0.16em] md:text-[11px]"
            >
              <Icon
                className={`h-3.5 w-3.5 shrink-0 ${isDark ? "text-luxury-gold" : "text-brand-green"}`}
                strokeWidth={1.5}
              />
              <span className={isDark ? "text-white/85" : "text-brand-text/80"}>
                {pillar.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
