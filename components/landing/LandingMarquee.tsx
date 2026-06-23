"use client";

const LANDING_BG = "bg-[#f4fbe8]";

export function LandingMarquee({
  items,
  variant = "green",
  className = "",
}: {
  items: readonly string[];
  variant?: "green" | "dark";
  className?: string;
}) {
  const doubled = [...items, ...items];
  const bg =
    variant === "dark" ? "bg-brand-green-dark" : "bg-[#3d9e2a] text-white";

  return (
    <div className={`overflow-hidden py-2.5 ${bg} ${className}`}>
      <div className="animate-marquee flex whitespace-nowrap">
        {doubled.map((text, i) => (
          <span
            key={i}
            className="mx-6 font-shop text-xs font-semibold uppercase tracking-[0.12em] md:text-sm"
          >
            {text}
            <span className="mx-6 opacity-60">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export { LANDING_BG };
