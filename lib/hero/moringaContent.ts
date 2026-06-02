export interface MoringaCallout {
  id: string;
  title: string;
  description: string;
  image: string;
  stat?: string;
}

export const MORINGA_HERO_CALLOUTS_LEFT: MoringaCallout[] = [
  {
    id: "nutrients",
    title: "Rich in Vitamins & Minerals",
    description:
      "90+ nutrients in every spoon — naturally packed with essentials your body loves.",
    image: "/hero/moringa/insights/powder.png",
    stat: "90+",
  },
  {
    id: "detox",
    title: "Detoxifies the Body",
    description:
      "Gently supports natural cleansing — harvested at peak, slowly dried to lock in goodness.",
    image: "/hero/moringa/insights/harvest.png",
  },
];

export const MORINGA_HERO_CALLOUTS_RIGHT: MoringaCallout[] = [
  {
    id: "energy",
    title: "Natural Energy Booster",
    description:
      "Sustained vitality without the crash — Ayurvedic superfood for daily wellness.",
    image: "/hero/moringa/insights/leaf.png",
  },
  {
    id: "immunity",
    title: "Supports Immunity",
    description:
      "46 antioxidants and 18 amino acids — nature's most complete plant, sealed at peak potency.",
    image: "/hero/moringa/insights/farm.png",
    stat: "46",
  },
];

export const MORINGA_BENEFITS = [
  {
    label: "Rich in Vitamins & Minerals",
    icon: "vitamins" as const,
  },
  {
    label: "Natural Energy Booster",
    icon: "energy" as const,
  },
  {
    label: "Supports Immunity",
    icon: "immunity" as const,
  },
  {
    label: "Detoxifies the Body",
    icon: "detox" as const,
  },
  {
    label: "Supports Healthy Skin & Hair",
    icon: "skin" as const,
  },
  {
    label: "Aids in Weight Management",
    icon: "weight" as const,
  },
] as const;

export const MORINGA_STATS = [
  { value: "90+", label: "Nutrients" },
  { value: "18", label: "Amino Acids" },
  { value: "46", label: "Antioxidants" },
  { value: "9×", label: "Protein vs Yogurt" },
] as const;

export const MORINGA_PURITY_STEPS = [
  { step: "1", title: "Sourced from Handpicked Moringa Farms" },
  { step: "2", title: "Carefully Harvested at Peak Nutrient Time" },
  { step: "3", title: "Slowly Dried to Lock in Goodness" },
  { step: "4", title: "Finely Milled & Sieve'd" },
  { step: "5", title: "Hygienically Packed" },
  { step: "6", title: "Delivered to Your Doorstep" },
] as const;
