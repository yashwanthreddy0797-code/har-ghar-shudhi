import PageShell from "@/components/PageShell";
import CategoryHero from "@/components/shop/CategoryHero";
import ShopShowcase from "@/components/shop/ShopShowcase";
import ShopExploreSection from "@/components/shop/ShopExploreSection";
import ProductGrid from "@/components/shop/ProductGrid";
import BrandPillarsBar from "@/components/about/BrandPillarsBar";
import { getAllCatalogProducts } from "@/lib/catalog";
import { BRAND_INTRO, BRAND_TAGLINE } from "@/lib/brand/content";

export const revalidate = 3600;

export const metadata = {
  title: "Shop All | Har Ghar Shudhi",
  description:
    "Browse Pure Shilajit, Ashwagandha, superfoods, honey, and Ayurvedic wellness from Har Ghar Shudhi.",
};

export default function ShopPage() {
  const products = getAllCatalogProducts();

  return (
    <PageShell proofSectionClassName="-mt-20 !pt-6 md:-mt-28 md:!pt-8">
      <CategoryHero
        title="All Products"
        description={`${BRAND_TAGLINE} — ${BRAND_INTRO}`}
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
