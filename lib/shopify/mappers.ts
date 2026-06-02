import type { Category, Concern, Product, ProductVariant } from "@/lib/types/product";

interface ShopifyMoney {
  amount: string;
  currencyCode?: string;
}

interface ShopifyVariantNode {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney | null;
}

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  tags: string[];
  featuredImage?: { url: string; altText?: string | null } | null;
  images: { edges: { node: { url: string } }[] };
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange?: { minVariantPrice: ShopifyMoney } | null;
  variants: { edges: { node: ShopifyVariantNode }[] };
}

function parsePrice(money?: ShopifyMoney | null): number {
  return money ? parseFloat(money.amount) : 0;
}

function inferCategory(tags: string[], title: string): Category {
  const haystack = `${tags.join(" ")} ${title}`.toLowerCase();
  if (haystack.includes("ghee")) return "ghee";
  if (haystack.includes("atta") || haystack.includes("flour")) return "atta";
  if (haystack.includes("oil")) return "oils";
  if (
    haystack.includes("immunity") ||
    haystack.includes("chyawan") ||
    haystack.includes("amlaprash") ||
    haystack.includes("turmeric")
  )
    return "immunity";
  if (haystack.includes("jaggery") || haystack.includes("sweet")) return "jaggery";
  if (haystack.includes("snack") || haystack.includes("spread") || haystack.includes("butter"))
    return "snacks";
  return "snacks";
}

function inferBadge(tags: string[], title: string): string | undefined {
  const t = `${tags.join(" ")} ${title}`.toLowerCase();
  if (tags.some((tag) => tag.toLowerCase().includes("best seller"))) return "Best Seller";
  if (t.includes("new launch") || tags.some((tag) => tag.toLowerCase().includes("new")))
    return "New Launch";
  if (tags.some((tag) => tag.toLowerCase().includes("trending"))) return "Trending";
  if (tags.some((tag) => tag.toLowerCase().includes("must try"))) return "Must Try";
  return undefined;
}

function mapVariants(edges: { node: ShopifyVariantNode }[]): ProductVariant[] {
  return edges.map(({ node }) => ({
    id: node.id,
    label: node.title === "Default Title" ? "Standard" : node.title,
    price: parsePrice(node.price),
    compareAt: node.compareAtPrice ? parsePrice(node.compareAtPrice) : undefined,
    availableForSale: node.availableForSale,
  }));
}

export function mapShopifyProduct(node: ShopifyProductNode): Product {
  const variants = mapVariants(node.variants.edges);
  const firstVariant = variants[0];
  const images = node.images.edges.map((e) => e.node.url);
  const image = node.featuredImage?.url ?? images[0] ?? "";
  const compareAt = node.compareAtPriceRange?.minVariantPrice
    ? parsePrice(node.compareAtPriceRange.minVariantPrice)
    : firstVariant?.compareAt;

  const tagline =
    node.tags.find((t) => t.includes("|") || t.length < 60) ??
    (node.description.slice(0, 80).replace(/<[^>]+>/g, "") || "Certified organic");

  return {
    id: node.id,
    slug: node.handle,
    name: node.title,
    tagline,
    image,
    images: images.length ? images : [image],
    category: inferCategory(node.tags, node.title),
    concerns: [] as Concern[],
    price: firstVariant?.price ?? parsePrice(node.priceRange.minVariantPrice),
    compareAt: compareAt && compareAt > (firstVariant?.price ?? 0) ? compareAt : undefined,
    badge: inferBadge(node.tags, node.title),
    rating: 4.9,
    reviewCount: 100,
    variants,
    description: node.description.replace(/<[^>]+>/g, " ").trim(),
    highlights: node.tags.slice(0, 4),
    availableForSale: node.availableForSale,
  };
}

export type { ShopifyProductNode };
