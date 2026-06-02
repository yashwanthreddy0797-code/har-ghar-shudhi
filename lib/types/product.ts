export type Category =
  | "ghee"
  | "atta"
  | "oils"
  | "immunity"
  | "jaggery"
  | "snacks";

export type Concern = "diabetes" | "gut-health" | "immunity" | "weight-loss";

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  compareAt?: number;
  availableForSale: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  image: string;
  images: string[];
  category: Category;
  concerns: Concern[];
  price: number;
  compareAt?: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  description: string;
  highlights: string[];
  availableForSale: boolean;
}

export const CATEGORIES: {
  slug: Category;
  label: string;
  description: string;
}[] = [
  {
    slug: "ghee",
    label: "Ghee",
    description: "Bilona-crafted A2 ghee from grass-fed Gir cows.",
  },
  {
    slug: "atta",
    label: "Atta & Grains",
    description: "Stone-ground khapli and multigrain flours.",
  },
  {
    slug: "oils",
    label: "Cold-Pressed Oils",
    description: "Single-filtered oils for everyday cooking.",
  },
  {
    slug: "immunity",
    label: "Immunity",
    description: "Ayurvedic blends for daily wellness.",
  },
  {
    slug: "jaggery",
    label: "Natural Sweeteners",
    description: "Sulfur-free jaggery and date palm sap.",
  },
  {
    slug: "snacks",
    label: "Breakfast & Snacks",
    description: "Wholesome spreads and healthy snacking.",
  },
];

export const CONCERNS: { slug: Concern; label: string; description: string }[] =
  [
    {
      slug: "diabetes",
      label: "Diabetes Care",
      description: "Low GI staples for balanced blood sugar.",
    },
    {
      slug: "gut-health",
      label: "Gut Health",
      description: "Fermented and fiber-rich foods for digestion.",
    },
    {
      slug: "immunity",
      label: "Immunity",
      description: "Herbal blends to strengthen natural defences.",
    },
    {
      slug: "weight-loss",
      label: "Weight Loss",
      description: "Nutrient-dense, clean ingredients for mindful eating.",
    },
  ];

export function formatPrice(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function formatReviews(count: number): string {
  if (count >= 1000)
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k+`;
  return String(count);
}
