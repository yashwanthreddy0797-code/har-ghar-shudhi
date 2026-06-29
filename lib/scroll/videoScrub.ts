export interface VideoScrubOptions {
  touchScroll?: boolean;
  seekThreshold?: number;
  seekMinIntervalMs?: number;
  seekUnlockMs?: number;
  /** Fire-and-forget rAF seeks — best for short homepage brand films and touch scrub. */
  performanceMode?: boolean;
}

function applyVideoTime(video: HTMLVideoElement, time: number) {
  if (!Number.isFinite(time)) return;
  try {
    if (
      "fastSeek" in video &&
      typeof (video as HTMLVideoElement & { fastSeek?: (t: number) => void })
        .fastSeek === "function"
    ) {
      (video as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(
        time
      );
      return;
    }
    video.currentTime = time;
  } catch {
    /* ignore seek races while metadata loads */
  }
}

function createPerformanceVideoScrubSeeker(
  video: HTMLVideoElement,
  seekThreshold: number
) {
  let pendingTime = 0;
  let lastApplied = -1;
  let seekRaf: number | undefined;

  const flush = () => {
    seekRaf = undefined;
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;

    const clamped = Math.max(0, Math.min(video.duration - 0.05, pendingTime));
    const delta = clamped - lastApplied;
    if (lastApplied >= 0 && Math.abs(delta) < seekThreshold) return;

    lastApplied = clamped;
    applyVideoTime(video, clamped);
  };

  return {
    setTargetTime(time: number) {
      if (!Number.isFinite(time)) return;
      pendingTime = time;
      if (seekRaf !== undefined) return;
      seekRaf = window.requestAnimationFrame(flush);
    },
    detach() {
      if (seekRaf !== undefined) window.cancelAnimationFrame(seekRaf);
      seekRaf = undefined;
    },
  };
}

/** Coalesced video.currentTime updates for scroll-scrubbed films on touch devices. */
export function createVideoScrubSeeker(
  video: HTMLVideoElement,
  options: VideoScrubOptions = {}
) {
  const touchScroll = options.touchScroll ?? false;
  const usePerformanceSeeker =
    options.performanceMode === true ||
    (options.performanceMode !== false && touchScroll);

  if (usePerformanceSeeker) {
    return createPerformanceVideoScrubSeeker(
      video,
      options.seekThreshold ?? (touchScroll ? 0.1 : 0.08)
    );
  }

  const SEEK_THRESHOLD =
    options.seekThreshold ?? 1 / 30;
  const SEEK_MIN_INTERVAL_MS = options.seekMinIntervalMs ?? 0;
  const SEEK_UNLOCK_MS = options.seekUnlockMs ?? 140;

  let targetTime = 0;
  let seeking = false;
  let lastSeekAt = 0;
  let seekUnlockTimer: number | undefined;
  let seekRaf: number | undefined;

  const releaseSeekLock = () => {
    seeking = false;
    if (seekUnlockTimer !== undefined) {
      window.clearTimeout(seekUnlockTimer);
      seekUnlockTimer = undefined;
    }
  };

  const seekToTarget = () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) {
      releaseSeekLock();
      return;
    }

    const clamped = Math.max(0, Math.min(video.duration - 0.04, targetTime));
    if (Math.abs(video.currentTime - clamped) < SEEK_THRESHOLD) {
      releaseSeekLock();
      return;
    }

    const now = performance.now();
    if (seeking && now - lastSeekAt < SEEK_MIN_INTERVAL_MS) {
      scheduleSeek();
      return;
    }

    seeking = true;
    lastSeekAt = now;
    if (seekUnlockTimer !== undefined) window.clearTimeout(seekUnlockTimer);
    seekUnlockTimer = window.setTimeout(releaseSeekLock, SEEK_UNLOCK_MS);

    try {
      applyVideoTime(video, clamped);
    } catch {
      releaseSeekLock();
    }
  };

  const scheduleSeek = () => {
    if (seekRaf !== undefined) return;
    seekRaf = window.requestAnimationFrame(() => {
      seekRaf = undefined;
      seekToTarget();
    });
  };

  const onSeeked = () => {
    releaseSeekLock();
    if (Math.abs(video.currentTime - targetTime) > SEEK_THRESHOLD) {
      scheduleSeek();
    }
  };

  video.addEventListener("seeked", onSeeked);

  return {
    setTargetTime(time: number) {
      if (!Number.isFinite(time)) return;
      targetTime = time;
      scheduleSeek();
    },
    detach() {
      video.removeEventListener("seeked", onSeeked);
      if (seekUnlockTimer !== undefined) window.clearTimeout(seekUnlockTimer);
      if (seekRaf !== undefined) window.cancelAnimationFrame(seekRaf);
      releaseSeekLock();
    },
  };
}
