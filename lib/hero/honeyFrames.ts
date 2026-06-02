import manifest from "@/lib/hero/honey-sequence.manifest.json";

export const HONEY_FRAME_WIDTH = manifest.width;
export const HONEY_FRAME_HEIGHT = manifest.height;
export const HONEY_FRAME_COUNT = manifest.frameCount;
export const HONEY_EXCLUDED_FRAME_INDICES = new Set(
  manifest.excludedFrameIndices ?? []
);

export const HONEY_FRAME_ANCHOR = {
  centerX: manifest.anchorCenterX,
  bottom: manifest.anchorBottom,
  frameWidth: manifest.width,
  frameHeight: manifest.height,
} as const;

export const HONEY_PLAYBACK_STEP = 1;
export const HONEY_SCROLL_VH_PER_FRAME = 2.8;

export function honeyScrollHeightForFrames(frameCount: number): number {
  return Math.round(frameCount * HONEY_SCROLL_VH_PER_FRAME + 45);
}

export interface HoneyFrame {
  src: string;
  width: number;
  height: number;
}

export function buildHoneyFrameSequence(): HoneyFrame[] {
  const ext = manifest.format === "webp" ? "webp" : "png";
  const frames: HoneyFrame[] = [];

  for (let i = 1; i <= HONEY_FRAME_COUNT; i += 1) {
    if (HONEY_EXCLUDED_FRAME_INDICES.has(i)) continue;
    const n = String(i).padStart(3, "0");
    frames.push({
      src: `${manifest.pathPrefix}${n}.${ext}`,
      width: HONEY_FRAME_WIDTH,
      height: HONEY_FRAME_HEIGHT,
    });
  }

  return frames;
}

export function buildHoneyPlaybackSequence(
  step = HONEY_PLAYBACK_STEP
): HoneyFrame[] {
  const all = buildHoneyFrameSequence();
  if (all.length <= 12) return all;

  const picked = new Set<number>([0, all.length - 1]);
  for (let i = step; i < all.length - 1; i += step) {
    picked.add(i);
  }

  return [...picked]
    .sort((a, b) => a - b)
    .map((index) => all[index]);
}
