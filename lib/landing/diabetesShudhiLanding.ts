import { getCatalogProductBySlug } from "@/lib/catalog";

export const LANDING_SLUG = "diabetes-shudhi";

export function getDiabetesShudhiProduct() {
  return getCatalogProductBySlug(LANDING_SLUG)!;
}

export const TOP_TICKER = [
  "10k+ Happy Customers",
  "100% Ayurvedic Formula",
  "Ayush Licensed",
  "Lab Tested for Purity",
];

export const HERO_TICKER =
  "Support your blood sugar naturally — Ayurvedic wellness backed by tradition and transparency.";

export const HERO = {
  headline: "Your Natural Solution for",
  headlineAccent: "Sugar Control & Metabolic Wellness",
  checks: ["Backed by Ayurveda", "Trusted Quality", "100% Herbal"],
  howToTitle: "How To Use?",
  howToSteps: [
    { label: "1st Capsule", time: "Half an hour before breakfast" },
    { label: "2nd Capsule", time: "Half an hour before dinner" },
  ],
  benefitTitle: "Empower Your Health with",
  benefitProduct: "Diabetes Shudhi",
  benefitHighlight: "3 Time-Tested Herbs",
  benefitSubline: "Unite to support blood sugar balance and metabolic wellness",
};

export const CLINICAL_STATS = [
  {
    icon: "sugar",
    value: "89%",
    label: "Reported improved daily energy and balance.",
  },
  {
    icon: "drop",
    value: "1.7%",
    label: "Average wellness score improvement in 90 days.",
  },
  {
    icon: "pills",
    value: "88%",
    label: "Prefer natural support alongside lifestyle changes.",
  },
] as const;

export const RESULTS = [
  { value: "2,500+", label: "Customers supported on their wellness journey" },
  { value: "9,500+", label: "Families choosing Ayurvedic metabolic care" },
  { value: "5", label: "Months average to feel meaningful change" },
  { value: "100,000+", label: "People educated on natural diabetes care" },
] as const;

export const MEDIA_HEADLINE =
  "Natural Wellness Making Impact Across Leading Health Platforms";

export const MEDIA_SUBLINE =
  "Transforming everyday health with Ayurvedic solutions and growing community trust";

export const MEDIA_LOGOS = [
  { name: "OnlyMyHealth", style: "text-[#2e8b1e] font-semibold" },
  { name: "FnB News", style: "font-serif text-brand-text" },
  { name: "News18", style: "bg-[#1a3a6b] text-white px-3 py-1 text-sm font-bold" },
  { name: "Economic Times", style: "text-[#c41e3a] font-serif font-bold text-sm" },
  { name: "Business of Food", style: "font-serif text-brand-text" },
  { name: "Ayush", style: "text-brand-green font-bold" },
] as const;

export const CASE_STUDIES = [
  {
    name: "Rahul M.",
    location: "Delhi",
    startA1c: 9.5,
    threeMonthA1c: 6.7,
    medicineStoppedDays: 45,
    reversedMonths: 6,
  },
  {
    name: "Priya S.",
    location: "Pune",
    startA1c: 9.5,
    threeMonthA1c: 6.2,
    medicineStoppedDays: 14,
    reversedMonths: 6,
  },
] as const;

export const TESTIMONIALS = [
  {
    title: "Reduced 12 KGS in 6 Months",
    body: "I struggled with weight and low energy for years. After starting Diabetes Shudhi alongside balanced nutrition and daily walks, I felt more energetic and saw steady progress over six months. My joint comfort improved and I could enjoy activities I had avoided for years.",
    author: "Abhimanyu, 28 (Gurugram)",
  },
  {
    title: "HbA1c Reduced Significantly",
    body: "Managing type 2 diabetes felt overwhelming with constant monitoring. When I added Diabetes Shudhi to my routine under my doctor's guidance, I saw meaningful improvement in my wellness markers within three months. I feel more energetic and in control of my lifestyle.",
    author: "Kirti Shukla, 36 (Saharanpur)",
  },
] as const;

export const SHORT_QUOTES = [
  "Because of fluctuations in my sugar levels, I used to feel extreme dizziness and fatigue. Within 1.5 months my routine felt more stable and I now feel more energetic throughout the day.",
  "From thinking diabetes care was only about pills to building a healthier lifestyle — Diabetes Shudhi helped me stay consistent with natural support and better habits.",
  "After 3 months of consistent use alongside diet changes, I saw real changes in my energy and weight. Today I feel healthier and proud to be part of the Har Ghar Shudhi family.",
] as const;

export const SUPPLEMENT_FACTS = [
  { name: "Bitter Melon Extract (Karela)", amount: "120 mg" },
  { name: "Fenugreek Seed (Methi)", amount: "112.5 mg" },
  { name: "Jamun Seed Extract", amount: "105 mg" },
  { name: "Gymnema Sylvestre (Gudmar)", amount: "97.5 mg" },
  { name: "Turmeric (Curcuma Longa)", amount: "75 mg" },
  { name: "Neem Leaf Extract", amount: "67.5 mg" },
  { name: "Bael (Aegle marmelos)", amount: "60 mg" },
  { name: "Black Pepper (Piper nigrum)", amount: "15 mg" },
] as const;

export const COMPARISON_ROWS = [
  { feature: "100% Natural", hgs: true, allopathy: false },
  { feature: "Ayurvedic Formulation", hgs: true, allopathy: false },
  { feature: "Time-Tested Herbs", hgs: true, allopathy: false },
  { feature: "Holistic Lifestyle Support", hgs: true, allopathy: false },
  { feature: "Affordable Daily Wellness", hgs: true, allopathy: false },
] as const;

export const LANDING_FAQS = [
  {
    question: "Does Diabetes Shudhi have any side effects?",
    answer:
      "Our formula uses natural Ayurvedic ingredients. Most customers tolerate it well. If you have allergies or take prescription medication, consult your healthcare provider before use.",
  },
  {
    question: "What are the shipping charges?",
    answer:
      "We offer free shipping on prepaid orders above ₹1,499 across India. COD shipping charges are calculated at checkout based on your location.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders within India typically arrive in 4–6 business days. Remote areas may take up to 7 business days.",
  },
  {
    question: "Can this replace my diabetes medication?",
    answer:
      "No. Diabetes Shudhi is a wellness supplement, not a medicine. Always follow your doctor's advice and never stop prescribed medication without medical guidance.",
  },
] as const;

export const TRUST_STRIP = [
  "Free Shipping across India",
  "Cash on Delivery",
  "Customer Support",
] as const;
