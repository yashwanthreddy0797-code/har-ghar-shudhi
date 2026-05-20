"use client";

import { type RefObject, useEffect } from "react";
import type gsap from "gsap";

/**
 * Cinematic scroll-influenced playback — partial sync, drift, rare seeks.
 * Video glides behind scroll-driven overlays for premium perceived smoothness.
 */
export function useScrollDrivenVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  timelineRef: RefObject<gsap.core.Timeline | null>
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let duration = 0;
    let driftTarget = 0;
    let playbackProgress = 0;
    let lastScrollProgress = 0;
    let rafId = 0;
    let running = false;
    let lastSeekAt = 0;
    let lastSeekTime = -1;
    let ready = false;

    /** How quickly narrative intent follows scroll (lower = more drift) */
    const DRIFT_LERP = 0.042;
    /** How quickly video glides toward drift (filmic catch-up) */
    const PLAYBACK_LERP_MIN = 0.038;
    const PLAYBACK_LERP_MAX = 0.072;
    /** Partial influence — video never fully mirrors scroll 1:1 */
    const SCROLL_INFLUENCE = 0.88;
    const SCROLL_DEADZONE = 0.004;
    /** Rare, perceptually smooth seeks */
    const SEEK_THRESHOLD_SEC = 0.11;
    const SEEK_INTERVAL_MS = 90;
    const PROGRESS_DEADZONE = 0.006;

    const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

    const easeMomentum = (gap: number) =>
      Math.min(
        PLAYBACK_LERP_MAX,
        PLAYBACK_LERP_MIN + Math.abs(gap) * 0.12
      );

    const applySeek = (time: number, scrolling: boolean) => {
      if (!duration) return;
      const clamped = Math.max(0, Math.min(time, duration - 0.05));
      const deltaSec = Math.abs(clamped - lastSeekTime);
      const threshold = scrolling ? 0.085 : SEEK_THRESHOLD_SEC;
      const interval = scrolling ? 72 : SEEK_INTERVAL_MS;

      if (lastSeekTime >= 0 && deltaSec < threshold) return;

      const now = performance.now();
      if (now - lastSeekAt < interval) return;

      const v = video as HTMLVideoElement & {
        fastSeek?: (time: number) => void;
      };

      if (typeof v.fastSeek === "function") {
        try {
          v.fastSeek(clamped);
        } catch {
          video.currentTime = clamped;
        }
      } else {
        video.currentTime = clamped;
      }

      lastSeekTime = clamped;
      lastSeekAt = now;
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);

      const timeline = timelineRef.current;
      const st = timeline?.scrollTrigger;

      if (!ready || !duration || !timeline || !st) return;

      const inStory =
        st.isActive || (st.progress > 0.002 && st.progress < 0.998);

      if (!inStory) {
        video.pause();
        video.playbackRate = 1;
        return;
      }

      const scrollProgress = timeline.progress();
      const scrollVelocity = scrollProgress - lastScrollProgress;
      lastScrollProgress = scrollProgress;

      /* Partial scroll influence — softened narrative target */
      const influencedScroll =
        scrollProgress * SCROLL_INFLUENCE +
        playbackProgress * (1 - SCROLL_INFLUENCE);

      if (Math.abs(influencedScroll - driftTarget) > SCROLL_DEADZONE) {
        const driftRate =
          DRIFT_LERP + Math.min(Math.abs(scrollVelocity) * 0.35, 0.025);
        driftTarget = lerp(driftTarget, influencedScroll, driftRate);
      }

      /* Cinematic glide — playback eases toward drift, never snaps */
      const gap = driftTarget - playbackProgress;
      if (Math.abs(gap) > PROGRESS_DEADZONE) {
        playbackProgress = lerp(
          playbackProgress,
          driftTarget,
          easeMomentum(gap)
        );
      }

      /* Soft playback assist for micro gaps — avoids decoder spikes */
      const softGap = driftTarget - playbackProgress;
      if (
        Math.abs(softGap) > PROGRESS_DEADZONE &&
        Math.abs(softGap) < 0.055 &&
        Math.abs(scrollVelocity) < 0.008
      ) {
        video.playbackRate = Math.max(
          0.55,
          Math.min(1.25, 0.85 + softGap * 4)
        );
        if (video.paused) {
          video.play().catch(() => undefined);
        }
        playbackProgress = video.currentTime / duration;
      } else {
        video.pause();
        video.playbackRate = 1;
        applySeek(
          playbackProgress * duration,
          Math.abs(scrollVelocity) > 0.0015
        );
      }
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const onReady = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      duration = video.duration;
      ready = true;
      video.pause();
      video.playbackRate = 1;
      video.currentTime = 0;
      driftTarget = 0;
      playbackProgress = 0;
      lastSeekTime = -1;
      startLoop();
    };

    video.muted = true;
    video.playsInline = true;
    video.loop = false;
    video.autoplay = false;
    video.preload = "auto";
    video.pause();

    if (video.readyState >= 1) onReady();
    else video.addEventListener("loadedmetadata", onReady, { once: true });

    const onVisibility = () => {
      if (document.visibilityState === "hidden") stopLoop();
      else if (ready) startLoop();
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      video.removeEventListener("loadedmetadata", onReady);
      video.pause();
      stopLoop();
    };
  }, [videoRef, timelineRef]);
}
