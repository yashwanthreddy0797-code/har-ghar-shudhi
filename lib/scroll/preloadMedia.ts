const preloadedVideos = new Set<string>();
const preloadedImages = new Set<string>();

/**
 * Warm the HTTP cache for a scroll-scrubbed hero video.
 *
 * Note: `<link rel="preload" as="video">` is NOT a valid preload type — browsers
 * reject it ("unsupported `as` value") and fetch nothing. The reliable way to
 * prime the cache is a muted, detached `<video preload="auto">`, which shares the
 * download with the inline player via the HTTP cache.
 */
export function preloadVideoAsset(src: string) {
  if (typeof document === "undefined" || preloadedVideos.has(src)) return;
  preloadedVideos.add(src);

  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.playsInline = true;
  video.src = src;
  video.load();
}

export function preloadImageAsset(src: string) {
  if (typeof document === "undefined" || preloadedImages.has(src)) return;
  preloadedImages.add(src);

  const img = new Image();
  img.decoding = "async";
  img.src = src;
}
