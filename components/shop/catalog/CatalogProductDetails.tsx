import type { CatalogProduct } from "@/lib/catalog/types";
import { getRelatedCatalogProducts } from "@/lib/catalog";
import CatalogProductInfoAccordion from "@/components/shop/catalog/CatalogProductInfoAccordion";
import CatalogRelatedProducts from "@/components/shop/catalog/CatalogRelatedProducts";

export default function CatalogProductDetails({
  product,
}: {
  product: CatalogProduct;
}) {
  const related = getRelatedCatalogProducts(product.relatedSlugs);

  return (
    <>
      <section className="border-b border-brand-border bg-brand-cream px-4 py-8 sm:px-6 md:px-10 md:py-10">
        <div className="mx-auto max-w-6xl">
          <CatalogProductInfoAccordion product={product} />
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-white px-4 py-10 sm:px-6 md:px-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <CatalogRelatedProducts products={related} />
        </div>
      </section>
    </>
  );
}
