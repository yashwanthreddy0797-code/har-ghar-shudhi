/**
 * Curated gallery images per catalog product — primary pack shot first,
 * then lifestyle / detail shots for the PDP carousel.
 */
const GALLERY_BY_SLUG: Record<string, string[]> = {
  "pure-shilajit": [
    "/hero/shilajit/shilajit-jar-hero.png",
    "/hero/shilajit/shilajit-resin-bowl.png",
    "/hero/shilajit/shilajit-rock-prop.png",
  ],
  "ashwagandha-advance": [
    "/cinematic/products/ashwagandha-advance.png",
    "/shop/explore/ashwagandha-advance.png",
    "/shop/banners/ashwagandha-advance-featured.png",
    "/hero/ashwagandha-bottle-hero.png",
  ],
  "diabetes-shudhi": [
    "/cinematic/products/diabetes-shudhi.png",
    "/shop/explore/diabetes-shudhi.png",
    "/landing/diabetes-shudhi-hero-main.png",
  ],
  "gut-shudhi": [
    "/cinematic/products/gut-shudhi.png",
    "/shop/explore/gut-shudhi.png",
  ],
  "master-mineral": [
    "/cinematic/products/master-mineral.png",
    "/shop/explore/master-mineral.png",
  ],
  "moringa-powder": [
    "/cinematic/products/moringa-powder.png",
    "/shop/explore/moringa-powder.png",
    "/hero/moringa-bottle-hero.png",
    "/hero/moringa/insights/why-moringa.png",
  ],
  "spirulina-powder": [
    "/cinematic/products/spirulina-powder.png",
    "/shop/explore/spirulina-powder.png",
  ],
  "wildforest-multiflora-honey": [
    "/cinematic/products/wildforest-honey.png",
    "/shop/explore/wildforest-honey.png",
    "/hero/honey-jar-hero.png",
    "/hero/honey-marketing.png",
    "/shop/banners/wildforest-honey-featured.png",
  ],
  "pain-shield": [
    "/cinematic/products/pain-shield.png",
    "/shop/explore/pain-shield.png",
  ],
};

export function getProductGalleryImages(slug: string, fallback: string[]): string[] {
  const curated = GALLERY_BY_SLUG[slug];
  const merged = [...(curated ?? fallback), ...fallback];
  return [...new Set(merged.filter(Boolean))];
}
