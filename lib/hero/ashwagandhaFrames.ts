import manifest from "@/lib/hero/ashwagandha-sequence.manifest.json";

export const ASHWAGANDHA_FRAME_WIDTH = manifest.width;
export const ASHWAGANDHA_FRAME_HEIGHT = manifest.height;
export const ASHWAGANDHA_FRAME_COUNT = manifest.frameCount;
export const ASHWAGANDHA_EXCLUDED_FRAME_INDICES = new Set(
  manifest.excludedFrameIndices ?? []
);

export const ASHWAGANDHA_FRAME_ANCHOR = {
  centerX: manifest.anchorCenterX,
  bottom: manifest.anchorBottom,
  frameWidth: manifest.width,
  frameHeight: manifest.height,
} as const;

export const ASHWAGANDHA_PLAYBACK_STEP = 1;
export const ASHWAGANDHA_SCROLL_VH_PER_FRAME = 2.8;

export function ashwagandhaScrollHeightForFrames(frameCount: number): number {
  return Math.round(frameCount * ASHWAGANDHA_SCROLL_VH_PER_FRAME + 45);
}

export interface AshwagandhaFrame {
  src: string;
  width: number;
  height: number;
}

export function buildAshwagandhaFrameSequence(): AshwagandhaFrame[] {
  const ext = manifest.format === "webp" ? "webp" : "png";
  const frames: AshwagandhaFrame[] = [];

  for (let i = 1; i <= ASHWAGANDHA_FRAME_COUNT; i += 1) {
    if (ASHWAGANDHA_EXCLUDED_FRAME_INDICES.has(i)) continue;
    const n = String(i).padStart(3, "0");
    frames.push({
      src: `${manifest.pathPrefix}${n}.${ext}`,
      width: ASHWAGANDHA_FRAME_WIDTH,
      height: ASHWAGANDHA_FRAME_HEIGHT,
    });
  }

  return frames;
}

export function buildAshwagandhaPlaybackSequence(
  step = ASHWAGANDHA_PLAYBACK_STEP
): AshwagandhaFrame[] {
  const all = buildAshwagandhaFrameSequence();
  if (all.length <= 12) return all;

  const picked = new Set<number>([0, all.length - 1]);
  for (let i = step; i < all.length - 1; i += step) {
    picked.add(i);
  }

  return [...picked]
    .sort((a, b) => a - b)
    .map((index) => all[index]);
}
