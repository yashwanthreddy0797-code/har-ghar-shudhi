import {
  getCatalogProductBySlug,
  getAllCatalogProducts,
  getCatalogSlugs,
} from "@/lib/catalog";
import type { CatalogProduct } from "@/lib/catalog/types";
import { getShopifyProductHandle, isShopifyConfigured } from "@/lib/shopify/config";
import {
  getAllProducts,
  getProductByHandle,
  getProductHandles,
} from "@/lib/shopify/products";
import type { Product } from "@/lib/types/product";

function catalogAsProduct(catalog: CatalogProduct): Product {
  const { isCatalog: _isCatalog, ...product } = catalog;
  return product;
}

export function mergeShopifyIntoCatalog(
  catalog: CatalogProduct,
  shopify: Product
): CatalogProduct {
  return {
    ...catalog,
    id: shopify.id,
    slug: shopify.slug,
    name: shopify.name,
    price: shopify.price,
    compareAt: shopify.compareAt,
    image: shopify.image || catalog.image,
    images: shopify.images.length ? shopify.images : catalog.images,
    variants: shopify.variants,
    availableForSale: shopify.availableForSale,
    description: shopify.description || catalog.description,
  };
}

export async function getStoreProducts(): Promise<Product[]> {
  return getAllCatalogProducts().map(catalogAsProduct);
}

export async function getStoreProductBySlug(
  slug: string
): Promise<{ product: Product | CatalogProduct; isRichCatalog: boolean } | null> {
  const catalog = getCatalogProductBySlug(slug);
  if (catalog) {
    return { product: catalog, isRichCatalog: true };
  }

  if (!isShopifyConfigured()) {
    return null;
  }

  try {
    const shopify = await getProductByHandle(getShopifyProductHandle(slug));
    if (shopify) {
      return { product: shopify, isRichCatalog: false };
    }
  } catch (error) {
    console.error(`[commerce] Shopify product fetch failed for ${slug}:`, error);
  }

  return null;
}

export async function getStoreProductSlugs(): Promise<string[]> {
  return getCatalogSlugs();
}
