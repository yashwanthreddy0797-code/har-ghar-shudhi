import type { CatalogProduct } from "@/lib/catalog/types";
import CatalogProductScrollHero from "@/components/shop/catalog/CatalogProductScrollHero";
import CatalogProductBuySection from "@/components/shop/catalog/CatalogProductBuySection";
import CatalogProductDetails from "@/components/shop/catalog/CatalogProductDetails";
import SmoothScroll from "@/components/SmoothScroll";
import CertificatesProofSection from "@/components/CertificatesProofSection";
import Footer from "@/components/Footer";
import type { CatalogScrollSlug } from "@/lib/catalog/scrollProducts";

/**
 * Product page with a cinematic scroll film at the top, then the standard
 * two-column buy section (copy + product image) and remaining catalog content.
 */
export default function CatalogScrollProductPage({
  product,
  slug,
}: {
  product: CatalogProduct;
  slug: CatalogScrollSlug;
}) {
  return (
    <SmoothScroll>
      <CatalogProductScrollHero slug={slug} />
      <div className="shop-typography bg-brand-white text-brand-text">
        <main>
          <CatalogProductBuySection product={product} afterCinematicScroll />
          <CatalogProductDetails product={product} />
        </main>
        <CertificatesProofSection />
        <Footer variant="full" />
      </div>
    </SmoothScroll>
  );
}
