/** Catalog slugs that open with a cinematic scroll experience on the product page. */
export const CATALOG_SCROLL_SLUGS = [
  "wildforest-multiflora-honey",
  "moringa-powder",
  "pure-shilajit",
  "ashwagandha-advance",
  "spirulina-powder",
] as const;

export type CatalogScrollSlug = (typeof CATALOG_SCROLL_SLUGS)[number];

export function hasCatalogScrollHero(slug: string): slug is CatalogScrollSlug {
  return (CATALOG_SCROLL_SLUGS as readonly string[]).includes(slug);
}
