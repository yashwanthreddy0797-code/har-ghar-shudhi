import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import CategoryHero from "@/components/shop/CategoryHero";
import ProductGrid from "@/components/shop/ProductGrid";
import { CONCERNS } from "@/lib/types/product";
import { getProductsByConcern } from "@/lib/shopify/products";

export const revalidate = 3600;

interface Props {
  params: Promise<{ concern: string }>;
}

export async function generateStaticParams() {
  return CONCERNS.map((c) => ({ concern: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { concern } = await params;
  const item = CONCERNS.find((c) => c.slug === concern);
  if (!item) return { title: "Shop by Concern | Har Ghar Shudhi" };
  return {
    title: `${item.label} | Har Ghar Shudhi`,
    description: item.description,
  };
}

export default async function ConcernPage({ params }: Props) {
  const { concern } = await params;
  const item = CONCERNS.find((c) => c.slug === concern);
  if (!item) notFound();

  const products = await getProductsByConcern(concern);

  return (
    <PageShell>
      <CategoryHero
        title={item.label}
        description={item.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: item.label },
        ]}
      />
      <section className="bg-brand-white px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          <ProductGrid products={products} />
        </div>
      </section>
    </PageShell>
  );
}
