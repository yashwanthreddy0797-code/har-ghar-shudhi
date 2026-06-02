import Image from "next/image";
import Link from "next/link";

export const BRAND_LOGO_SRC = "/brand/har-ghar-shudhi-logo.png";

/** Taller logo asset — height-based sizes keep it prominent and readable */
const SIZE_CLASS = {
  sm: "h-16 w-auto min-w-[120px]",
  md: "h-24 w-auto min-w-[180px]",
  lg: "h-32 w-auto min-w-[220px]",
  xl: "h-40 w-auto min-w-[260px]",
  "2xl": "h-48 w-auto min-w-[300px]",
} as const;

export type BrandLogoSize = keyof typeof SIZE_CLASS;

interface BrandLogoProps {
  size?: BrandLogoSize;
  href?: string | null;
  className?: string;
  priority?: boolean;
}

export default function BrandLogo({
  size = "md",
  href = "/",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const image = (
    <Image
      src={BRAND_LOGO_SRC}
      alt="Har Ghar Shudhi — Rooted in Nature, Driven by Purpose"
      width={500}
      height={500}
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
