import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog/types";
import ProductCard from "@/components/shop/ProductCard";

export default function CatalogRelatedProducts({
  products,
}: {
  products: CatalogProduct[];
}) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-products-heading">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2
          id="related-products-heading"
          className="font-display text-2xl font-medium tracking-[0.02em] text-brand-text md:text-[2rem]"
        >
          Related Products
        </h2>
        <Link
          href="/shop"
          className="hidden font-shop text-xs font-semibold uppercase tracking-[0.16em] text-brand-green transition-colors hover:text-brand-green-dark sm:inline"
        >
          View all
        </Link>
      </div>

      <div className="-mx-6 flex gap-5 overflow-x-auto px-6 pb-2 snap-x snap-mandatory scrollbar-hide md:-mx-0 md:grid md:grid-cols-4 md:gap-7 md:overflow-visible md:px-0 md:pb-0">
        {products.map((product) => (
          <div
            key={product.slug}
            className="w-[72vw] shrink-0 snap-start sm:w-[42vw] md:w-auto"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
