import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import CategoryHero from "@/components/shop/CategoryHero";
import ProductGrid from "@/components/shop/ProductGrid";
import CertificationBanner from "@/components/shop/CertificationBanner";
import { CATEGORIES } from "@/lib/types/product";
import { getProductsByCollection } from "@/lib/shopify/products";

export const revalidate = 3600;

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return { title: "Shop | Har Ghar Shudhi" };
  return {
    title: `${cat.label} | Har Ghar Shudhi`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const products = await getProductsByCollection(category);

  return (
    <PageShell>
      <CategoryHero
        title={cat.label}
        description={cat.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: cat.label },
        ]}
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
