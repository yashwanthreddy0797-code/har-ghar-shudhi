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
          <h1 className="font-serif text-3xl font-light text-brand-text md:text-4xl">
            {query ? `Results for “${query}”` : "Search Products"}
          </h1>
          {query && (
            <p className="mt-2 font-sans text-sm text-brand-muted">
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
      </section>
      <section className="bg-brand-white px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          {!query ? (
            <p className="py-12 text-center font-sans text-sm text-brand-muted">
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
