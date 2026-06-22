import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import CatalogProductPage from "@/components/shop/catalog/CatalogProductPage";
import ProductDetail from "@/components/shop/ProductDetail";
import {
  getCatalogProductBySlug,
  getCatalogSlugs,
  isCatalogSlug,
} from "@/lib/catalog";
import { getProductByHandle } from "@/lib/shopify/products";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCatalogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const catalogProduct = getCatalogProductBySlug(slug);
  if (catalogProduct) {
    return {
      title: `${catalogProduct.name} | Har Ghar Shudhi`,
      description: catalogProduct.description.slice(0, 160),
    };
  }

  try {
    const product = await getProductByHandle(slug);
    if (!product) return { title: "Product | Har Ghar Shudhi" };
    return {
      title: `${product.name} | Har Ghar Shudhi`,
      description: product.description.slice(0, 160),
    };
  } catch {
    return { title: "Product | Har Ghar Shudhi" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  if (isCatalogSlug(slug)) {
    const product = getCatalogProductBySlug(slug);
    if (!product) notFound();

    return (
      <PageShell showPromo={false}>
        <main>
          <CatalogProductPage product={product} />
        </main>
      </PageShell>
    );
  }

  const product = await getProductByHandle(slug);
  if (!product) notFound();

  return (
    <PageShell>
      <section className="bg-brand-white px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 font-shop text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted transition-colors hover:text-brand-green"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to shop
          </Link>
          <ProductDetail product={product} />
        </div>
      </section>
    </PageShell>
  );
}
