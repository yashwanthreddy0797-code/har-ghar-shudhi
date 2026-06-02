import {
  buildAshwagandhaPlaybackSequence,
  ASHWAGANDHA_FRAME_ANCHOR,
  ASHWAGANDHA_FRAME_HEIGHT,
  ASHWAGANDHA_FRAME_WIDTH,
  ashwagandhaScrollHeightForFrames,
} from "@/lib/hero/ashwagandhaFrames";
import {
  buildHoneyPlaybackSequence,
  HONEY_FRAME_ANCHOR,
  HONEY_FRAME_HEIGHT,
  HONEY_FRAME_WIDTH,
  honeyScrollHeightForFrames,
} from "@/lib/hero/honeyFrames";
import {
  buildMoringaPlaybackSequence,
  MORINGA_FRAME_ANCHOR,
  MORINGA_FRAME_HEIGHT,
  MORINGA_FRAME_WIDTH,
  moringaScrollHeightForFrames,
} from "@/lib/hero/moringaFrames";

const MORINGA_PLAYBACK_FRAMES = buildMoringaPlaybackSequence();
const ASHWAGANDHA_PLAYBACK_FRAMES = buildAshwagandhaPlaybackSequence();
const HONEY_PLAYBACK_FRAMES = buildHoneyPlaybackSequence();

export interface ProductScrollConfig {
  id: string;
  theme: {
    experience: string;
    panel: string;
    panelDark: string;
    text: string;
    textMuted: string;
    ctaBorder: string;
  };
  assets: {
    /** Full closed bottle (3D render with cap) — shown on load before scroll reveal */
    closed?: string;
    bodyOpen?: string;
    cap?: string;
    width: number;
    height: number;
    closedWidth?: number;
    closedHeight?: number;
  };
  /** Full-frame PNG sequence — stacked and scrubbed on scroll (replaces cap layers) */
  frameSequence?: {
    frames: Array<{ src: string; width: number; height: number }>;
    /** Tailwind height class for scroll runway, e.g. h-[280vh] (static strings only) */
    scrollHeight?: string;
    /** Scroll runway height in vh, applied as an inline style (preferred for dynamic values) */
    scrollHeightVh?: number;
    /** Jar anchor inside each frame — keeps bottom-center locked when drawing to canvas */
    anchor?: {
      centerX: number;
      bottom: number;
      frameWidth: number;
      frameHeight: number;
    };
    /** Zoom drawn frames — use >1 for taller source canvases (e.g. honey 1280px) */
    displayScale?: number;
  };
  capTuning: {
    yOffsetRatio: number;
    pivotYRatio: number;
    scale: number;
    idleLiftRatio: number;
    idleRotation: number;
    cssYOffsetPercent: number;
    cssScale: number;
    cssRotation: number;
  };
  hero: {
    headlineLeft: [string, string];
    headlineRight: [string, string];
    /** Optional supporting line under the left headline (moringa hero balance) */
    subtextLeft?: string;
    subtext: string;
    cta: { label: string; href: string };
  };
  partners: string[];
  sequenceLabel: string;
  closing: {
    textureClass: string;
    sectionClass: string;
    eyebrow: string;
    eyebrowClass: string;
    title: string;
    description: string;
    link: { label: string; href: string };
    linkClass: string;
  };
  bottleZIndex: number;
  closingZIndex: number;
  /** First hero on the page — bottle visible immediately, no scroll gate */
  bottleVisibleOnLoad?: boolean;
  /** Center product visuals and scroll-open sequence */
  showCenterProduct?: boolean;
  /** Partner names strip below the pinned hero */
  showPartnersBar?: boolean;
  /** Small hint below the hero product during scroll sequences */
  showSequenceLabel?: boolean;
  /** Static product image in the hero center (no scroll animation) */
  heroCenterImage?: {
    src: string;
    width: number;
    height: number;
    alt?: string;
    sizeClass?: string;
  };
}

