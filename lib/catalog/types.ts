import type { Category, Concern, Product } from "@/lib/types/product";

export type FormulationKind = "resin" | "capsule" | "powder" | "honey" | "spray";

export interface CatalogFeature {
  title: string;
  description: string;
}

export interface CatalogBenefit {
  icon: string;
  label: string;
}

export interface CatalogFormulationItem {
  name: string;
  description: string;
}

export interface CatalogStep {
  title: string;
  description: string;
}

export interface CatalogFaq {
  question: string;
  answer: string;
}

export interface CatalogProduct extends Product {
  productType: string;
  benefitPills: string[];
  isCatalog: true;
  whyThisProduct: {
    title: string;
    description: string;
    features: CatalogFeature[];
  };
  keyBenefits: CatalogBenefit[];
  formulation: {
    kind: FormulationKind;
    title: string;
    items: CatalogFormulationItem[];
  };
  howToUse: CatalogStep[];
  trustPoints: string[];
  faqs: CatalogFaq[];
  relatedSlugs: string[];
  finalCta: {
    headline: string;
    subline: string;
  };
}

export type CatalogProductInput = Omit<CatalogProduct, "isCatalog">;
