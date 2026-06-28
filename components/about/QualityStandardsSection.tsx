import { QUALITY } from "@/lib/brand/content";
import { FlaskConical, Globe, Leaf, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PILLAR_ICONS: Record<string, LucideIcon> = {
  "Premium Quality Herbs": Leaf,
  "Hygienic & Modern Processing": FlaskConical,
  "Rigorous Quality Testing": ShieldCheck,
  "Eco-friendly Packaging": Globe,
};

function GoldDivider() {
  return (
    <div className="quality-standards-section__divider" aria-hidden>
      <span />
      <span className="quality-standards-section__divider-diamond" />
      <span />
    </div>
  );
}

export default function QualityStandardsSection() {
  return (
    <section
      id="quality"
      className="quality-standards-section scroll-mt-36 bg-brand-white"
    >
      <div className="quality-standards-section__inner">
        <header className="quality-standards-section__header">
          <div className="quality-standards-section__eyebrow-divider" aria-hidden>
            <span />
            <Leaf
              className="h-3.5 w-3.5"
              strokeWidth={1.5}
              fill="currentColor"
              fillOpacity={0.15}
            />
            <span />
          </div>
          <p className="quality-standards-section__eyebrow">Our Standards</p>
          <h2 className="quality-standards-section__headline">
            Made the <span className="quality-standards-section__headline-accent">Right Way</span>
          </h2>
          <p className="quality-standards-section__subline">{QUALITY.subline}</p>
        </header>

        <ul className="quality-standards-section__grid">
          {QUALITY.pillars.map((pillar) => {
            const Icon = PILLAR_ICONS[pillar.title] ?? Leaf;
            return (
              <li key={pillar.title} className="quality-standards-section__card">
                <div className="quality-standards-section__icon-wrap">
                  <Icon className="quality-standards-section__icon" strokeWidth={1.35} />
                </div>
                <h3 className="quality-standards-section__card-title">{pillar.title}</h3>
                <GoldDivider />
                <p className="quality-standards-section__card-body">{pillar.description}</p>
                <span className="quality-standards-section__card-accent" aria-hidden />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