export const MORINGA_SCROLL: ProductScrollConfig = {
  id: "moringa",
  theme: {
    experience: "bg-luxury-emerald",
    panel: "bg-[#0a2f24]",
    panelDark: "bg-[#0a2f24]",
    text: "text-white",
    textMuted: "text-white/70",
    ctaBorder: "border-white/40 hover:border-white hover:bg-white/10",
  },
  assets: {
    width: MORINGA_FRAME_WIDTH,
    height: MORINGA_FRAME_HEIGHT,
  },
  frameSequence: {
    scrollHeightVh: moringaScrollHeightForFrames(MORINGA_PLAYBACK_FRAMES.length),
    frames: MORINGA_PLAYBACK_FRAMES,
    anchor: MORINGA_FRAME_ANCHOR,
  },
  capTuning: {
    yOffsetRatio: 0,
    pivotYRatio: 0.177,
    scale: 1,
    idleLiftRatio: 0.012,
    idleRotation: 7,
    cssYOffsetPercent: 0,
    cssScale: 1,
    cssRotation: 7,
  },
  hero: {
    headlineLeft: ["Ayurveda,", "Reinvented."],
    headlineRight: ["For Your Home.", "For the Planet."],
    subtextLeft:
      "Cold-processed Moringa, sealed at peak potency for everyday wellness.",
    subtext:
      "Carbon-conscious Ayurvedic formulas that deliver nutrients with zero waste and zero compromise.",
    cta: { label: "Explore Products", href: "/shop" },
  },
  partners: [
    "Organic India",
    "Ayurveda Journal",
    "Wellness Today",
    "Pure Harvest",
    "Nature's Best",
  ],
  sequenceLabel: "Scroll to open",
  closing: {
    textureClass: "hero-moringa-texture",
    sectionClass: "bg-brand-cream",
    eyebrow: "The Problem",
    eyebrowClass: "text-brand-green",
    title: "Up to 70% of nutrients are lost before your body can use them.",
    description:
      "Conventional supplements break down in transit. Our Moringa Powder is cold-processed and sealed at peak potency — so every scoop delivers what nature intended.",
    link: { label: "Discover Moringa Powder →", href: "/shop" },
    linkClass: "text-brand-green hover:text-brand-green-dark",
  },
  bottleZIndex: 12,
  closingZIndex: 30,
  bottleVisibleOnLoad: true,
  showCenterProduct: true,
  showPartnersBar: false,
  showSequenceLabel: false,
};

export const ASHWAGANDHA_SCROLL: ProductScrollConfig = {
  id: "ashwagandha",
  theme: {
    experience: "bg-[#3d2518]",
    panel: "bg-[#2f1c12]",
    panelDark: "bg-[#241610]",
    text: "text-[#faf6f0]",
    textMuted: "text-[#faf6f0]/70",
    ctaBorder:
      "border-[#c9a962]/50 hover:border-[#c9a962] hover:bg-[#c9a962]/10",
  },
  assets: {
    width: ASHWAGANDHA_FRAME_WIDTH,
    height: ASHWAGANDHA_FRAME_HEIGHT,
  },
  frameSequence: {
    scrollHeightVh: ashwagandhaScrollHeightForFrames(
      ASHWAGANDHA_PLAYBACK_FRAMES.length
    ),
    frames: ASHWAGANDHA_PLAYBACK_FRAMES,
    anchor: ASHWAGANDHA_FRAME_ANCHOR,
    displayScale: 1.28,
  },
  capTuning: {
    yOffsetRatio: 0,
    pivotYRatio: 0.177,
    scale: 1,
    idleLiftRatio: 0.012,
    idleRotation: 7,
    cssYOffsetPercent: 0,
    cssScale: 1,
    cssRotation: 7,
  },
  hero: {
    headlineLeft: ["Rooted In Ayurveda.", "Backed By Science."],
    headlineRight: ["Balance Your Mind.", "Strengthen Your Body."],
    subtext:
      "Ashwagandha Advance — stress support and daily wellness with powerful adaptogenic herbs for strength, stamina, and balance.",
    cta: { label: "Shop Ashwagandha", href: "/shop" },
  },
  partners: [
    "KSM-66® Ashwagandha",
    "L-Theanine",
    "Magnesium Glycinate",
    "BioPerine®",
    "Ayurvedic Formulation",
  ],
  sequenceLabel: "Scroll to open",
  closing: {
    textureClass: "hero-ashwagandha-texture",
    sectionClass: "bg-[#faf6f0]",
    eyebrow: "The Solution",
    eyebrowClass: "text-[#6b4a2e]",
    title: "One capsule a day for a stronger, calmer you.",
    description:
      "Ashwagandha Advance combines root extract with L-Theanine and Magnesium Glycinate — formulated to reduce stress, sharpen focus, and support deep recovery.",
    link: { label: "Discover Ashwagandha Advance →", href: "/shop" },
    linkClass: "text-[#6b4a2e] hover:text-[#3d2518]",
  },
  bottleZIndex: 25,
  closingZIndex: 30,
  bottleVisibleOnLoad: true,
  showCenterProduct: true,
  showPartnersBar: false,
  showSequenceLabel: false,
};

