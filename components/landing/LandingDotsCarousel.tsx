"use client";

import { useEffect, useState } from "react";

export default function LandingDotsCarousel<T>({
  items,
  intervalMs = 6000,
  renderItem,
  className = "",
}: {
  items: readonly T[];
  intervalMs?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, intervalMs]);

  return (
    <div className={className}>
      <div className="relative min-h-[1px]">
        {items.map((item, index) => (
          <div
            key={index}
            className={`transition-opacity duration-500 ${
              index === active
                ? "relative opacity-100"
                : "pointer-events-none absolute inset-0 opacity-0"
            }`}
            aria-hidden={index !== active}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === active
                  ? "w-8 bg-brand-green"
                  : "w-2.5 bg-brand-green/30 hover:bg-brand-green/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
