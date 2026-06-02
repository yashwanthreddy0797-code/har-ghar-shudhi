#!/usr/bin/env node
/**
 * Upload Har Ghar Shudhi checkout logo to Shopify and apply checkout branding.
 *
 * Requires a custom app Admin API access token with:
 *   write_checkout_branding_settings (or manage checkout branding)
 *   write_files
 *
 * Usage:
 *   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com \
 *   SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_... \
 *   node scripts/set-checkout-logo.mjs
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOGO_PATH = join(__dirname, "../public/brand/har-ghar-shudhi-logo.png");

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN?.replace(
  /^https?:\/\//,
  ""
).replace(/\/$/, "");
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2025-10";

if (!storeDomain || !adminToken) {
  console.error(
    "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_ACCESS_TOKEN.\n" +
      "Create a custom app in Shopify Admin with checkout branding + files scopes."
  );
  process.exit(1);
}

async function adminGraphql(query, variables = {}) {
  const res = await fetch(
    `https://${storeDomain}/admin/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": adminToken,
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  const json = await res.json();
  if (!res.ok || json.errors?.length) {
    throw new Error(
      json.errors?.map((e) => e.message).join("; ") ||
        `HTTP ${res.status}: ${JSON.stringify(json)}`
    );
  }
  const userErrors =
    json.data &&
    Object.values(json.data).flatMap((v) => v?.userErrors ?? []);
  if (userErrors?.length) {
    throw new Error(userErrors.map((e) => e.message).join("; "));
  }
  return json.data;
}

async function main() {
  const logoBytes = readFileSync(LOGO_PATH);
  const filename = "har-ghar-shudhi-logo.png";
  const mimeType = "image/png";

  const staged = await adminGraphql(
    `mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets { url resourceUrl parameters { name value } }
        userErrors { message }
      }
    }`,
    {
      input: [
        {
          filename,
          mimeType,
          resource: "IMAGE",
          httpMethod: "POST",
        },
      ],
    }
  );

  const target = staged.stagedUploadsCreate.stagedTargets[0];
  const form = new FormData();
  for (const { name, value } of target.parameters) {
    form.append(name, value);
  }
  form.append("file", new Blob([logoBytes], { type: mimeType }), filename);

  const uploadRes = await fetch(target.url, { method: "POST", body: form });
  if (!uploadRes.ok) {
    throw new Error(`Logo upload failed: HTTP ${uploadRes.status}`);
  }

  const fileCreate = await adminGraphql(
    `mutation fileCreate($files: [FileCreateInput!]!) {
      fileCreate(files: $files) {
        files {
          ... on MediaImage { id image { url } }
        }
        userErrors { message }
      }
    }`,
    {
      files: [
        {
          originalSource: target.resourceUrl,
          contentType: "IMAGE",
        },
      ],
    }
  );

  const mediaImageId = fileCreate.fileCreate.files[0]?.id;
  if (!mediaImageId) {
    throw new Error("fileCreate did not return a MediaImage id");
  }

  const profiles = await adminGraphql(`{
    checkoutProfiles(first: 5) {
      nodes { id isPublished }
    }
  }`);

  const profile =
    profiles.checkoutProfiles.nodes.find((p) => p.isPublished) ??
    profiles.checkoutProfiles.nodes[0];
  if (!profile) {
    throw new Error("No checkout profile found on this store");
  }

  await adminGraphql(
    `mutation checkoutBrandingUpsert(
      $checkoutProfileId: ID!
      $checkoutBrandingInput: CheckoutBrandingInput!
    ) {
      checkoutBrandingUpsert(
        checkoutProfileId: $checkoutProfileId
        checkoutBrandingInput: $checkoutBrandingInput
      ) {
        checkoutBranding {
          customizations {
            header {
              logo {
                image { url }
              }
            }
          }
        }
        userErrors { message }
      }
    }`,
    {
      checkoutProfileId: profile.id,
      checkoutBrandingInput: {
        customizations: {
          header: {
            logo: {
              image: { mediaImageId },
              maxWidth: 280,
            },
          },
        },
      },
    }
  );

  console.log("Checkout logo updated for profile:", profile.id);
  console.log("Open checkout from your site cart to verify the new logo.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
