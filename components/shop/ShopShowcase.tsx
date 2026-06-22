import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface CategoryCircle {
  label: string;
  href: string;
  image?: string;
}

interface BannerCard {
  label: string;
  href: string;
  image?: string;
}

const CATEGORY_CIRCLES: CategoryCircle[] = [
  { label: "Summer Essentials", href: "/shop" },
  { label: "Membership Deals", href: "/shop" },
  { label: "New Launches", href: "/shop" },
  { label: "Under \u20B9499", href: "/shop" },
  { label: "All Products", href: "/shop" },
  { label: "Under \u20B9999", href: "/shop" },
];

const HERO_BANNER: BannerCard = {
  label: "Featured Banner",
  href: "/shop",
};

const SIDE_BANNERS: BannerCard[] = [
  { label: "Promo Banner", href: "/shop" },
  { label: "Promo Banner", href: "/shop" },
];

function CirclePlaceholder({ image, label }: { image?: string; label: string }) {
  if (image) {
    return (
      <Image
        src={image}
        alt={label}
        fill
        sizes="(max-width: 768px) 30vw, 120px"
        className="object-cover"
      />
    );
  }
  return (
    <span className="text-brand-green/40">
      <ImageIcon className="h-6 w-6" strokeWidth={1.3} aria-hidden />
    </span>
  );
}

function BannerPlaceholder({
  card,
  className,
}: {
  card: BannerCard;
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
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
        {/* Category circles */}
        <ul className="grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-6 sm:gap-x-6">
          {CATEGORY_CIRCLES.map((cat) => (
            <li key={cat.label} className="flex flex-col items-center">
              <Link
                href={cat.href}
                className="group flex flex-col items-center text-center"
              >
                <span className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-full border border-brand-border bg-brand-cream transition-all duration-300 group-hover:border-brand-green/40 group-hover:shadow-[0_8px_24px_rgba(45,82,57,0.12)] sm:h-20 sm:w-20">
                  <CirclePlaceholder image={cat.image} label={cat.label} />
                </span>
                <span className="mt-3 max-w-[6.5rem] font-shop text-[11px] font-medium leading-tight tracking-[0.04em] text-brand-text transition-colors group-hover:text-brand-green">
                  {cat.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Banners: hero + two side cards */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.7fr_1fr]">
          <BannerPlaceholder
            card={HERO_BANNER}
            className="min-h-[260px] md:min-h-[340px]"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {SIDE_BANNERS.map((card, i) => (
              <BannerPlaceholder
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
