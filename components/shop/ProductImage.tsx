import Image from "next/image";
import type { Product } from "@/lib/types/product";

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function ProductImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 50vw, 25vw",
  className = "",
}: ProductImageProps) {
  return (
    <div
      className={`relative aspect-square overflow-hidden bg-brand-cream ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105 md:p-4"
      />
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
