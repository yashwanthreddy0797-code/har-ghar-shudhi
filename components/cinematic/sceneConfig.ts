export const SCENE_COUNT = 5;
export const HOLD = 1.65;
export const TRANSITION = 0.45;
export const SCENE_UNIT = HOLD + TRANSITION;

export type SceneAlign = "center" | "left" | "right";

export interface TextScene {
  id: string;
  headlines: string[];
  subtext?: string;
  bullets?: string[];
  cta?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
  align: SceneAlign;
  scrim: string;
}

/** Homepage scroll story — Ashwagandha Advance as flagship */
export const FLAGSHIP_PRODUCT = {
  name: "Ashwagandha Advance",
  slug: "ashwagandha-advance",
  tagline: "Stress Support & Daily Wellness",
  description:
    "Made with powerful Ayurvedic herbs for strength, stamina, and balance.",
  size: "60 Veg Capsules",
  shopPath: "/shop",
} as const;

export const CLIENT_PRODUCTS = [
  {
    name: "Ashwagandha Advance",
    slug: "ashwagandha-advance",
    tagline: "Stress Support & Daily Wellness",
    format: "Capsules",
    image: "/cinematic/products/ashwagandha-advance.png",
    highlights: [
      "Reduces Stress",
      "Supports Strength & Stamina",
      "Enhances Focus & Clarity",
      "Supports Better Sleep",
    ],
  },
  {
    name: "Moringa Powder",
    slug: "moringa-powder",
    tagline: "Ayurvedic Superfood",
    format: "Powder · 200g",
    image: "/cinematic/products/moringa-powder.png",
    highlights: [
      "Rich in Nutrients",
      "Natural Energy Boost",
      "Supports Immunity",
      "Detox & Cleanse",
    ],
  },
  {
    name: "Spirulina Powder",
    slug: "spirulina-powder",
    tagline: "Nature's Superfood",
    format: "Powder · 100g",
    image: "/cinematic/products/spirulina-powder.png",
    highlights: [
      "60% Complete Protein",
      "Boosts Energy",
      "Supports Immunity",
      "Natural Detoxifier",
    ],
  },
  {
    name: "Wildforest Multiflora Honey",
    slug: "wildforest-multiflora-honey",
    tagline: "Pure · Natural · Raw",
    format: "Honey · NMR Tested",
    image: "/cinematic/products/wildforest-honey.png",
    highlights: [
      "NMR Tested for Purity",
      "Raw & Unfiltered",
      "Boosts Immunity",
      "Natural Energy",
    ],
  },
] as const;

export const TEXT_SCENES: TextScene[] = [
  {
    id: "hero",
    headlines: ["Rooted In Ayurveda.", "Backed By Science."],
    subtext: "Ancient herbal wisdom for modern living.",
    align: "center",
    scrim: "text-scrim-center",
  },
  {
    id: "bottle",
    headlines: [FLAGSHIP_PRODUCT.name.toUpperCase()],
    subtext: `${FLAGSHIP_PRODUCT.tagline}. ${FLAGSHIP_PRODUCT.description}`,
    align: "left",
    scrim: "text-scrim",
  },
  {
    id: "capsule",
    headlines: ["Adaptogenic Wellness"],
    subtext: "One capsule a day for a stronger, calmer you.",
    align: "right",
    scrim: "text-scrim-right",
  },
  {
    id: "herbs",
    headlines: ["Powered By Nature"],
    bullets: [
      "Ashwagandha Root Extract",
      "Shatavari & Gokshura",
      "Black Pepper (BioPerine®)",
      "L-Theanine & Magnesium Glycinate",
    ],
    align: "left",
    scrim: "text-scrim",
  },
  {
    id: "ending",
    headlines: ["Balance Your Mind.", "Strengthen Your Body."],
    subtext: "Natural. Safe. Effective. · 60 Veg Capsules",
    cta: true,
    ctaHref: FLAGSHIP_PRODUCT.shopPath,
    ctaLabel: `Shop ${FLAGSHIP_PRODUCT.name}`,
    align: "center",
    scrim: "text-scrim-center",
  },
];

export const VISUAL_SCENE_IDS = [
  "hero",
  "bottle",
  "capsule",
  "herbs",
  "ending",
] as const;

export type VisualSceneId = (typeof VISUAL_SCENE_IDS)[number];

export const CINEMATIC_ASSETS = {
  heroGlow: "/cinematic/hero-glow.svg",
  bottle: "/cinematic/bottle.png",
  capsuleTop: "/cinematic/capsule-top.png",
  capsuleBottom: "/cinematic/capsule-bottom.png",
  endingProduct: "/cinematic/ending-product.png",
  herbs: [
    "/cinematic/herbs/leaf-1.png",
    "/cinematic/herbs/leaf-2.png",
    "/cinematic/herbs/leaf-3.png",
    "/cinematic/herbs/leaf-4.png",
  ],
} as const;

/** Parallax depth multipliers for the four herb leaves */
export const HERB_PARALLAX = [0.4, 0.7, 1.0, 0.55] as const;

export const SCROLL_HEIGHT_VH = SCENE_COUNT * 155;
