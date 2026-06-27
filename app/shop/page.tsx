import PageShell from "@/components/PageShell";
import CategoryHero from "@/components/shop/CategoryHero";
import ShopShowcase from "@/components/shop/ShopShowcase";
import ShopExploreSection from "@/components/shop/ShopExploreSection";
import ProductGrid from "@/components/shop/ProductGrid";
import BrandPillarsBar from "@/components/about/BrandPillarsBar";
import { getStoreProducts } from "@/lib/commerce/products";

export const revalidate = 3600;

export const metadata = {
  title: "Shop All | Har Ghar Shudhi",
  description:
    "Browse Pure Shilajit, Ashwagandha, superfoods, honey, and Ayurvedic wellness from Har Ghar Shudhi.",
};

export default async function ShopPage() {
  const products = await getStoreProducts();

  return (
    <PageShell proofSectionClassName="relative z-20 !overflow-visible border-t border-brand-border/60 !pt-14 md:!pt-16">
      <CategoryHero
        title="All Products"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />
      <BrandPillarsBar />
      <ShopShowcase />
      <section className="bg-brand-white px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          <ProductGrid products={products} />
        </div>
      </section>
      <ShopExploreSection />
    </PageShell>
  );
}
