import PageShell from "@/components/PageShell";
import ProductGrid from "@/components/shop/ProductGrid";
import { searchProducts } from "@/lib/shopify/products";

export const revalidate = 600;

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q} | Har Ghar Shudhi` : "Search | Har Ghar Shudhi",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const products = query ? await searchProducts(query) : [];

  return (
    <PageShell>
      <section className="border-b border-brand-border bg-brand-cream px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-3xl font-medium tracking-[0.02em] text-brand-text md:text-[2.75rem]">
            {query ? `Results for “${query}”` : "Search Products"}
          </h1>
          {query && (
            <p className="mt-3 font-shop text-sm tracking-wide text-brand-muted">
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
      </section>
      <section className="bg-brand-white px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          {!query ? (
            <p className="py-12 text-center font-body text-sm italic text-brand-muted">
              Use the search bar in the header to find products.
            </p>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </section>
    </PageShell>
  );
}
