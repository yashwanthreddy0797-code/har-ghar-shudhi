import { NATURE_TO_YOU, QUALITY, TRANSPARENCY } from "@/lib/brand/content";

export const SCIENCE_HERO = {
  eyebrow: "Science & Trust",
  headline: "Certified Wellness You Can Rely On",
  subline:
    "Every Har Ghar Shudhi product is developed with Ayurvedic expertise, manufactured in certified facilities, and guided by qualified doctors and nutritionists.",
} as const;

export const TRUST_STATS = [
  { value: "6+", label: "International & national certifications" },
  { value: "100%", label: "Natural & herbal formulations" },
  { value: "GMP", label: "Certified manufacturing facility" },
  { value: "Ayush", label: "Licensed Ayurvedic formulations" },
] as const;

export const EXPERTS = [
  {
    id: "ayurvedic-advisor",
    name: "Dr. Rajesh Verma",
    role: "Chief Ayurvedic Advisor",
    credentials: "BAMS, MD (Ayurveda) · 18+ years clinical practice",
    focus: "Formulation review, herb safety, and traditional Ayurvedic protocols.",
    initials: "RV",
  },
  {
    id: "clinical-nutritionist",
    name: "Priya Nair",
    role: "Lead Clinical Nutritionist",
    credentials: "M.Sc. Clinical Nutrition · Certified Diabetes Educator",
    focus: "Dietary guidance, metabolic wellness, and lifestyle integration.",
    initials: "PN",
  },
  {
    id: "quality-head",
    name: "Dr. Amit Khanna",
    role: "Head of Quality & Compliance",
    credentials: "Ph.D. Food Science · GMP & HACCP auditor",
    focus: "Batch testing, facility standards, and regulatory compliance.",
    initials: "AK",
  },
] as const;

export const ADVISORY_NOTE =
  "Our advisory panel reviews formulations, ingredient sourcing, and quality benchmarks. Products are manufactured in GMP-certified facilities and comply with applicable Indian food safety and Ayush regulations.";

export const QUALITY_PROCESS = NATURE_TO_YOU.steps.map((step, index) => ({
  step: index + 1,
  title: step,
}));

export { QUALITY, TRANSPARENCY };

export const COMPARISON_ROWS: readonly string[] = [
  "100% Natural",
  "Scientifically Formulated",
  "Ayush Licensed & Certified",
  "Time-Tested Ayurvedic Herbs",
  "Lab Tested Every Batch",
  "Affordable Daily Wellness",
];

export const SCIENCE_FAQS = [
  {
    question: "Are Har Ghar Shudhi products certified?",
    answer:
      "Yes. Our products are manufactured in GMP-certified facilities and comply with FSSAI, ISO 22000, FSSC 22000, HACCP, and Ayush licensing requirements where applicable.",
  },
  {
    question: "Who oversees product formulations?",
    answer:
      "Our Ayurvedic advisors and clinical nutritionists review formulations for ingredient safety, traditional efficacy, and alignment with modern wellness standards.",
  },
  {
    question: "Are your products lab tested?",
    answer:
      "Every batch undergoes quality testing before release. We test for purity, consistency, and safety as part of our standard operating procedures.",
  },
  {
    question: "Can I see certification documents?",
    answer:
      "Yes. Our Ayush license and key certification details are available on this page. Scan the QR code on product packaging for batch-specific transparency.",
  },
] as const;
