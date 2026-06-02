import Link from "next/link";
import { CATEGORIES, CONCERNS } from "@/lib/types/product";

interface CategoryHeroProps {
  title: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function CategoryHero({
  title,
  description,
  breadcrumbs,
}: CategoryHeroProps) {
  return (
    <section className="border-b border-brand-border bg-brand-cream px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        {breadcrumbs && (
          <nav className="mb-5 flex flex-wrap items-center gap-2 font-sans text-xs text-brand-muted">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-brand-green"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-brand-text">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="font-serif text-3xl font-light text-brand-text md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-brand-muted md:text-base">
          {description}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="rounded-full border border-brand-border bg-brand-white px-4 py-2 font-sans text-xs font-medium text-brand-text transition-colors hover:border-brand-green hover:text-brand-green"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {CONCERNS.map((concern) => (
            <Link
              key={concern.slug}
              href={`/shop/concern/${concern.slug}`}
              className="rounded-full border border-brand-green/20 bg-brand-green-light px-4 py-2 font-sans text-xs font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white"
            >
              {concern.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
