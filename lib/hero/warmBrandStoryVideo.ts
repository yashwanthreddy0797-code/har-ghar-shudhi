"use client";

import { BRAND_STORY_VIDEO_SCROLL } from "@/lib/hero/brandStoryVideoScrollConfig";
import { preloadVideoAsset } from "@/lib/scroll/preloadMedia";
import {
  isVideoFrameReady,
  warmVideoToFirstFrame,
} from "@/lib/scroll/videoReadiness";

let warmStarted = false;

/** Prime the brand-story scrub film as soon as the homepage bundle loads. */
export function startBrandStoryVideoWarm() {
  if (typeof window === "undefined" || warmStarted) return;
  warmStarted = true;

  const { src, videoStartTime = 0 } = BRAND_STORY_VIDEO_SCROLL;
  preloadVideoAsset(src);

  const warmPromise = warmVideoToFirstFrame(src, 20000).then((ready) => {
    if (!ready || videoStartTime <= 0) return ready;

    return new Promise<boolean>((resolve) => {
      const video = document.createElement("video");
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.src = src;

      const finish = (ok: boolean) => {
        video.removeEventListener("loadeddata", onReady);
        video.removeEventListener("seeked", onReady);
        video.removeEventListener("error", onError);
        resolve(ok);
      };

      const onReady = () => {
        if (!isVideoFrameReady(video)) return;
        if (Math.abs(video.currentTime - videoStartTime) < 0.05) {
          finish(true);
          return;
        }
        try {
          video.currentTime = videoStartTime;
        } catch {
          finish(isVideoFrameReady(video));
        }
      };

      const onError = () => finish(false);

      video.addEventListener("loadeddata", onReady);
      video.addEventListener("seeked", onReady);
      video.addEventListener("error", onError, { once: true });
      video.load();
    });
  });

  window.__heroWarmPromises = {
    ...window.__heroWarmPromises,
    brandStory: warmPromise,
  };
}
