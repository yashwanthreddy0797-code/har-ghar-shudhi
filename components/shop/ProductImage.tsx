import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Product } from "@/lib/types/product";

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function isPlaceholderImage(src: string) {
  return !src || src.trim() === "";
}

export function ProductImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 50vw, 25vw",
  className = "",
}: ProductImageProps) {
  const placeholder = isPlaceholderImage(src);

  return (
    <div
      className={`relative aspect-square overflow-hidden bg-brand-cream ${className}`}
    >
      {placeholder ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-cream via-brand-white to-brand-sand p-6 text-brand-muted/50">
          <ImageIcon className="h-10 w-10" strokeWidth={1.2} aria-hidden />
          <span className="text-center font-shop text-[10px] uppercase tracking-[0.24em]">
            Image coming soon
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105 md:p-4"
        />
      )}
    </div>
  );
}

/** Convenience wrapper for Product objects */
export default function ProductImageFromProduct({
  product,
  ...props
}: Omit<ProductImageProps, "src" | "alt"> & { product: Product }) {
  return (
    <ProductImage src={product.image} alt={product.name} {...props} />
  );
}
