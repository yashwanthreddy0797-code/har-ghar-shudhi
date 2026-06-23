import { HGS_CATALOG_PRODUCTS } from "@/lib/catalog/hgsProducts";
import {
  resolveExploreHighlightIcon,
  type ExploreHighlightIconKey,
} from "@/lib/shop/exploreHighlightIcons";

export type ShopExploreHighlight = {
  id: string;
  label: string;
  iconKey: ExploreHighlightIconKey;
  accent: string;
};

export type ShopExploreProduct = {
  slug: string;
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  highlights: ShopExploreHighlight[];
};

const EXPLORE_IMAGE: Record<string, string> = {
  "pure-shilajit": "/hero/shilajit/shilajit-jar-hero.png",
  "ashwagandha-advance": "/shop/explore/ashwagandha-advance.png",
  "diabetes-shudhi": "/shop/explore/diabetes-shudhi.png",
  "gut-shudhi": "/shop/explore/gut-shudhi.png",
  "master-mineral": "/shop/explore/master-mineral.png",
  "moringa-powder": "/shop/explore/moringa-powder.png",
  "spirulina-powder": "/shop/explore/spirulina-powder.png",
  "wildforest-multiflora-honey": "/shop/explore/wildforest-honey.png",
  "pain-shield": "/shop/explore/pain-shield.png",
};

export function getShopProductImage(slug: string, fallback: string) {
  return EXPLORE_IMAGE[slug] ?? fallback;
}

const EXPLORE_ORDER = [
  "ashwagandha-advance",
  "moringa-powder",
  "spirulina-powder",
  "pure-shilajit",
  "wildforest-multiflora-honey",
  "gut-shudhi",
  "diabetes-shudhi",
  "master-mineral",
  "pain-shield",
] as const;

const HIGHLIGHT_ACCENTS = [
  "#5c4d7a",
  "#1a5c47",
  "#3d6b4f",
  "#c4a035",
  "#6b4a2e",
  "#7b3f6e",
  "#2d5016",
  "#1e3a5f",
  "#8b6344",
] as const;

function buildHighlights(slug: string, name: string): ShopExploreHighlight[] {
  const product = HGS_CATALOG_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return [
      {
        id: slug,
        label: name,
        iconKey: "default",
        accent: HIGHLIGHT_ACCENTS[0],
      },
    ];
  }

  const fromBenefits = product.keyBenefits.map((b) => b.label);
  const fromPills = product.benefitPills;
  const fromFormulation = product.formulation.items.map((item) => item.name);
  const extras = [product.tagline, product.badge].filter(
    (value): value is string => Boolean(value)
  );

  const labels = [...new Set([...fromBenefits, ...fromPills, ...fromFormulation, ...extras])].slice(
    0,
    5
  );

  return labels
    .filter((label): label is string => Boolean(label))
    .map((label, index) => ({
    id: `${slug}-${index}`,
    label,
    iconKey: resolveExploreHighlightIcon(label),
    accent: HIGHLIGHT_ACCENTS[index % HIGHLIGHT_ACCENTS.length],
  }));
}

export const SHOP_EXPLORE_PRODUCTS: ShopExploreProduct[] = EXPLORE_ORDER.map(
  (slug) => {
    const product = HGS_CATALOG_PRODUCTS.find((p) => p.slug === slug)!;
    const src = EXPLORE_IMAGE[slug] ?? product.image;
    const dimensions =
      slug === "wildforest-multiflora-honey"
        ? { width: 453, height: 707 }
        : { width: 520, height: 780 };
    return {
      slug,
      name: product.name,
      src,
      alt: `Har Ghar Shudhi ${product.name}`,
      ...dimensions,
      highlights: buildHighlights(slug, product.name),
    };
  }
);

/** Scroll distance per product hand-off (vh) */
export const SHOP_EXPLORE_SCROLL_VH = 84;

export const SHOP_EXPLORE = {
  headline: {
    primary: "Explore all",
    accent: "our products",
  },
  subtitle: "The essentials for everyday wellness — rooted in Ayurveda, made for your home.",
  products: SHOP_EXPLORE_PRODUCTS,
  scrollVhPerStep: SHOP_EXPLORE_SCROLL_VH,
} as const;

/** Shared baseline — center hero is large, side preview is medium, exit minimizes */
export const SHOP_EXPLORE_BASELINE_TOP = "79%";

const BASE_PRODUCT = {
  top: SHOP_EXPLORE_BASELINE_TOP,
  xPercent: -50,
  yPercent: -100,
  transformOrigin: "50% 100%",
  filter: "blur(0px)",
} as const;

/** Center focus — large hero product */
export const SHOP_EXPLORE_PRIMARY = {
  ...BASE_PRODUCT,
  left: "40%",
  scale: 1.05,
  opacity: 1,
  zIndex: 5,
} as const;

/** Right preview — medium size before promotion */
export const SHOP_EXPLORE_SECONDARY = {
  ...BASE_PRODUCT,
  left: "78%",
  scale: 0.58,
  opacity: 0.9,
  zIndex: 3,
} as const;

/** Exiting left — shrinks down and fades away quickly */
export const SHOP_EXPLORE_EXIT = {
  ...BASE_PRODUCT,
  left: "-2%",
  scale: 0.22,
  opacity: 0,
  zIndex: 1,
} as const;

/** Entering from right — starts off-stage, lands as secondary */
export const SHOP_EXPLORE_ENTER = {
  ...BASE_PRODUCT,
  left: "102%",
  scale: 0.42,
  opacity: 0,
  zIndex: 2,
} as const;
