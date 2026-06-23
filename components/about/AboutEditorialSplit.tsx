import Image from "next/image";
import type { ReactNode } from "react";

export default function AboutEditorialSplit({
  id,
  eyebrow,
  title,
  description,
  children,
  imageSrc,
  imageAlt = "",
  imagePosition = "right",
  variant = "light",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  const imageFirst = imagePosition === "left";

  return (
    <section
      id={id}
      className={[
        "scroll-mt-36 border-b",
        isDark
          ? "border-white/10 bg-brand-green-dark text-white"
          : "border-brand-border bg-brand-white text-brand-text",
      ].join(" ")}
    >
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2 lg:items-stretch">
        <div
          className={[
            "relative min-h-[280px] lg:min-h-[480px]",
            imageFirst ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className={[
              "absolute inset-0",
              isDark ? "bg-brand-green-dark/20" : "bg-brand-green/5",
            ].join(" ")}
          />
        </div>

        <div
          className={[
            "flex flex-col justify-center px-6 py-14 md:px-12 md:py-20 lg:py-24",
            imageFirst ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
        >
          <p
            className={[
              "font-shop text-[10px] font-semibold uppercase tracking-[0.28em]",
              isDark ? "text-luxury-gold" : "text-brand-green",
            ].join(" ")}
          >
            {eyebrow}
          </p>
          <h2
            className={[
              "mt-5 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.15] tracking-[0.02em]",
              isDark ? "text-white" : "text-brand-text",
            ].join(" ")}
          >
            {title}
          </h2>
          {description && (
            <p
              className={[
                "mt-6 max-w-lg font-body text-base leading-[1.9] md:text-[1.05rem]",
                isDark ? "text-white/72" : "text-brand-muted",
              ].join(" ")}
            >
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
