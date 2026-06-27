import type { CatalogProduct } from "@/lib/catalog/types";
import CatalogProductBuySection from "@/components/shop/catalog/CatalogProductBuySection";
import CatalogProductDetails from "@/components/shop/catalog/CatalogProductDetails";

export default function CatalogProductPage({
  product,
}: {
  product: CatalogProduct;
}) {
  return (
    <>
      <CatalogProductBuySection product={product} />
      <CatalogProductDetails product={product} />
    </>
  );
}
