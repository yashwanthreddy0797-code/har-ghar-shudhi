"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, ZoomIn } from "lucide-react";

export default function ProductImageGallery({
  images,
  alt,
  priority = false,
}: {
  images: string[];
  alt: string;
  priority?: boolean;
}) {
  const gallery = images.length ? images : [""];
  const [activeIndex, setActiveIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      const next = (index + gallery.length) % gallery.length;
      setActiveIndex(next);
    },
    [gallery.length]
  );

  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const thumb = strip.children[activeIndex] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomOpen, activeIndex, goTo]);

  const activeSrc = gallery[activeIndex];

  return (
    <>
      <div className="flex flex-col gap-2.5">
        <div className="group relative mx-auto w-full max-w-[300px] overflow-hidden rounded-xl border border-brand-border bg-brand-cream sm:max-w-[340px] lg:mx-0 lg:max-w-[380px] xl:max-w-[400px]">
          <div className="relative aspect-square w-full">
            {activeSrc ? (
              <Image
                src={activeSrc}
                alt={`${alt} — image ${activeIndex + 1}`}
                fill
                priority={priority && activeIndex === 0}
                sizes="(max-width: 1024px) 340px, 400px"
                className="object-contain p-3 transition-opacity duration-300 sm:p-4"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-shop text-xs uppercase tracking-[0.2em] text-brand-muted">
                Image coming soon
              </div>
            )}
          </div>

          <div className="absolute right-2 top-2 flex flex-col gap-1.5">
            <button
              type="button"
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => setWishlisted((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border/80 bg-white/95 text-brand-muted shadow-sm transition-colors hover:text-brand-green"
            >
              <Heart
                className={`h-3.5 w-3.5 ${wishlisted ? "fill-brand-green text-brand-green" : ""}`}
                strokeWidth={1.75}
              />
            </button>
            <button
              type="button"
              aria-label="Zoom image"
              onClick={() => setZoomOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border/80 bg-white/95 text-brand-muted shadow-sm transition-colors hover:text-brand-green"
            >
              <ZoomIn className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
          </div>

          {gallery.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => goTo(activeIndex - 1)}
                className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border/80 bg-white/95 text-brand-muted opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:text-brand-green"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => goTo(activeIndex + 1)}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border/80 bg-white/95 text-brand-muted opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:text-brand-green md:right-12"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : null}
        </div>

        {gallery.length > 1 ? (
          <div
            ref={thumbStripRef}
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {gallery.map((src, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  aria-label={`View image ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-md border-2 bg-brand-cream transition-colors sm:h-16 sm:w-16 ${
                    isActive
                      ? "border-brand-green"
                      : "border-brand-border hover:border-brand-green/40"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-1.5"
                  />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {zoomOpen && activeSrc ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Product image zoom"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            aria-label="Close zoom"
            className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 font-shop text-xs uppercase tracking-[0.16em] text-white"
            onClick={() => setZoomOpen(false)}
          >
            Close
          </button>
          {gallery.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(activeIndex - 1);
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(activeIndex + 1);
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}
          <div
            className="relative h-[min(85vh,720px)] w-[min(92vw,720px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeSrc}
              alt={alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
