import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types/product";
import ProductImageFromProduct from "./ProductImage";

function getBenefitPills(product: Product): string[] {
  return product.benefitPills?.length
    ? product.benefitPills
    : product.highlights.slice(0, 3);
}

function getProductType(product: Product): string | undefined {
  return product.productType;
}

export default function ProductCard({ product }: { product: Product }) {
  const benefitPills = getBenefitPills(product);
  const productType = getProductType(product);

  return (
    <article className="group flex flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg border border-brand-border bg-brand-white transition-[transform,box-shadow,border-color,background-color] duration-500 ease-out group-hover:-translate-y-1 group-hover:border-luxury-gold/35 group-hover:bg-[#fdfcf8] group-hover:shadow-[0_18px_40px_rgba(201,169,98,0.14),0_8px_24px_rgba(45,82,57,0.08)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,169,98,0.14)_0%,transparent_72%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="relative z-[2]">
            <ProductImageFromProduct product={product} />
            {product.badge && (
              <span className="absolute left-3 top-3 rounded bg-brand-green px-2.5 py-1 font-shop text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                {product.badge}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-[15px] font-medium uppercase leading-snug tracking-[0.04em] text-brand-text transition-colors duration-300 group-hover:text-brand-green md:text-base">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1.5 font-body text-xs italic leading-relaxed text-brand-muted md:text-[13px]">
          {product.tagline}
        </p>

        {benefitPills.length > 0 && (
          <p className="mt-2.5 font-shop text-[11px] tracking-[0.06em] text-brand-green/90 md:text-xs">
            {benefitPills.join(" • ")}
          </p>
        )}

        {productType && (
          <p className="mt-2 font-shop text-[10px] uppercase tracking-[0.18em] text-brand-muted/80">
            {productType}
          </p>
        )}

        <Link
          href={`/products/${product.slug}`}
          className="mt-4 inline-flex translate-y-0 items-center gap-2 self-start font-shop text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green opacity-100 transition-[opacity,transform,color] duration-500 hover:text-brand-green-dark md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          Explore Product
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
