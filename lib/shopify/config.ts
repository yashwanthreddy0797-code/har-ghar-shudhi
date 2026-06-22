export function getShopifyConfig() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!storeDomain || !storefrontToken) {
    throw new Error(
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN. See env.example."
    );
  }

  return {
    storeDomain: storeDomain.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    storefrontToken,
    apiVersion: process.env.SHOPIFY_API_VERSION ?? "2025-10",
  };
}

export function isShopifyConfigured(): boolean {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  );
}

/**
 * Maps site URL slugs → Shopify product handles.
 * Add entries here when a PDP slug differs from the handle in Shopify Admin.
 */
export const SHOPIFY_PRODUCT_HANDLE_MAP: Record<string, string> = {
  "pure-shilajit": "pure-shilajit",
  "ashwagandha-advance": "ashwagandha-advance",
  "diabetes-shudhi": "diabetes-shudhi",
  "gut-shudhi": "gut-shudhi",
  "master-mineral": "master-mineral",
  "moringa-powder": "moringa-powder",
  "spirulina-powder": "spirulina-powder",
  "wildforest-multiflora-honey": "wildforest-multiflora-honey",
  "pain-shield": "pain-shield",
};

export function getShopifyProductHandle(slug: string) {
  return SHOPIFY_PRODUCT_HANDLE_MAP[slug] ?? slug;
}

export const CONCERN_SEARCH_QUERIES: Record<string, string> = {
  diabetes: "diabetes shudhi blood sugar",
  "gut-health": "gut shudhi digestion",
  immunity: "shilajit ashwagandha immunity",
  "weight-loss": "moringa spirulina metabolism",
  energy: "ashwagandha shilajit energy",
};
