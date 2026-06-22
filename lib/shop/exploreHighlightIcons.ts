import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Apple,
  Atom,
  Bone,
  Brain,
  Droplet,
  Dumbbell,
  Flame,
  Heart,
  Leaf,
  Moon,
  Shield,
  Sparkles,
  Sprout,
  Target,
  Zap,
} from "lucide-react";

export type ExploreHighlightIconKey =
  | "energy"
  | "strength"
  | "immunity"
  | "digestion"
  | "focus"
  | "sleep"
  | "stress"
  | "metabolism"
  | "blood-sugar"
  | "antioxidant"
  | "protein"
  | "bone"
  | "joint"
  | "heart"
  | "cellular"
  | "detox"
  | "recovery"
  | "weight"
  | "absorption"
  | "natural"
  | "default";

export const EXPLORE_HIGHLIGHT_ICONS: Record<ExploreHighlightIconKey, LucideIcon> = {
  energy: Zap,
  strength: Dumbbell,
  immunity: Shield,
  digestion: Apple,
  focus: Target,
  sleep: Moon,
  stress: Brain,
  metabolism: Flame,
  "blood-sugar": Droplet,
  antioxidant: Sparkles,
  protein: Activity,
  bone: Bone,
  joint: Bone,
  heart: Heart,
  cellular: Atom,
  detox: Leaf,
  recovery: Sprout,
  weight: Activity,
  absorption: Droplet,
  natural: Leaf,
  default: Sprout,
};

/** Map benefit / ingredient labels to the closest icon */
export function resolveExploreHighlightIcon(label: string): ExploreHighlightIconKey {
  const text = label.toLowerCase();

  if (/stress|calm|relax/.test(text)) return "stress";
  if (/focus|clarity|mental/.test(text)) return "focus";
  if (/sleep|rest/.test(text)) return "sleep";
  if (/energy|stamina|vitality|booster/.test(text)) return "energy";
  if (/strength|muscle|protein|stamina/.test(text)) return "strength";
  if (/immun|defence|defense/.test(text)) return "immunity";
  if (/digest|gut|prebiotic|probiotic|triphala/.test(text)) return "digestion";
  if (/blood sugar|glucose|glycemic|insulin|diabetes|berberine|gymnema/.test(text))
    return "blood-sugar";
  if (/metabol|weight/.test(text)) return "metabolism";
  if (/antioxid|phycocyanin|chlorophyll/.test(text)) return "antioxidant";
  if (/bone|calcium|mineral|magnesium|zinc/.test(text)) return "bone";
  if (/joint|mobility|connective/.test(text)) return "joint";
  if (/heart|cardio|vascular/.test(text)) return "heart";
  if (/cellular|cell|nervous|trace/.test(text)) return "cellular";
  if (/detox|cleanse|purif/.test(text)) return "detox";
  if (/recover|healing|relief/.test(text)) return "recovery";
  if (/absorption|nutrient|enzyme|nectar/.test(text)) return "absorption";
  if (/skin|hair|beauty/.test(text)) return "antioxidant";
  if (/pure|natural|raw|wild|himalayan|ayurvedic|organic|forest/.test(text))
    return "natural";
  if (/pain|spray|eucalyptus|menthol|wintergreen/.test(text)) return "recovery";
  if (/honey|shilajit|resin|ashwagandha|moringa|spirulina|bitter|fenugreek|jamun|aloe|licorice|l-theanine|withanolide/.test(text))
    return "natural";

  return "default";
}
