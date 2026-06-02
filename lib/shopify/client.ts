import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { getShopifyConfig } from "./config";

let client: ReturnType<typeof createStorefrontApiClient> | null = null;

export function getShopifyClient() {
  if (!client) {
    const { storeDomain, storefrontToken, apiVersion } = getShopifyConfig();
    client = createStorefrontApiClient({
      storeDomain: `https://${storeDomain}`,
      apiVersion,
      publicAccessToken: storefrontToken,
    });
  }
  return client;
}

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const { data, errors } = await getShopifyClient().request(query, {
    variables,
  });

  if (errors) {
    const message =
      typeof errors === "object" && errors !== null && "message" in errors
        ? String((errors as { message: string }).message)
        : JSON.stringify(errors);
    throw new Error(`Shopify API error: ${message}`);
  }

  return data as T;
}
