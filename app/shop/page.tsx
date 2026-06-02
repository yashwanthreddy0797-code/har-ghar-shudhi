import PageShell from "@/components/PageShell";
import CategoryHero from "@/components/shop/CategoryHero";
import ProductGrid from "@/components/shop/ProductGrid";
import CertificationBanner from "@/components/shop/CertificationBanner";
import { getAllProducts } from "@/lib/shopify/products";

export const revalidate = 3600;

export const metadata = {
  title: "Shop All | Har Ghar Shudhi",
  description: "Browse organic ghee, atta, oils, immunity blends, and more.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <PageShell>
      <CategoryHero
        title="All Products"
        description="Raw, organic produce crafted with ancient wisdom — from bilona ghee to stone-ground atta, every product is traceable from farm to your home."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />
      <section className="bg-brand-white px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          <ProductGrid products={products} />
        </div>
      </section>
      <CertificationBanner />
    </PageShell>
  );
}
