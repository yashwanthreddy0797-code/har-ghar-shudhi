import type { ReactNode } from "react";

type Variant = "white" | "cream" | "forest" | "deep";

const VARIANTS: Record<Variant, string> = {
  white: "bg-brand-white border-brand-border text-brand-text",
  cream: "bg-brand-cream border-brand-border text-brand-text",
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
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  variant?: Variant;
  align?: "left" | "center";
  className?: string;
}) {
  const isDark = variant === "forest" || variant === "deep";
  const centered = align === "center";

  return (
    <section
      id={id}
      className={`scroll-mt-36 border-b ${VARIANTS[variant]} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24">
        <header
          className={[
            "mb-12 md:mb-16",
            centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
          ].join(" ")}
        >
          <p
            className={`font-shop text-[11px] font-semibold uppercase tracking-[0.24em] ${
              isDark ? "text-luxury-gold" : "text-brand-green"
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`mt-4 font-display text-[clamp(1.85rem,3.8vw,2.75rem)] font-medium leading-[1.12] tracking-[0.02em] ${
              isDark ? "text-white" : "text-brand-text"
            }`}
          >
            {title}
          </h2>
          {description && (
            <p
              className={`mt-4 font-body text-base italic leading-relaxed md:text-lg ${
                isDark ? "text-white/68" : "text-brand-muted"
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
