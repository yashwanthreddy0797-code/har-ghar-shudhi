export type CinematicVideoScrollTheme = "darkLuxury" | "warmHoney" | "spirulinaLuxury";

export interface CinematicVideoScrollConfig {
  scrollId: string;
  src: string;
  /** Fallback image while the first video frame decodes. */
  poster?: string;
  scrollHeightVh: number;
  theme: CinematicVideoScrollTheme;
  variantLabel?: string;
  ariaLabel: string;
  videoAriaLabel: string;
  eyebrow: string;
  headline: readonly [string, string];
  subtext: string;
  sequenceLabel: string;
  closing: {
    eyebrow: string;
    title: string;
    link: { label: string; href: string };
  };
  /** White logo pinned over the video — e.g. to mask a generator watermark. */
  videoLogoOverlay?: {
    className?: string;
    logoClassName?: string;
    backdropClassName?: string;
  };
}

export const CINEMATIC_VIDEO_THEMES: Record<
  CinematicVideoScrollTheme,
  {
    section: string;
    sequence: string;
    overlay: string;
    badge: string;
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    subtext: string;
    hint: string;
    progressTrack: string;
    progressBar: string;
    closingWrap: string;
    closingEyebrow: string;
    closingTitle: string;
    closingLink: string;
  }
> = {
  darkLuxury: {
    section: "bg-[#060504]",
    sequence: "bg-[#060504]",
    overlay:
      "bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.68)_100%)]",
    badge:
      "border-white/10 bg-black/35 text-white/55",
    eyebrow: "text-[#c9a962]/85",
    headline: "text-[#f7f2ea]",
    headlineAccent: "text-[#c9a962]",
    subtext: "text-[#d8cdbb]/88",
    hint: "text-white/45",
    progressTrack: "bg-white/10",
    progressBar: "bg-[#c9a962]/75",
    closingWrap: "border-t border-brand-border/50 bg-white",
    closingEyebrow: "text-[#c9a962]",
    closingTitle: "text-brand-text",
    closingLink: "text-[#d8c08a] hover:text-[#c9a962]",
  },
  warmHoney: {
    section: "bg-[#120c06]",
    sequence: "bg-[#120c06]",
    overlay:
      "bg-[radial-gradient(ellipse_at_50%_42%,rgba(120,72,18,0.18)_0%,rgba(18,12,6,0.72)_100%)]",
    badge:
      "border-[#e8b84a]/20 bg-[#1a1008]/70 text-[#e8c878]/75",
    eyebrow: "text-[#e8b84a]/90",
    headline: "text-[#faf6ef]",
    headlineAccent: "text-[#f0c14a]",
    subtext: "text-[#d8c8a8]/90",
    hint: "text-[#e8d4a8]/50",
    progressTrack: "bg-[#f0c14a]/15",
    progressBar: "bg-[#e8b84a]/80",
    closingWrap: "border-t border-[#e8b84a]/15 bg-[#faf6ef]",
    closingEyebrow: "text-[#9a6b1a]",
    closingTitle: "text-[#2a2218]",
    closingLink: "text-[#9a6b1a] hover:text-[#7a5514]",
  },
  spirulinaLuxury: {
    section: "bg-[#041210]",
    sequence: "bg-[#041210]",
    overlay:
      "bg-[radial-gradient(ellipse_at_50%_42%,rgba(32,120,96,0.22)_0%,rgba(4,18,16,0.74)_100%)]",
    badge: "border-[#5cb894]/20 bg-[#041210]/70 text-[#8fd4b8]/75",
    eyebrow: "text-[#7ecfb0]/90",
    headline: "text-[#f0faf6]",
    headlineAccent: "text-[#5cb894]",
    subtext: "text-[#b8d4c8]/90",
    hint: "text-[#8fd4b8]/50",
    progressTrack: "bg-[#5cb894]/15",
    progressBar: "bg-[#5cb894]/80",
    closingWrap: "border-t border-brand-border/50 bg-white",
    closingEyebrow: "text-[#1a6b52]",
    closingTitle: "text-brand-text",
    closingLink: "text-[#1a6b52] hover:text-[#145a44]",
  },
};
