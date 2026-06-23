import type { ReactNode } from "react";

type Variant = "white" | "cream" | "forest" | "deep" | "sand";

const VARIANTS: Record<Variant, string> = {
  white: "bg-brand-white border-brand-border text-brand-text",
  cream: "bg-brand-cream border-brand-border text-brand-text",
  sand: "bg-brand-sand border-brand-border text-brand-text",
  forest: "about-brand-forest border-white/10 text-white",
  deep: "about-brand-deep border-white/10 text-white",
};

export default function AboutSection({
  id,
  eyebrow,
  title,
  description,
  children,
  variant = "white",
  align = "left",
  className = "",
  compact = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  variant?: Variant;
  align?: "left" | "center";
  className?: string;
  compact?: boolean;
}) {
  const isDark = variant === "forest" || variant === "deep";
  const centered = align === "center";

  return (
    <section
      id={id}
      className={`scroll-mt-36 border-b ${VARIANTS[variant]} ${className}`}
    >
      <div
        className={[
          "mx-auto max-w-6xl px-6 md:px-12",
          compact ? "py-14 md:py-18" : "py-16 md:py-24",
        ].join(" ")}
      >
        <header
          className={[
            centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
            compact ? "mb-10 md:mb-12" : "mb-12 md:mb-16",
          ].join(" ")}
        >
          <p
            className={`font-shop text-[10px] font-semibold uppercase tracking-[0.28em] ${
              isDark ? "text-luxury-gold" : "text-brand-green"
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`mt-5 font-display text-[clamp(1.75rem,3.5vw,2.65rem)] font-medium leading-[1.12] tracking-[0.02em] ${
              isDark ? "text-white" : "text-brand-text"
            }`}
          >
            {title}
          </h2>
          {description && (
            <p
              className={`mt-5 font-body text-base leading-[1.85] md:text-[1.05rem] ${
                isDark ? "text-white/70" : "text-brand-muted"
              }`}
            >
              {description}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
