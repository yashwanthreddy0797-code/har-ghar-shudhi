import type { CatalogProductInput } from "@/lib/catalog/types";

function catalogVariant(slug: string, label: string, price: number) {
  return {
    id: `catalog-${slug}`,
    label,
    price,
    availableForSale: false,
  };
}

export const HGS_CATALOG_PRODUCTS: CatalogProductInput[] = [
  {
    id: "catalog-pure-shilajit",
    slug: "pure-shilajit",
    name: "Pure Shilajit",
    tagline: "Himalayan Mineral Resin",
    image: "/hero/shilajit/shilajit-jar-hero.png",
    images: ["/hero/shilajit/shilajit-jar-hero.png"],
    category: "immunity",
    concerns: ["immunity"],
    price: 1499,
    badge: "Himalayan Mineral Resin",
    productType: "Mineral Resin",
    benefitPills: ["Energy", "Strength", "Vitality"],
    rating: 4.9,
    reviewCount: 240,
    variants: [catalogVariant("pure-shilajit", "20g Jar", 1499)],
    description:
      "Authentic Himalayan mineral resin traditionally valued for vitality, stamina, and daily wellness.",
    highlights: [
      "100% Pure Himalayan Shilajit",
      "Lab tested for purity",
      "No preservatives",
    ],
    availableForSale: false,
    whyThisProduct: {
      title: "Ancient Himalayan Wellness",
      description:
        "Authentic Himalayan mineral resin traditionally valued for vitality, stamina, and daily wellness — purified and crafted for modern daily rituals.",
      features: [
        {
          title: "Himalayan Origin",
          description:
            "Sourced from high-altitude regions and prepared with respect for traditional Ayurvedic practice.",
        },
        {
          title: "Purified & Potent",
          description:
            "Processed for purity without compromising the natural mineral complexity of raw shilajit.",
        },
        {
          title: "Daily Vitality Ritual",
          description:
            "Designed for consistent use as part of a grounded wellness routine.",
        },
        {
          title: "Premium Presentation",
          description:
            "Packaged to preserve freshness and reflect the premium nature of the ingredient.",
        },
      ],
    },
    keyBenefits: [
      { icon: "⚡", label: "Energy Support" },
      { icon: "💪", label: "Strength & Vitality" },
      { icon: "🏔", label: "Himalayan Source" },
      { icon: "🌿", label: "Traditional Ayurvedic Use" },
    ],
    formulation: {
      kind: "resin",
      title: "Pure Mineral Resin",
      items: [
        {
          name: "Shilajit Resin",
          description: "Pure Himalayan mineral resin — the sole active ingredient.",
        },
        {
          name: "Fulvic Complex",
          description: "Naturally occurring compounds valued in traditional wellness.",
        },
        {
          name: "Trace Minerals",
          description: "Broad-spectrum mineral profile from pristine mountain sources.",
        },
      ],
    },
    howToUse: [
      {
        title: "Measure",
        description: "Take a pea-sized portion (approx. 300–500 mg) using the provided spoon.",
      },
      {
        title: "Dissolve",
        description: "Mix into warm water, milk, or herbal tea until fully dissolved.",
      },
      {
        title: "Consume",
        description: "Take once daily, preferably in the morning or as advised.",
      },
    ],
    trustPoints: [
      "Rooted In Nature",
      "Driven By Purpose",
      "Lab Tested",
      "Premium Ingredients",
      "Transparent Sourcing",
      "Quality Assured",
    ],
    faqs: [
      {
        question: "What is Pure Shilajit?",
        answer:
          "Pure Shilajit is a mineral-rich resin sourced from the Himalayas, traditionally used in Ayurveda for vitality and wellness support.",
      },
      {
        question: "How should I store it?",
        answer:
          "Store in a cool, dry place away from direct sunlight. Keep the jar tightly sealed.",
      },
      {
        question: "Is it lab tested?",
        answer:
          "Yes. Every batch is tested for purity, heavy metals, and quality standards.",
      },
    ],
    relatedSlugs: [
      "ashwagandha-advance",
      "master-mineral",
      "moringa-powder",
      "wildforest-multiflora-honey",
    ],
    finalCta: {
      headline: "Experience Wellness The Natural Way",
      subline: "Discover the full Har Ghar Shudhi collection.",
    },
  },
  {
    id: "catalog-ashwagandha-advance",
    slug: "ashwagandha-advance",
    name: "Ashwagandha Advance",
    tagline: "Stress Support & Daily Wellness",
    image: "/cinematic/products/ashwagandha-advance.png",
    images: ["/cinematic/products/ashwagandha-advance.png"],
    category: "immunity",
    concerns: ["immunity", "weight-loss"],
    price: 899,
    badge: "Stress Support",
    productType: "Ayurvedic Capsules",
    benefitPills: ["Calm", "Focus", "Recovery"],
    rating: 4.9,
    reviewCount: 180,
    variants: [catalogVariant("ashwagandha-advance", "60 Capsules", 899)],
    description:
      "Advanced ashwagandha formulation for stress relief, focus, recovery, and daily resilience.",
    highlights: ["KSM-66 grade root extract", "Non-GMO", "No artificial additives"],
    availableForSale: false,
    whyThisProduct: {
      title: "Adaptogenic Daily Support",
      description:
        "Ashwagandha Advance combines time-honoured adaptogenic wisdom with a modern daily wellness format.",
      features: [
        {
          title: "Stress & Calm",
          description: "Supports the body's natural response to daily stressors.",
        },
        {
          title: "Focus & Clarity",
          description: "Helps maintain mental clarity as part of a balanced routine.",
        },
        {
          title: "Recovery Support",
          description: "Traditionally valued for restorative wellness and stamina.",
        },
        {
          title: "Clean Formula",
          description: "Premium capsules with no unnecessary fillers.",
        },
      ],
    },
    keyBenefits: [
      { icon: "🧘", label: "Stress Relief" },
      { icon: "🎯", label: "Focus" },
      { icon: "🌙", label: "Sleep Support" },
      { icon: "💪", label: "Strength & Stamina" },
    ],
    formulation: {
      kind: "capsule",
      title: "Ingredient Profile",
      items: [
        {
          name: "Ashwagandha Root Extract",
          description: "Standardised adaptogenic root extract.",
        },
        {
          name: "Withanolides",
          description: "Key active compounds in premium ashwagandha.",
        },
        {
          name: "Vegetarian Capsule Shell",
          description: "Clean, plant-based delivery format.",
        },
      ],
    },
    howToUse: [
      {
        title: "Dosage",
        description: "Take 1–2 capsules daily with water or as directed.",
      },
      {
        title: "Timing",
        description: "Best taken with meals for optimal absorption.",
      },
      {
        title: "Consistency",
        description: "Use daily for 8–12 weeks for best experiential results.",
      },
    ],
    trustPoints: [
      "Rooted In Nature",
      "Driven By Purpose",
      "Lab Tested",
      "Premium Ingredients",
      "Transparent Sourcing",
      "Quality Assured",
    ],
    faqs: [
      {
        question: "When should I take Ashwagandha Advance?",
        answer: "Take with meals, once or twice daily, or as advised by your practitioner.",
      },
      {
        question: "Is it suitable for daily use?",
        answer: "Yes. It is formulated for consistent daily wellness support.",
      },
    ],
    relatedSlugs: ["pure-shilajit", "gut-shudhi", "master-mineral", "pain-shield"],
    finalCta: {
      headline: "Experience Wellness The Natural Way",
      subline: "Build your daily Ayurvedic ritual.",
    },
  },
  {
    id: "catalog-diabetes-shudhi",
    slug: "diabetes-shudhi",
    name: "Diabetes Shudhi",
    tagline: "Blood Sugar Support",
    image: "/cinematic/products/diabetes-shudhi.png",
    images: ["/cinematic/products/diabetes-shudhi.png"],
    category: "immunity",
    concerns: ["diabetes"],
    price: 999,
    badge: "Blood Sugar Support",
    productType: "Ayurvedic Capsules",
    benefitPills: ["Metabolism", "Balance", "Protection"],
    rating: 4.8,
    reviewCount: 120,
    variants: [catalogVariant("diabetes-shudhi", "60 Capsules", 999)],
    description:
      "Ayurvedic blend formulated to support blood sugar balance, metabolism, and antioxidant protection.",
    highlights: ["Blood sugar support", "Metabolic wellness", "Antioxidant rich"],
    availableForSale: false,
    whyThisProduct: {
      title: "Metabolic Wellness Support",
      description:
        "Diabetes Shudhi is crafted for those seeking Ayurvedic support for blood sugar balance and metabolic health.",
      features: [
        {
          title: "Blood Sugar Support",
          description: "Traditional herbs selected for glycemic wellness.",
        },
        {
          title: "Metabolism Support",
          description: "Supports healthy metabolic function as part of diet and lifestyle.",
        },
        {
          title: "Insulin Function",
          description: "Ingredients traditionally used to support insulin sensitivity.",
        },
        {
          title: "Antioxidant Protection",
          description: "Helps combat oxidative stress associated with metabolic imbalance.",
        },
      ],
    },
    keyBenefits: [
      { icon: "🩸", label: "Blood Sugar Support" },
      { icon: "🔥", label: "Metabolism Support" },
      { icon: "💉", label: "Insulin Function" },
      { icon: "🛡", label: "Antioxidant Protection" },
    ],
    formulation: {
      kind: "capsule",
      title: "Key Ingredients",
      items: [
        { name: "Bitter Melon Extract", description: "Traditionally used for glycemic support." },
        { name: "Fenugreek Seed", description: "Supports healthy glucose metabolism." },
        { name: "Jamun Seed", description: "Ayurvedic botanical for metabolic balance." },
      ],
    },
    howToUse: [
      { title: "Dosage", description: "Take 1–2 capsules twice daily with meals." },
      { title: "Monitor", description: "Track your wellness journey alongside medical guidance." },
      { title: "Lifestyle", description: "Combine with balanced nutrition and regular activity." },
    ],
    trustPoints: [
      "Rooted In Nature",
      "Driven By Purpose",
      "Lab Tested",
      "Premium Ingredients",
      "Transparent Sourcing",
      "Quality Assured",
    ],
    faqs: [
      {
        question: "Can this replace medication?",
        answer:
          "No. This is a wellness supplement. Consult your healthcare provider before use alongside medication.",
      },
    ],
    relatedSlugs: ["gut-shudhi", "master-mineral", "moringa-powder", "spirulina-powder"],
    finalCta: {
      headline: "Experience Wellness The Natural Way",
      subline: "Support your metabolic wellness journey.",
    },
  },
  {
    id: "catalog-gut-shudhi",
    slug: "gut-shudhi",
    name: "Gut Shudhi",
    tagline: "Gut Health",
    image: "/cinematic/products/gut-shudhi.png",
    images: ["/cinematic/products/gut-shudhi.png"],
    category: "immunity",
    concerns: ["gut-health", "weight-loss"],
    price: 899,
    badge: "Gut Health",
    productType: "Ayurvedic Capsules",
    benefitPills: ["Digestion", "Balance", "Absorption"],
    rating: 4.9,
    reviewCount: 150,
    variants: [catalogVariant("gut-shudhi", "60 Capsules", 899)],
    description:
      "Comprehensive gut health formula supporting digestion, nutrient absorption, and digestive balance.",
    highlights: ["Digestive support", "Gut microbiome friendly", "Clean formula"],
    availableForSale: false,
    whyThisProduct: {
      title: "Digestive Wellness From Within",
      description:
        "Gut Shudhi supports the foundation of wellness — a balanced, well-functioning digestive system.",
      features: [
        { title: "Digestion", description: "Supports comfortable, efficient digestion." },
        { title: "Gut Health", description: "Nurtures the gut environment for overall wellness." },
        { title: "Weight Management", description: "Supports metabolism as part of a healthy lifestyle." },
        { title: "Nutrient Absorption", description: "Helps the body utilise nutrients effectively." },
      ],
    },
    keyBenefits: [
      { icon: "🌿", label: "Digestion" },
      { icon: "🦠", label: "Gut Health" },
      { icon: "⚖️", label: "Weight Management" },
      { icon: "🥗", label: "Nutrient Absorption" },
    ],
    formulation: {
      kind: "capsule",
      title: "Ingredient Profile",
      items: [
        { name: "Triphala", description: "Classic Ayurvedic digestive blend." },
        { name: "Aloe Vera Extract", description: "Soothes and supports gut lining." },
        { name: "Licorice Root", description: "Traditional digestive harmoniser." },
      ],
    },
    howToUse: [
      { title: "Morning", description: "Take 1 capsule before breakfast with warm water." },
      { title: "Evening", description: "Take 1 capsule before dinner for digestive support." },
      { title: "Hydrate", description: "Drink plenty of water throughout the day." },
    ],
    trustPoints: [
      "Rooted In Nature",
      "Driven By Purpose",
      "Lab Tested",
      "Premium Ingredients",
      "Transparent Sourcing",
      "Quality Assured",
    ],
    faqs: [
      {
        question: "How long before I notice results?",
        answer: "Most users report improved digestion within 2–4 weeks of consistent use.",
      },
    ],
    relatedSlugs: ["diabetes-shudhi", "ashwagandha-advance", "spirulina-powder", "moringa-powder"],
    finalCta: {
      headline: "Experience Wellness The Natural Way",
      subline: "Restore balance from within.",
    },
  },
  {
    id: "catalog-master-mineral",
    slug: "master-mineral",
    name: "Master Mineral",
    tagline: "Mineral Complex",
    image: "/cinematic/products/master-mineral.png",
    images: ["/cinematic/products/master-mineral.png"],
    category: "immunity",
    concerns: ["immunity"],
    price: 1199,
    badge: "Mineral Complex",
    productType: "Mineral Supplement",
    benefitPills: ["Cellular", "Bone", "Joint"],
    rating: 4.8,
    reviewCount: 95,
    variants: [catalogVariant("master-mineral", "60 Capsules", 1199)],
    description:
      "Comprehensive mineral complex supporting cellular function, bone health, and joint wellness.",
    highlights: ["Full-spectrum minerals", "Bioavailable forms", "Daily foundation"],
    availableForSale: false,
    whyThisProduct: {
      title: "Complete Mineral Foundation",
      description:
        "Master Mineral delivers essential minerals in bioavailable forms for whole-body structural and cellular support.",
      features: [
        { title: "Cellular Function", description: "Minerals are essential for every cellular process." },
        { title: "Cardiovascular Support", description: "Key minerals support heart and vascular health." },
        { title: "Bone Health", description: "Calcium, magnesium, and co-factors for skeletal strength." },
        { title: "Joint Health", description: "Supports connective tissue and joint comfort." },
      ],
    },
    keyBenefits: [
      { icon: "🔬", label: "Cellular Function" },
      { icon: "❤️", label: "Cardiovascular Support" },
      { icon: "🦴", label: "Bone Health" },
      { icon: "🦵", label: "Joint Health" },
    ],
    formulation: {
      kind: "capsule",
      title: "Mineral Complex",
      items: [
        { name: "Magnesium", description: "Essential for muscle, nerve, and bone function." },
        { name: "Zinc", description: "Supports immunity and cellular repair." },
        { name: "Calcium & D3", description: "Foundation for bone density and absorption." },
      ],
    },
    howToUse: [
      { title: "Daily Dose", description: "Take 2 capsules daily with a meal." },
      { title: "With Food", description: "Fat-soluble minerals absorb best with dietary fat." },
      { title: "Consistency", description: "Use daily as part of your mineral foundation routine." },
    ],
    trustPoints: [
      "Rooted In Nature",
      "Driven By Purpose",
      "Lab Tested",
      "Premium Ingredients",
      "Transparent Sourcing",
      "Quality Assured",
    ],
    faqs: [
      {
        question: "Can I take this with other supplements?",
        answer: "Consult your practitioner when combining multiple mineral supplements.",
      },
    ],
    relatedSlugs: ["pure-shilajit", "ashwagandha-advance", "pain-shield", "moringa-powder"],
    finalCta: {
      headline: "Experience Wellness The Natural Way",
      subline: "Build your mineral foundation.",
    },
  },
  {
    id: "catalog-moringa-powder",
    slug: "moringa-powder",
    name: "Moringa Powder",
    tagline: "Superfood",
    image: "/cinematic/products/moringa-powder.png",
    images: ["/cinematic/products/moringa-powder.png"],
    category: "immunity",
    concerns: ["immunity", "weight-loss"],
    price: 599,
    badge: "Superfood",
    productType: "Green Superfood Powder",
    benefitPills: ["Immunity", "Energy", "Detox"],
    rating: 4.9,
    reviewCount: 210,
    variants: [catalogVariant("moringa-powder", "200g Pouch", 599)],
    description:
      "Nutrient-dense moringa leaf powder — nature's multivitamin for immunity, energy, and radiant wellness.",
    highlights: ["90+ nutrients", "Sun-dried leaves", "No additives"],
    availableForSale: false,
    whyThisProduct: {
      title: "Nature's Multivitamin",
      description:
        "Moringa Powder delivers concentrated plant nutrition in a versatile daily superfood format.",
      features: [
        { title: "Immunity", description: "Rich in antioxidants and immune-supporting nutrients." },
        { title: "Energy", description: "Natural plant energy without stimulants." },
        { title: "Detox", description: "Supports the body's natural cleansing processes." },
        { title: "Skin & Hair", description: "Nutrients valued for beauty from within." },
      ],
    },
    keyBenefits: [
      { icon: "🛡", label: "Immunity" },
      { icon: "⚡", label: "Energy" },
      { icon: "🌱", label: "Detox" },
      { icon: "✨", label: "Skin & Hair Support" },
    ],
    formulation: {
      kind: "powder",
      title: "Nutrient Profile",
      items: [
        { name: "Vitamin A & C", description: "Powerful antioxidants for immune defence." },
        { name: "Iron & Calcium", description: "Essential minerals for energy and structure." },
        { name: "Plant Protein", description: "Complete amino acid profile from moringa leaves." },
      ],
    },
    howToUse: [
      { title: "Blend", description: "Add 1 tsp to smoothies, juices, or warm water." },
      { title: "Cook", description: "Stir into soups, dal, or sprinkle over meals." },
      { title: "Daily", description: "Use once or twice daily for best results." },
    ],
    trustPoints: [
      "Rooted In Nature",
      "Driven By Purpose",
      "Lab Tested",
      "Premium Ingredients",
      "Transparent Sourcing",
      "Quality Assured",
    ],
    faqs: [
      {
        question: "What does moringa taste like?",
        answer: "Moringa has a mild, earthy, green taste that blends well into smoothies and foods.",
      },
    ],
    relatedSlugs: ["spirulina-powder", "wildforest-multiflora-honey", "gut-shudhi", "pure-shilajit"],
    finalCta: {
      headline: "Experience Wellness The Natural Way",
      subline: "Add superfood nutrition to every day.",
    },
  },
  {
    id: "catalog-spirulina-powder",
    slug: "spirulina-powder",
    name: "Spirulina Powder",
    tagline: "Complete Protein Superfood",
    image: "/cinematic/products/spirulina-powder.png",
    images: ["/cinematic/products/spirulina-powder.png"],
    category: "immunity",
    concerns: ["immunity", "weight-loss"],
    price: 649,
    badge: "Superfood",
    productType: "Algae Superfood Powder",
    benefitPills: ["Protein", "Energy", "Immunity"],
    rating: 4.8,
    reviewCount: 165,
    variants: [catalogVariant("spirulina-powder", "150g Pouch", 649)],
    description:
      "Premium spirulina — a complete protein superfood for energy, immunity, and sustained stamina.",
    highlights: ["60%+ protein", "Rich in B vitamins", "Clean sourced algae"],
    availableForSale: false,
    whyThisProduct: {
      title: "Complete Plant Protein",
      description:
        "Spirulina Powder is one of nature's most nutrient-dense foods — a blue-green algae prized for protein and vitality.",
      features: [
        { title: "Protein", description: "Complete amino acid profile for daily nutrition." },
        { title: "Energy", description: "B-vitamins and iron support natural energy production." },
        { title: "Immunity", description: "Phycocyanin and antioxidants for immune defence." },
        { title: "Stamina", description: "Supports endurance as part of an active lifestyle." },
      ],
    },
    keyBenefits: [
      { icon: "💪", label: "Protein" },
      { icon: "⚡", label: "Energy" },
      { icon: "🛡", label: "Immunity" },
      { icon: "🏃", label: "Stamina" },
    ],
    formulation: {
      kind: "powder",
      title: "Nutrient Profile",
      items: [
        { name: "Phycocyanin", description: "Powerful blue pigment with antioxidant properties." },
        { name: "Complete Protein", description: "All essential amino acids in plant form." },
        { name: "Chlorophyll", description: "Supports detoxification and cellular health." },
      ],
    },
    howToUse: [
      { title: "Mix", description: "Blend 1 tsp into water, juice, or smoothies." },
      { title: "Post-Workout", description: "Ideal after exercise for recovery nutrition." },
      { title: "Daily", description: "Take once daily for sustained benefits." },
    ],
    trustPoints: [
      "Rooted In Nature",
      "Driven By Purpose",
      "Lab Tested",
      "Premium Ingredients",
      "Transparent Sourcing",
      "Quality Assured",
    ],
    faqs: [
      {
        question: "Is spirulina safe for daily use?",
        answer: "Yes. Our spirulina is tested for purity and suitable for daily consumption.",
      },
    ],
    relatedSlugs: ["moringa-powder", "gut-shudhi", "master-mineral", "ashwagandha-advance"],
    finalCta: {
      headline: "Experience Wellness The Natural Way",
      subline: "Fuel your body with complete plant nutrition.",
    },
  },
  {
    id: "catalog-wildforest-multiflora-honey",
    slug: "wildforest-multiflora-honey",
    name: "Wildforest Multiflora Honey",
    tagline: "Raw Himalayan Honey",
    image: "/cinematic/products/wildforest-honey.png",
    images: ["/cinematic/products/wildforest-honey.png"],
    category: "jaggery",
    concerns: ["immunity", "gut-health"],
    price: 749,
    badge: "Raw Honey",
    productType: "Raw Himalayan Honey",
    benefitPills: ["Pure", "Natural", "Unfiltered"],
    rating: 4.9,
    reviewCount: 320,
    variants: [catalogVariant("wildforest-multiflora-honey", "500g Jar", 749)],
    description:
      "Unprocessed multiflora honey from Himalayan wild forests — pure, natural, and unfiltered.",
    highlights: ["Wild harvested", "Unfiltered", "No additives"],
    availableForSale: false,
    whyThisProduct: {
      title: "Wild Himalayan Honey",
      description:
        "Wildforest Multiflora Honey is harvested from pristine forest ecosystems — raw, unfiltered, and bursting with natural goodness.",
      features: [
        { title: "Wild Sourced", description: "Collected from multiflora blooms in Himalayan forests." },
        { title: "Unfiltered", description: "Retains natural enzymes, pollen, and propolis." },
        { title: "Pure & Natural", description: "No heating, no blending, no artificial processing." },
        { title: "Traceable Origin", description: "Transparent sourcing from forest to jar." },
      ],
    },
    keyBenefits: [
      { icon: "🍯", label: "Antioxidants" },
      { icon: "🛡", label: "Immunity" },
      { icon: "⚡", label: "Energy" },
      { icon: "🌿", label: "Digestion" },
    ],
    formulation: {
      kind: "honey",
      title: "Sourcing & Purity",
      items: [
        { name: "Multiflora Nectar", description: "Diverse wildflower nectar from forest ecosystems." },
        { name: "Natural Enzymes", description: "Preserved through raw, unheated processing." },
        { name: "Forest Provenance", description: "Traceable Himalayan wild forest origin." },
      ],
    },
    howToUse: [
      { title: "Morning", description: "Take 1 tbsp on an empty stomach with warm water." },
      { title: "Culinary", description: "Drizzle over toast, yogurt, or herbal teas." },
      { title: "Wellness", description: "Mix with lemon and warm water for a daily tonic." },
    ],
    trustPoints: [
      "Rooted In Nature",
      "Driven By Purpose",
      "Lab Tested",
      "Premium Ingredients",
      "Transparent Sourcing",
      "Quality Assured",
    ],
    faqs: [
      {
        question: "Is this honey raw?",
        answer: "Yes. It is unheated and unfiltered to preserve natural enzymes and nutrients.",
      },
      {
        question: "Does raw honey crystallise?",
        answer: "Yes. Crystallisation is a natural sign of purity. Gently warm to re-liquify.",
      },
    ],
    relatedSlugs: ["pure-shilajit", "moringa-powder", "gut-shudhi", "pain-shield"],
    finalCta: {
      headline: "Experience Wellness The Natural Way",
      subline: "Taste the purity of the Himalayas.",
    },
  },
  {
    id: "catalog-pain-shield",
    slug: "pain-shield",
    name: "Pain Shield",
    tagline: "Pain Relief Spray",
    image: "/cinematic/products/pain-shield.png",
    images: ["/cinematic/products/pain-shield.png"],
    category: "immunity",
    concerns: ["immunity"],
    price: 549,
    badge: "Pain Relief",
    productType: "Topical Spray",
    benefitPills: ["Muscle", "Joint", "Recovery"],
    rating: 4.7,
    reviewCount: 88,
    variants: [catalogVariant("pain-shield", "50ml Spray", 549)],
    description:
      "Fast-acting Ayurvedic pain relief spray for muscle comfort, joint support, and recovery.",
    highlights: ["Fast absorbing", "Ayurvedic actives", "Non-greasy formula"],
    availableForSale: false,
    whyThisProduct: {
      title: "Targeted Relief, Naturally",
      description:
        "Pain Shield combines traditional Ayurvedic botanicals in a modern spray format for on-the-go comfort.",
      features: [
        { title: "Muscle Relief", description: "Soothes tired, overworked muscles." },
        { title: "Joint Relief", description: "Supports joint comfort and mobility." },
        { title: "Fast Action", description: "Spray format for quick, targeted application." },
        { title: "Recovery Support", description: "Ideal post-activity or at end of day." },
      ],
    },
    keyBenefits: [
      { icon: "💪", label: "Muscle Relief" },
      { icon: "🦴", label: "Joint Relief" },
      { icon: "🔄", label: "Recovery Support" },
      { icon: "🌿", label: "Ayurvedic Actives" },
    ],
    formulation: {
      kind: "spray",
      title: "Active Benefits",
      items: [
        { name: "Eucalyptus Oil", description: "Cooling sensation and muscle comfort." },
        { name: "Menthol", description: "Immediate soothing relief on application." },
        { name: "Wintergreen Extract", description: "Traditional botanical for joint comfort." },
      ],
    },
    howToUse: [
      { title: "Spray", description: "Apply 2–3 sprays to the affected area." },
      { title: "Massage", description: "Gently massage until absorbed." },
      { title: "Repeat", description: "Use 2–3 times daily or as needed." },
    ],
    trustPoints: [
      "Rooted In Nature",
      "Driven By Purpose",
      "Lab Tested",
      "Premium Ingredients",
      "Transparent Sourcing",
      "Quality Assured",
    ],
    faqs: [
      {
        question: "Is Pain Shield suitable for daily use?",
        answer: "Yes. It is formulated for regular topical use on muscles and joints.",
      },
    ],
    relatedSlugs: ["ashwagandha-advance", "master-mineral", "pure-shilajit", "wildforest-multiflora-honey"],
    finalCta: {
      headline: "Experience Wellness The Natural Way",
      subline: "Find comfort in nature's pharmacy.",
    },
  },
];

export const HGS_CATALOG_SLUGS = HGS_CATALOG_PRODUCTS.map((p) => p.slug);

export function getCatalogProductInput(slug: string) {
  return HGS_CATALOG_PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedCatalogInputs(slugs: string[]) {
  return slugs
    .map((slug) => getCatalogProductInput(slug))
    .filter((p): p is CatalogProductInput => Boolean(p));
}
