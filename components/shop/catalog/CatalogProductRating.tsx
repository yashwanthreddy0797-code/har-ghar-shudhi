import { Star } from "lucide-react";
import { formatReviews } from "@/lib/types/product";

export default function CatalogProductRating({
  rating,
  reviewCount,
  className = "",
}: {
  rating: number;
  reviewCount: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : i < rating
                  ? "fill-amber-200 text-amber-400"
                  : "text-brand-border"
            }`}
            strokeWidth={0}
          />
        ))}
      </div>
      <span className="font-shop text-sm text-brand-text">
        {rating.toFixed(2)}
      </span>
      <span className="font-shop text-sm text-brand-muted" aria-hidden>
        |
      </span>
      <span className="font-shop text-sm text-brand-muted underline decoration-brand-border underline-offset-2">
        {formatReviews(reviewCount)} Review{reviewCount === 1 ? "" : "s"}
      </span>
    </div>
  );
}
