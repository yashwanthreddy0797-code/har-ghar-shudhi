"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ABOUT_SECTIONS } from "@/lib/brand/content";

export default function AboutSectionNav() {
  const [activeId, setActiveId] = useState<string>(ABOUT_SECTIONS[0].id);

  useEffect(() => {
    const sectionEls = ABOUT_SECTIONS.map((s) =>
      document.getElementById(s.id)
    ).filter(Boolean) as HTMLElement[];

    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.5] }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="About page sections"
      className="sticky top-[calc(4rem+env(safe-area-inset-top,0px))] z-40 border-b border-brand-border/70 bg-brand-white/90 backdrop-blur-md md:top-[calc(4.5rem+env(safe-area-inset-top,0px))]"
    >
      <div className="mx-auto max-w-6xl overflow-x-auto px-5 [-ms-overflow-style:none] [scrollbar-width:none] md:px-12 [&::-webkit-scrollbar]:hidden">
        <ul className="flex gap-2 py-3.5">
          {ABOUT_SECTIONS.map((section) => {
            const active = activeId === section.id;
            return (
              <li key={section.id} className="shrink-0">
                <Link
                  href={`#${section.id}`}
                  className={[
                    "inline-block whitespace-nowrap rounded-full px-4 py-2 font-shop text-[10px] font-medium uppercase tracking-[0.14em] transition-all md:text-[11px]",
                    active
                      ? "bg-brand-green text-white shadow-[0_4px_20px_rgba(45,82,57,0.25)]"
                      : "text-brand-muted hover:bg-brand-green-light hover:text-brand-green",
                  ].join(" ")}
                >
                  {section.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
