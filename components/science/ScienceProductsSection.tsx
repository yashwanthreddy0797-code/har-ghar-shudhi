import BrandLogo from "@/components/BrandLogo";
import {
  SCIENCE_PRODUCT_HIGHLIGHTS,
  SCIENCE_PRODUCTS_FOOTER,
} from "@/lib/brand/scienceTrust";
import {
  Flower2,
  Leaf,
  Microscope,
  Mountain,
  ShieldCheck,
  ShieldOff,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const HIGHLIGHT_ICONS: Record<string, LucideIcon> = {
  honey: Flower2,
  superfoods: Leaf,
  additives: ShieldOff,
  "lab-tested": Microscope,
  sourcing: Mountain,
  customers: Users,
};

function PremiumIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="science-products-section__icon-shell">
      <div className="science-products-section__icon-ring" aria-hidden />
      <div className="science-products-section__icon-wrap">
        <Icon className="science-products-section__icon" strokeWidth={1.25} />
      </div>
    </div>
  );
}

export default function ScienceProductsSection() {
  return (
    <section
      aria-labelledby="science-products-heading"
      className="science-products-section border-b border-brand-border"
    >
      <div className="science-products-section__glow" aria-hidden />
      <div className="science-products-section__inner">
        <header className="science-products-section__header">
          <p
            id="science-products-heading"
            className="science-products-section__eyebrow"
          >
            Har Ghar Shudhi Products
          </p>
          <div className="science-products-section__header-accent" aria-hidden>
            <span />
            <Leaf
              className="h-3.5 w-3.5"
              strokeWidth={1.5}
              fill="currentColor"
              fillOpacity={0.14}
            />
            <span />
          </div>
        </header>

        <ul className="science-products-section__grid">
          {SCIENCE_PRODUCT_HIGHLIGHTS.map((item) => {
            const Icon = HIGHLIGHT_ICONS[item.id] ?? Leaf;
            const isWideHighlight = item.highlight.length > 8;

            return (
              <li key={item.id} className="science-products-section__card">
                <PremiumIcon Icon={Icon} />

                <p
                  className={`science-products-section__highlight ${
                    isWideHighlight
                      ? "science-products-section__highlight--compact"
                      : ""
                  }`}
                >
                  {item.highlight}
                </p>

                <span className="science-products-section__accent-dot" aria-hidden />

                <h3 className="science-products-section__title">{item.title}</h3>
                <p className="science-products-section__description">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="science-products-section__logo-wrap">
          <BrandLogo size="md" href={null} className="mx-auto" />
        </div>

        <div className="science-products-section__footer-banner">
          <div className="science-products-section__footer-icon-wrap">
            <ShieldCheck
              className="science-products-section__footer-icon"
              strokeWidth={1.5}
            />
          </div>
          <p className="science-products-section__footer-text">
            {SCIENCE_PRODUCTS_FOOTER}
          </p>
        </div>
      </div>
    </section>
  );
}
