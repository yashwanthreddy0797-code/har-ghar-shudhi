import type { CatalogProduct } from "@/lib/catalog/types";
import {
  HGS_CATALOG_PRODUCTS,
  HGS_CATALOG_SLUGS,
  getCatalogProductInput,
  getRelatedCatalogInputs,
} from "@/lib/catalog/hgsProducts";

function toCatalogProduct(input: (typeof HGS_CATALOG_PRODUCTS)[number]): CatalogProduct {
  return { ...input, isCatalog: true as const };
}

export function getAllCatalogProducts(): CatalogProduct[] {
  return HGS_CATALOG_PRODUCTS.map(toCatalogProduct);
}

export function getCatalogProductBySlug(slug: string): CatalogProduct | null {
  const input = getCatalogProductInput(slug);
  return input ? toCatalogProduct(input) : null;
}

export function getCatalogSlugs(): string[] {
  return [...HGS_CATALOG_SLUGS];
}

export function getRelatedCatalogProducts(slugs: string[]): CatalogProduct[] {
  return getRelatedCatalogInputs(slugs).map(toCatalogProduct);
}

export function isCatalogSlug(slug: string): boolean {
  return HGS_CATALOG_SLUGS.includes(slug);
}

export { HGS_CATALOG_SLUGS };
