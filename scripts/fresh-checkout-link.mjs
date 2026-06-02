#!/usr/bin/env node
/**
 * Create a fresh Shopify cart with a sample product and print links.
 * Loads .env.local from project root when present.
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnvLocal() {
  const path = join(root, ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i);
    const val = t.slice(i + 1).replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN?.replace(
  /^https?:\/\//,
  ""
).replace(/\/$/, "");
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2025-10";
const localPort = process.env.PORT ?? "3000";

if (!storeDomain || !token) {
  console.error("Missing Shopify env. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.");
  process.exit(1);
}

async function storefront(query, variables = {}) {
  const res = await fetch(
    `https://${storeDomain}/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  const json = await res.json();
  if (!res.ok || json.errors?.length) {
    throw new Error(
      json.errors?.map((e) => e.message).join("; ") ||
        `HTTP ${res.status}`
    );
  }
  return json.data;
}

async function main() {
  const products = await storefront(`
    query {
      products(first: 3, query: "ghee") {
        edges {
          node {
            title
            handle
            variants(first: 1) {
              edges { node { id availableForSale } }
            }
          }
        }
      }
    }
  `);

  const product = products.products.edges.find(
    (e) => e.node.variants.edges[0]?.node?.availableForSale
  )?.node ?? products.products.edges[0]?.node;

  if (!product) throw new Error("No products found on store");

  const variantId = product.variants.edges[0].node.id;

  const created = await storefront(
    `mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { id checkoutUrl totalQuantity }
        userErrors { message }
      }
    }`,
    { lines: [{ merchandiseId: variantId, quantity: 1 }] }
  );

  const err = created.cartCreate.userErrors?.[0]?.message;
  if (err) throw new Error(err);

  const cart = created.cartCreate.cart;
  const siteUrl = `http://localhost:${localPort}`;
  const shopUrl = `https://${storeDomain.replace(".myshopify.com", "")}`;

  console.log(JSON.stringify({
    product: product.title,
    cartId: cart.id,
    site: {
      home: siteUrl,
      shop: `${siteUrl}/shop`,
      product: `${siteUrl}/products/${product.handle}`,
    },
    checkoutUrl: cart.checkoutUrl,
    storeFront: shopUrl,
  }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
