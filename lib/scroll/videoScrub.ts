export interface VideoScrubOptions {
  touchScroll?: boolean;
  seekThreshold?: number;
  seekMinIntervalMs?: number;
  seekUnlockMs?: number;
}

/** Coalesced video.currentTime updates for scroll-scrubbed films on touch devices. */
export function createVideoScrubSeeker(
  video: HTMLVideoElement,
  options: VideoScrubOptions = {}
) {
  const touchScroll = options.touchScroll ?? false;
  const SEEK_THRESHOLD =
    options.seekThreshold ?? (touchScroll ? 0.1 : 1 / 30);
  const SEEK_MIN_INTERVAL_MS =
    options.seekMinIntervalMs ?? (touchScroll ? 48 : 0);
  const SEEK_UNLOCK_MS = options.seekUnlockMs ?? (touchScroll ? 260 : 140);

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
      video.currentTime = clamped;
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
