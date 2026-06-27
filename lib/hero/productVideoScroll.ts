export interface ProductBenefit {
  title: string;
  text: string;
}

export interface ProductVideoScrollConfig {
  sources: {
    hd: string;
    uhd: string;
  };
  width: number;
  height: number;
  scrollHeightVh: number;
  /** First-frame still shown until the reveal video can paint. */
  poster?: string;
  /** Layout of the centered video stage. */
  layout: {
    /** Full Tailwind sizing for the video panel (aspect + width/height caps). */
    stageClass: string;
    /** Optional mobile-only stage sizing (portrait products, etc.). */
    mobileStageClass?: string;
    /** Width reservation for the grid center column so side text never overlaps. */
    columnClass: string;
  };
  hero: {
    eyebrow: string;
    headlineLeft: readonly [string, string];
    headlineRight: readonly [string, string];
    subtext: string;
    cta: { label: string; href: string };
  };
  /** Product callouts revealed on the sides while scrolling the reveal. */
  benefits: {
    left: readonly ProductBenefit[];
    right: readonly ProductBenefit[];
  };
  sequenceLabel: string;
  closing: {
    eyebrow: string;
    title: string;
    description: string;
    link: { label: string; href: string };
  };
}
