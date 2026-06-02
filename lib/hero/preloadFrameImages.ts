/** Preload frame URLs into decoded Image objects (eliminates blink on swap). */
export async function preloadFrameImages(
  urls: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  const total = urls.length;
  let loaded = 0;

  const loadOne = (src: string) =>
    new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.decoding = "async";
      const finish = () => {
        loaded += 1;
        onProgress?.(loaded, total);
        resolve(img);
      };
      img.onload = () => {
        if (typeof img.decode === "function") {
          img.decode().then(finish).catch(finish);
        } else {
          finish();
        }
      };
      img.onerror = finish;
      img.src = src;
    });

  // Load in batches so we don't choke the network / main thread
  const batchSize = 12;
  const results: HTMLImageElement[] = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(loadOne));
    results.push(...batchResults);
  }
  return results;
}

export interface FrameDrawAnchor {
  centerX: number;
  bottom: number;
  frameWidth: number;
  frameHeight: number;
}

/** Draw a pre-aligned frame so the jar anchor sits at bottom-center of the canvas. */
export function drawFrameToCanvas(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasCssWidth: number,
  canvasCssHeight: number,
  anchor?: FrameDrawAnchor,
  displayScale = 1
) {
  const frameWidth = anchor?.frameWidth ?? img.width;
  const frameHeight = anchor?.frameHeight ?? img.height;
  const centerX = anchor?.centerX ?? frameWidth / 2;
  const bottom = anchor?.bottom ?? frameHeight;

  const fitScale = Math.min(
    canvasCssWidth / frameWidth,
    canvasCssHeight / frameHeight
  );
  const scale = fitScale * displayScale;
  const w = Math.round(frameWidth * scale);
  const h = Math.round(frameHeight * scale);
  const x = Math.round(canvasCssWidth / 2 - centerX * scale);
  const y = Math.round(canvasCssHeight - bottom * scale);

  ctx.clearRect(0, 0, canvasCssWidth, canvasCssHeight);
  ctx.drawImage(img, x, y, w, h);
}

export function sizeHeroCanvas(
  canvas: HTMLCanvasElement,
  container: HTMLElement
): CanvasRenderingContext2D | null {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return null;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const { width, height } = container.getBoundingClientRect();
  if (width <= 0 || height <= 0) return ctx;

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}