export const HONEY_SCROLL: ProductScrollConfig = {
  id: "honey",
  theme: {
    experience: "bg-[#3d2a10]",
    panel: "bg-[#2a1c0a]",
    panelDark: "bg-[#1f1508]",
    text: "text-[#faf6f0]",
    textMuted: "text-[#faf6f0]/70",
    ctaBorder:
      "border-[#d4a84b]/50 hover:border-[#d4a84b] hover:bg-[#d4a84b]/10",
  },
  assets: {
    width: HONEY_FRAME_WIDTH,
    height: HONEY_FRAME_HEIGHT,
  },
  frameSequence: {
    scrollHeightVh: honeyScrollHeightForFrames(HONEY_PLAYBACK_FRAMES.length),
    frames: HONEY_PLAYBACK_FRAMES,
    anchor: HONEY_FRAME_ANCHOR,
    displayScale: 1.28,
  },
  capTuning: {
    yOffsetRatio: 0,
    pivotYRatio: 0.177,
    scale: 1,
    idleLiftRatio: 0.012,
    idleRotation: 7,
    cssYOffsetPercent: 0,
    cssScale: 1,
    cssRotation: 7,
  },
  hero: {
    headlineLeft: ["Pure As Nature.", "Proven By Science."],
    headlineRight: ["Wildforest Multiflora.", "Raw Himalayan Honey."],
    subtext:
      "Unfiltered and unpasteurized honey from pristine Himalayan wildforests — NMR tested for purity, with zero adulteration and nothing added.",
    cta: { label: "Shop Wildforest Honey", href: "/shop" },
  },
  partners: [
    "NMR Tested for Purity",
    "Unfiltered & Unpasteurized",
    "Himalayan Wildforest",
    "Ethical Beekeeping",
    "Ayurvedic Superfood",
  ],
  sequenceLabel: "Scroll to explore",
  closing: {
    textureClass: "hero-honey-texture",
    sectionClass: "bg-[#faf6f0]",
    eyebrow: "Goodness In Every Drop",
    eyebrowClass: "text-[#8b6914]",
    title: "Nothing added, nothing taken away — just pure honey.",
    description:
      "Every batch is NMR tested to ensure authenticity and zero adulteration. Rich in antioxidants, a natural energy booster, and supports immunity and digestion — ethically sourced from forest to fork.",
    link: { label: "Discover Wildforest Honey →", href: "/shop" },
    linkClass: "text-[#8b6914] hover:text-[#4a3218]",
  },
  bottleZIndex: 25,
  closingZIndex: 30,
  bottleVisibleOnLoad: true,
  showCenterProduct: true,
  showPartnersBar: false,
  showSequenceLabel: false,
};
