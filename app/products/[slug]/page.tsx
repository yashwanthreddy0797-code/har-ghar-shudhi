import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import PageShell from "@/components/PageShell";
import ProductDetail from "@/components/shop/ProductDetail";
import { getProductByHandle, getProductHandles } from "@/lib/shopify/products";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const handles = await getProductHandles();
    return handles.slice(0, 50).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
  if (!product) return { title: "Product | Har Ghar Shudhi" };
  return {
    title: `${product.name} | Har Ghar Shudhi`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
  if (!product) notFound();

  return (
    <PageShell>
      <section className="bg-brand-white px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/shop/${product.category}`}
            className="mb-8 inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-wide text-brand-muted transition-colors hover:text-brand-green"
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
