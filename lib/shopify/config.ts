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

/** Maps our URL slugs → Shopify collection handles */
export const COLLECTION_HANDLE_MAP: Record<string, string> = {
  all: "all",
  ghee: "ghee",
  atta: "stoneground-atta",
  oils: "wood-pressed-oils",
  immunity: "natural-immunity",
  jaggery: "natural-sweetners",
  snacks: "breakfast-spreads-1",
};

export const CONCERN_SEARCH_QUERIES: Record<string, string> = {
  diabetes: "low gi khapli atta jaggery",
  "gut-health": "ghee atta jaggery digestion",
  immunity: "amlaprash chyawanprash turmeric immunity",
  "weight-loss": "khapli multigrain protein atta",
};
