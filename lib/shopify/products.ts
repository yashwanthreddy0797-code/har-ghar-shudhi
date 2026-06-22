import { shopifyFetch } from "./client";
import { CONCERN_SEARCH_QUERIES } from "./config";
import { mapShopifyProduct, type ShopifyProductNode } from "./mappers";
import {
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_PRODUCTS_QUERY,
  SEARCH_PRODUCTS_QUERY,
} from "./queries";
import type { Product } from "@/lib/types/product";

const PRODUCT_LIMIT = 48;

function extractProducts(
  edges: { node: ShopifyProductNode }[] | undefined
): Product[] {
  if (!edges) return [];
  return edges.map(({ node }) => mapShopifyProduct(node));
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProductNode }[] };
  }>(GET_PRODUCTS_QUERY, { first: PRODUCT_LIMIT });

  return extractProducts(data.products.edges);
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{
    product: ShopifyProductNode | null;
  }>(GET_PRODUCT_BY_HANDLE_QUERY, { handle });

  return data.product ? mapShopifyProduct(data.product) : null;
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return [];

  const data = await shopifyFetch<{
    search: { edges: { node: ShopifyProductNode }[] };
  }>(SEARCH_PRODUCTS_QUERY, { query: query.trim(), first: 24 });

  return extractProducts(data.search.edges);
}

export async function getProductsByConcern(concern: string): Promise<Product[]> {
  const searchQuery = CONCERN_SEARCH_QUERIES[concern];
  if (searchQuery) return searchProducts(searchQuery);
  return getAllProducts();
}

export async function getProductHandles(): Promise<string[]> {
  const products = await getAllProducts();
  return products.map((p) => p.slug);
}
