import manifest from "@/lib/hero/moringa-sequence.manifest.json";

export const MORINGA_FRAME_WIDTH = manifest.width;
export const MORINGA_FRAME_HEIGHT = manifest.height;
export const MORINGA_FRAME_COUNT = manifest.frameCount;
export const MORINGA_EXCLUDED_FRAME_INDICES = new Set(
  manifest.excludedFrameIndices ?? []
);

export const MORINGA_FRAME_ANCHOR = {
  centerX: manifest.anchorCenterX,
  bottom: manifest.anchorBottom,
  frameWidth: manifest.width,
  frameHeight: manifest.height,
} as const;

/** Use every source frame except manifest exclusions (79 playback frames) */
export const MORINGA_PLAYBACK_STEP = 1;

/** Scroll runway per playback frame */
export const MORINGA_SCROLL_VH_PER_FRAME = 2.8;

/** Tail vh after last frame — keep low so the next section follows without a dead zone */
export const MORINGA_SCROLL_TAIL_VH = 6;

export function moringaScrollHeightForFrames(frameCount: number): number {
  return Math.round(frameCount * MORINGA_SCROLL_VH_PER_FRAME + MORINGA_SCROLL_TAIL_VH);
}

export interface MoringaFrame {
  src: string;
  width: number;
  height: number;
}

export function buildMoringaFrameSequence(): MoringaFrame[] {
  const ext = manifest.format === "webp" ? "webp" : "png";
  const frames: MoringaFrame[] = [];

  for (let i = 1; i <= MORINGA_FRAME_COUNT; i += 1) {
    if (MORINGA_EXCLUDED_FRAME_INDICES.has(i)) continue;
    const n = String(i).padStart(3, "0");
    frames.push({
      src: `${manifest.pathPrefix}${n}.${ext}`,
      width: MORINGA_FRAME_WIDTH,
      height: MORINGA_FRAME_HEIGHT,
    });
  }

  return frames;
}

/** Subsampled sequence for smooth scroll playback (~15–18 frames instead of 83) */
export function buildMoringaPlaybackSequence(
  step = MORINGA_PLAYBACK_STEP
): MoringaFrame[] {
  const all = buildMoringaFrameSequence();
  if (all.length <= 12) return all;

  const picked = new Set<number>([0, all.length - 1]);
  for (let i = step; i < all.length - 1; i += step) {
    picked.add(i);
  }

  return [...picked]
    .sort((a, b) => a - b)
    .map((index) => all[index]);
}
