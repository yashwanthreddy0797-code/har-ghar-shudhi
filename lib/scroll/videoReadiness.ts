/** True when the browser can paint at least one decoded video frame. */
export function isVideoFrameReady(video: HTMLVideoElement) {
  return (
    video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
    Number.isFinite(video.duration) &&
    video.duration > 0
  );
}

export function waitForVideoFirstFrame(
  video: HTMLVideoElement,
  timeoutMs = 8000
): Promise<boolean> {
  if (isVideoFrameReady(video)) return Promise.resolve(true);

  return Promise.race([
    new Promise<boolean>((resolve) => {
      const finish = (ok: boolean) => {
        video.removeEventListener("loadeddata", onProgress);
        video.removeEventListener("canplay", onProgress);
        video.removeEventListener("error", onError);
        resolve(ok);
      };

      const onProgress = () => {
        if (isVideoFrameReady(video)) finish(true);
      };

      const onError = () => finish(false);

      video.addEventListener("loadeddata", onProgress);
      video.addEventListener("canplay", onProgress);
      video.addEventListener("error", onError, { once: true });
      video.load();
    }),
    new Promise<boolean>((resolve) =>
      window.setTimeout(() => resolve(isVideoFrameReady(video)), timeoutMs)
    ),
  ]);
}

/** Warm a video URL in a detached element (used during the site intro). */
export function warmVideoAsset(src: string, timeoutMs = 4000): Promise<void> {
  return warmVideoToFirstFrame(src, timeoutMs).then(() => undefined);
}

/** Warm until at least one frame can paint — used for the homepage intro gate. */
export function warmVideoToFirstFrame(
  src: string,
  timeoutMs = 12000,
  onProgress?: (ratio: number) => void
): Promise<boolean> {
  if (typeof document === "undefined") return Promise.resolve(true);

  return Promise.race([
    new Promise<boolean>((resolve) => {
      const video = document.createElement("video");
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";

      const finish = (ok: boolean) => {
        cleanup();
        resolve(ok);
      };

      const report = () => {
        if (!onProgress) return;
        if (isVideoFrameReady(video)) {
          onProgress(1);
          return;
        }
        if (video.buffered.length > 0 && video.duration > 0) {
          const end = video.buffered.end(video.buffered.length - 1);
          onProgress(Math.min(0.92, end / video.duration));
        } else if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
          onProgress(0.2);
        }
      };

      const onFrameReady = () => {
        if (isVideoFrameReady(video)) finish(true);
      };

      const onError = () => finish(false);

      const cleanup = () => {
        video.removeEventListener("loadeddata", onFrameReady);
        video.removeEventListener("canplay", onFrameReady);
        video.removeEventListener("progress", report);
        video.removeEventListener("error", onError);
      };

      video.addEventListener("loadeddata", onFrameReady);
      video.addEventListener("canplay", onFrameReady);
      video.addEventListener("progress", report);
      video.addEventListener("error", onError, { once: true });
      video.src = src;
      video.load();
      report();
    }),
    new Promise<boolean>((resolve) =>
      window.setTimeout(() => resolve(false), timeoutMs)
    ),
  ]);
}
