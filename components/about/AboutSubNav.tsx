"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ABOUT_SECTIONS } from "@/lib/brand/content";

export default function AboutSubNav() {
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
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.15, 0.4] }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="About page sections"
      className="sticky top-[calc(4rem+env(safe-area-inset-top,0px))] z-40 bg-brand-white/95 backdrop-blur-sm md:top-[calc(4.5rem+env(safe-area-inset-top,0px))]"
    >
      <div className="mx-auto max-w-6xl overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] md:px-12 [&::-webkit-scrollbar]:hidden">
        <ul className="flex min-w-max items-center justify-center gap-1 py-4 md:gap-2">
          {ABOUT_SECTIONS.map((section) => {
            const active = activeId === section.id;
            return (
              <li key={section.id} className="shrink-0">
                <Link
                  href={`#${section.id}`}
                  className={[
                    "relative inline-block px-3 py-1.5 font-shop text-[10px] font-medium uppercase tracking-[0.16em] transition-colors md:px-4 md:text-[11px]",
                    active
                      ? "text-brand-green"
                      : "text-brand-muted hover:text-brand-text",
                  ].join(" ")}
                >
                  {section.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-[17px] h-px bg-brand-green md:inset-x-4" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
