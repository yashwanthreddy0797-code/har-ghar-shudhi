"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Search,
  Star,
  User,
} from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog/types";
import {
  getProductReviewsBundle,
  ratingDistribution,
  type ProductReview,
} from "@/lib/catalog/productReviews";

const PAGE_SIZE = 3;

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
          }`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function SummaryStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 md:h-6 md:w-6 ${
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : i < rating
                ? "fill-amber-300 text-amber-400"
                : "text-gray-200"
          }`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <article className="border-b border-brand-border py-8 first:pt-0">
      <div className="flex items-start justify-between gap-4">
        <StarRow rating={review.rating} />
        <time
          dateTime={review.date}
          className="shrink-0 font-shop text-xs text-brand-muted"
        >
          {review.date}
        </time>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <User className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-shop text-sm font-semibold text-brand-text">
            {review.author}
          </span>
          {review.verified ? (
            <span className="inline-flex items-center gap-1 rounded-sm bg-brand-green-dark px-2 py-0.5 font-shop text-[10px] font-semibold uppercase tracking-wide text-white">
              <BadgeCheck className="h-3 w-3" strokeWidth={2} aria-hidden />
              Verified
            </span>
          ) : null}
        </div>
      </div>

      {review.title ? (
        <h3 className="mt-3 font-shop text-sm font-semibold text-brand-text">
          {review.title}
        </h3>
      ) : null}
      <p className="mt-2 font-body text-sm leading-relaxed text-brand-text/90">
        {review.body}
      </p>
    </article>
  );
}

export default function CatalogCustomerReviews({
  product,
}: {
  product: CatalogProduct;
}) {
  const bundle = getProductReviewsBundle(product.slug);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const distribution = useMemo(
    () => ratingDistribution(product.rating, product.reviewCount),
    [product.rating, product.reviewCount],
  );

  const filteredReviews = useMemo(() => {
    if (!bundle) return [];
    const q = query.trim().toLowerCase();
    return bundle.reviews.filter((review) => {
      const matchesTag =
        !activeTag ||
        review.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
      const matchesQuery =
        !q ||
        review.author.toLowerCase().includes(q) ||
        review.body.toLowerCase().includes(q) ||
        review.title?.toLowerCase().includes(q) ||
        review.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [bundle, query, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageReviews = filteredReviews.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  if (!bundle) return null;

  const maxBar = Math.max(...distribution, 1);

  return (
    <section
      aria-labelledby="customer-reviews-heading"
      className="border-b border-brand-border bg-brand-white px-4 py-10 sm:px-6 md:px-10 md:py-14"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="customer-reviews-heading"
          className="text-center font-display text-2xl font-medium tracking-[0.02em] text-brand-text md:text-[1.75rem]"
        >
          Customer Reviews
        </h2>

        <div className="mt-8 grid gap-8 border-b border-brand-border pb-8 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0">
          <div className="text-center md:border-r md:border-brand-border md:pr-8">
            <SummaryStars rating={product.rating} />
            <p className="mt-2 font-shop text-sm text-brand-text">
              <span className="font-semibold">{product.rating.toFixed(2)}</span>{" "}
              out of 5
            </p>
            <p className="mt-1 font-shop text-xs text-brand-muted">
              Based on {product.reviewCount} reviews
            </p>
          </div>

          <div className="space-y-2 md:px-10">
            {[5, 4, 3, 2, 1].map((stars, index) => {
              const count = distribution[index];
              const width = `${Math.round((count / maxBar) * 100)}%`;
              return (
                <div
                  key={stars}
                  className="grid grid-cols-[4.5rem_1fr_2rem] items-center gap-3"
                >
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < stars
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        }`}
                        strokeWidth={0}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-brand-green transition-all duration-300"
                      style={{ width: count > 0 ? width : "0%" }}
                    />
                  </div>
                  <span className="text-right font-shop text-xs text-brand-muted">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center md:justify-end md:border-l md:border-brand-border md:pl-8">
            <Link
              href={`/contact?subject=Product%20Review%20-%20${encodeURIComponent(product.name)}`}
              className="inline-flex items-center justify-center rounded-full bg-brand-green-dark px-8 py-3 font-shop text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-green"
            >
              Write a review
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <label className="relative block">
            <span className="sr-only">Search reviews</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search"
              className="w-full rounded-full border border-brand-border bg-white py-3 pl-5 pr-12 font-shop text-sm text-brand-text outline-none transition-colors placeholder:text-brand-muted/70 focus:border-brand-green"
            />
            <Search
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
              strokeWidth={1.5}
              aria-hidden
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-2">
            {bundle.tags.map((tag) => {
              const active =
                activeTag?.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setActiveTag(active ? null : tag);
                    setPage(1);
                  }}
                  className={[
                    "rounded-full border px-3 py-1.5 font-shop text-xs transition-colors",
                    active
                      ? "border-brand-green bg-brand-green-light text-brand-green-dark"
                      : "border-brand-border bg-white text-brand-text hover:border-brand-green/40",
                  ].join(" ")}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 border-b border-brand-border pb-4">
          <span className="font-shop text-sm text-brand-text">Most Recent</span>
          <ChevronDown className="h-4 w-4 text-brand-muted" aria-hidden />
        </div>

        <div>
          {pageReviews.length > 0 ? (
            pageReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <p className="py-10 text-center font-shop text-sm text-brand-muted">
              No reviews match your search.
            </p>
          )}
        </div>

        {totalPages > 1 ? (
          <nav
            aria-label="Reviews pagination"
            className="mt-6 flex items-center justify-center gap-1 border-t border-brand-border pt-6"
          >
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              aria-label="Previous page"
              className="rounded p-2 text-brand-muted transition-colors hover:text-brand-text disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-current={n === safePage ? "page" : undefined}
                  className={[
                    "min-w-[2rem] px-2 py-1 font-shop text-sm transition-colors",
                    n === safePage
                      ? "font-semibold text-brand-text"
                      : "text-brand-muted hover:text-brand-text",
                  ].join(" ")}
                >
                  {n}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              aria-label="Next page"
              className="rounded p-2 text-brand-muted transition-colors hover:text-brand-text disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              disabled={safePage >= totalPages}
              aria-label="Last page"
              className="rounded p-2 text-brand-muted transition-colors hover:text-brand-text disabled:opacity-30"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
