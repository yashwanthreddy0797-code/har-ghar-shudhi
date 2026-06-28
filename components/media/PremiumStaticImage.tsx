type PremiumStaticImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  retinaSrc?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

/**
 * Serves static assets at native resolution without Next.js image compression.
 * Use retinaSrc for a 2x asset on high-DPI displays.
 */
export default function PremiumStaticImage({
  src,
  alt,
  width,
  height,
  retinaSrc,
  priority = false,
  className = "premium-static-image block h-auto w-full max-w-full",
  sizes = "100vw",
}: PremiumStaticImageProps) {
  const srcSet = retinaSrc
    ? `${src} ${width}w, ${retinaSrc} ${width * 2}w`
    : undefined;

  return (
    // Native img preserves full-quality static files (hero banners, editorial art).
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      className={className}
    />
  );
}
