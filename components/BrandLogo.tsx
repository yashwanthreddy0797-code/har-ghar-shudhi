import Image from "next/image";
import Link from "next/link";

export const BRAND_LOGO_SRC = "/brand/har-ghar-shudhi-logo.png";
export const BRAND_LOGO_WHITE_SRC = "/brand/har-ghar-shudhi-logo-white.png";

/** Height-based sizes — `nav` fits inside the fixed header bar (h-16 / md:h-[4.5rem]) */
const SIZE_CLASS = {
  nav: "h-12 w-auto max-w-[140px] object-contain md:h-14 md:max-w-[162px]",
  sm: "h-16 w-auto min-w-[120px]",
  md: "h-24 w-auto min-w-[180px]",
  lg: "h-32 w-auto min-w-[220px]",
  xl: "h-40 w-auto min-w-[260px]",
  "2xl": "h-48 w-auto min-w-[300px]",
} as const;

export type BrandLogoSize = keyof typeof SIZE_CLASS;
export type BrandLogoVariant = "default" | "white";

interface BrandLogoProps {
  size?: BrandLogoSize;
  variant?: BrandLogoVariant;
  href?: string | null;
  className?: string;
  priority?: boolean;
}

export default function BrandLogo({
  size = "md",
  variant = "default",
  href = "/",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const src = variant === "white" ? BRAND_LOGO_WHITE_SRC : BRAND_LOGO_SRC;
  const isNav = size === "nav";
  const dimensions =
    variant === "white"
      ? { width: 1232, height: 1434 }
      : { width: 616, height: 717 };

  const image = (
    <Image
      src={src}
      alt="Har Ghar Shudhi — Rooted in Nature, Driven by Purpose"
      width={dimensions.width}
      height={dimensions.height}
      quality={100}
      sizes={isNav ? "(max-width: 768px) 140px, 162px" : undefined}
      className={`object-contain ${SIZE_CLASS[size]} ${className}`}
      priority={priority}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-block shrink-0" aria-label="Har Ghar Shudhi home">
        {image}
      </Link>
    );
  }

  return <span className="inline-block shrink-0">{image}</span>;
}
