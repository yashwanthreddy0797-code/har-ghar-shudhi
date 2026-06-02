import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Brain,
  Dumbbell,
  Leaf,
  Moon,
  Sprout,
} from "lucide-react";

export type AshwagandhaCalloutIcon =
  | "stress"
  | "root"
  | "l-theanine"
  | "strength"
  | "botanicals"
  | "magnesium";

export interface AshwagandhaCallout {
  id: string;
  title: string;
  description: string;
  icon: AshwagandhaCalloutIcon;
}

export const ASHWAGANDHA_CALLOUT_ICONS: Record<AshwagandhaCalloutIcon, LucideIcon> = {
  stress: Brain,
  root: Sprout,
  "l-theanine": Moon,
  strength: Dumbbell,
  botanicals: Leaf,
  magnesium: Atom,
};

export const ASHWAGANDHA_HERO_CALLOUTS_LEFT: AshwagandhaCallout[] = [
  {
    id: "stress",
    icon: "stress",
    title: "Reduces Stress",
    description:
      "Helps your body adapt to daily stress & tension — rooted in Ayurveda, backed by science.",
  },
  {
    id: "ashwagandha-root",
    icon: "root",
    title: "Ashwagandha Root Extract",
    description:
      "Withanolides from premium root extract — core of our advanced formula for complete you.",
  },
  {
    id: "l-theanine",
    icon: "l-theanine",
    title: "L-Theanine",
    description:
      "Promotes calm, relaxation & mental balance — an added benefit that makes the difference.",
  },
];

export const ASHWAGANDHA_HERO_CALLOUTS_RIGHT: AshwagandhaCallout[] = [
  {
    id: "strength",
    icon: "strength",
    title: "Supports Strength & Stamina",
    description:
      "Powerful Ayurvedic blend designed to help you stay active & feel your best every day.",
  },
  {
    id: "botanicals",
    icon: "botanicals",
    title: "Synergistic Botanicals",
    description:
      "Shatavari, Safed Musli, Vacha & Gokshura extracts — complete wellness support in every capsule.",
  },
  {
    id: "magnesium",
    icon: "magnesium",
    title: "Magnesium Glycinate",
    description:
      "Supports muscle relaxation, sleep & nerve health — pairs with adaptogens for daily balance.",
  },
];

export const ASHWAGANDHA_HERO_CALLOUTS_ALL = [
  ...ASHWAGANDHA_HERO_CALLOUTS_LEFT,
  ...ASHWAGANDHA_HERO_CALLOUTS_RIGHT,
] as const;
