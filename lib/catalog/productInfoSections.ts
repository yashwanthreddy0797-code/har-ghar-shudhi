import type { CatalogProduct, FormulationKind } from "@/lib/catalog/types";

export type ProductInfoPanelId =
  | "description"
  | "ingredients"
  | "usage"
  | "benefits"
  | "storage";

export type ProductInfoPanelContent =
  | {
      type: "description";
      lead: string;
      body: string;
      highlights: string[];
    }
  | {
      type: "ingredients";
      title: string;
      items: CatalogProduct["formulation"]["items"];
    }
  | { type: "usage"; steps: CatalogProduct["howToUse"] }
  | {
      type: "benefits";
      keyBenefits: CatalogProduct["keyBenefits"];
      features: CatalogProduct["whyThisProduct"]["features"];
    }
  | { type: "storage"; text: string };

export interface ProductInfoPanelData {
  id: ProductInfoPanelId;
  label: string;
  content: ProductInfoPanelContent;
}

const STORAGE_BY_KIND: Record<FormulationKind, string> = {
  resin:
    "Store in a cool, dry place away from direct sunlight. Keep the jar tightly sealed between uses to preserve freshness and potency.",
  capsule:
    "Store in a cool, dry place below 25°C. Keep the bottle tightly closed and away from moisture and direct heat.",
  powder:
    "Store in an airtight container in a cool, dry place. Reseal the pouch after each use and keep away from humidity and direct sunlight.",
  honey:
    "Store at room temperature in a cool, dry cupboard. Do not refrigerate. Natural crystallisation is a sign of purity — gently warm to re-liquify if needed.",
  spray:
    "Store upright in a cool, dry place away from direct sunlight and heat. Keep the cap secured after each use.",
};

function storageCopy(product: CatalogProduct): string {
  const storageFaq = product.faqs.find((faq) =>
    faq.question.toLowerCase().includes("store")
  );
  if (storageFaq) return storageFaq.answer;
  return STORAGE_BY_KIND[product.formulation.kind];
}

/** Build accordion panels from existing catalog product fields. */
export function getProductInfoPanelsData(
  product: CatalogProduct
): ProductInfoPanelData[] {
  return [
    {
      id: "description",
      label: "Description",
      content: {
        type: "description",
        lead: product.description,
        body: product.whyThisProduct.description,
        highlights: product.highlights,
      },
    },
    {
      id: "ingredients",
      label: "Ingredients",
      content: {
        type: "ingredients",
        title: product.formulation.title,
        items: product.formulation.items,
      },
    },
    {
      id: "usage",
      label: "Usage Info",
      content: {
        type: "usage",
        steps: product.howToUse,
      },
    },
    {
      id: "benefits",
      label: "Benefits",
      content: {
        type: "benefits",
        keyBenefits: product.keyBenefits,
        features: product.whyThisProduct.features,
      },
    },
    {
      id: "storage",
      label: "Storage Info",
      content: {
        type: "storage",
        text: storageCopy(product),
      },
    },
  ];
}
