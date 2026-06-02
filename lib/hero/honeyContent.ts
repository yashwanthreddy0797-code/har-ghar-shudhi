import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Leaf,
  Mountain,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

export type HoneyCalloutIcon =
  | "antioxidants"
  | "immunity"
  | "digestion"
  | "energy"
  | "transparency"
  | "journey";

export interface HoneyCallout {
  id: string;
  title: string;
  description: string;
  icon: HoneyCalloutIcon;
}

export const HONEY_CALLOUT_ICONS: Record<HoneyCalloutIcon, LucideIcon> = {
  antioxidants: Sparkles,
  immunity: Shield,
  digestion: Leaf,
  energy: Zap,
  transparency: BadgeCheck,
  journey: Mountain,
};

export const HONEY_HERO_CALLOUTS_LEFT: HoneyCallout[] = [
  {
    id: "antioxidants",
    icon: "antioxidants",
    title: "Rich in Antioxidants",
    description:
      "Helps fight free radicals and supports overall health — goodness in every drop.",
  },
  {
    id: "immunity",
    icon: "immunity",
    title: "Boosts Immunity",
    description:
      "Strengthens immune system naturally with wildforest multiflora honey.",
  },
  {
    id: "digestion",
    icon: "digestion",
    title: "Improves Digestion",
    description:
      "Aids digestion and promotes gut health — raw, unfiltered & unpasteurized.",
  },
];

export const HONEY_HERO_CALLOUTS_RIGHT: HoneyCallout[] = [
  {
    id: "energy",
    icon: "energy",
    title: "Natural Energy Booster",
    description:
      "Provides instant and sustained energy — nothing added, nothing taken away.",
  },
  {
    id: "transparency",
    icon: "transparency",
    title: "Complete Transparency",
    description:
      "NMR tested for purity, 100% natural, no additives or preservatives — ethically made.",
  },
  {
    id: "journey",
    icon: "journey",
    title: "The Purity Journey",
    description:
      "From Himalayan wildforests to ethical beekeeping, cold extraction, lab verified & your doorstep.",
  },
];

export const HONEY_HERO_CALLOUTS_ALL = [
  ...HONEY_HERO_CALLOUTS_LEFT,
  ...HONEY_HERO_CALLOUTS_RIGHT,
] as const;
