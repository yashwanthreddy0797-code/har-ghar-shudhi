const preloadedVideos = new Set<string>();
const preloadedImages = new Set<string>();

/** Hint the browser + warm the HTTP cache for scroll-scrubbed hero videos. */
export function preloadVideoAsset(src: string) {
  if (typeof document === "undefined" || preloadedVideos.has(src)) return;
  preloadedVideos.add(src);

  const linkId = `preload-video-${src}`;
  if (!document.getElementById(linkId)) {
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "preload";
    link.as = "video";
    link.href = src;
    link.setAttribute("fetchpriority", "high");
    document.head.appendChild(link);
  }

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
