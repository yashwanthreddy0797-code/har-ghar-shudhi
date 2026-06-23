import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import FeaturedBannerCarousel from "@/components/shop/FeaturedBannerCarousel";

interface PromoBanner {
  label: string;
  href: string;
  image?: string;
}

const SIDE_BANNERS: PromoBanner[] = [
  { label: "Promo Banner", href: "/shop" },
  { label: "Promo Banner", href: "/shop" },
];

function PromoBannerCard({
  card,
  className,
}: {
  card: PromoBanner;
  className: string;
}) {
  return (
    <Link
      href={card.href}
      aria-label={card.label}
      className={`group relative flex items-center justify-center overflow-hidden rounded-2xl border border-brand-border bg-gradient-to-br from-brand-cream via-brand-white to-brand-sand shadow-[0_8px_30px_rgba(45,82,57,0.06)] transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(45,82,57,0.12)] ${className}`}
    >
      {card.image ? (
        <Image
          src={card.image}
          alt={card.label}
          fill
          unoptimized
          sizes="(max-width: 1024px) 50vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <span className="flex flex-col items-center gap-2 text-brand-muted/50">
          <ImageIcon className="h-8 w-8" strokeWidth={1.2} aria-hidden />
          <span className="font-shop text-[10px] uppercase tracking-[0.24em]">
            {card.label}
          </span>
        </span>
      )}
    </Link>
  );
}

export default function ShopShowcase() {
  return (
    <section className="border-b border-brand-border bg-brand-white px-6 py-10 md:px-12 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
          <FeaturedBannerCarousel className="h-full" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {SIDE_BANNERS.map((card, i) => (
              <PromoBannerCard
                key={i}
                card={card}
                className="min-h-[150px] md:min-h-[160px] lg:min-h-[162px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
