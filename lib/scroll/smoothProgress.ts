/** Frame-rate independent exponential smoothing toward a target (0–1). */
export function smoothToward(
  current: number,
  target: number,
  smoothness: number,
  deltaSeconds: number
): number {
  const t = 1 - Math.exp(-smoothness * 60 * deltaSeconds);
  return current + (target - current) * t;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Seconds elapsed since the last gsap.ticker frame. */
export function tickerDeltaSeconds(gsap: { ticker: { deltaRatio: () => number } }): number {
  return gsap.ticker.deltaRatio() / 60;
}

export function createScrollProgressSmoother(options?: {
  visualSmoothness?: number;
  mediaSmoothness?: number;
}) {
  let visual = 0;
  let media = 0;
  const visualRate = options?.visualSmoothness ?? 0.14;
  const mediaRate = options?.mediaSmoothness ?? 0.2;

  return {
    reset(value = 0) {
      visual = value;
      media = value;
    },
    step(target: number, deltaSeconds: number) {
      visual = smoothToward(visual, target, visualRate, deltaSeconds);
      media = smoothToward(media, target, mediaRate, deltaSeconds);
      return { visual, media, target };
    },
  };
}
