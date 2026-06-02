"use client";

import { type MutableRefObject } from "react";
import {
  CINEMATIC_ASSETS,
  VISUAL_SCENE_IDS,
  type VisualSceneId,
} from "./sceneConfig";

export interface CinematicStageRefs {
  layers: Record<VisualSceneId, HTMLDivElement | null>;
  heroGlow: HTMLDivElement | null;
  bottleProduct: HTMLDivElement | null;
  bottleSweep: HTMLDivElement | null;
  capsuleTop: HTMLDivElement | null;
  capsuleBottom: HTMLDivElement | null;
  herbLeaves: (HTMLDivElement | null)[];
  endingVignette: HTMLDivElement | null;
  endingProduct: HTMLDivElement | null;
}

export function createEmptyStageRefs(): CinematicStageRefs {
  return {
    layers: {
      hero: null,
      bottle: null,
      capsule: null,
      herbs: null,
      ending: null,
    },
    heroGlow: null,
    bottleProduct: null,
    bottleSweep: null,
    capsuleTop: null,
    capsuleBottom: null,
    herbLeaves: [],
    endingVignette: null,
    endingProduct: null,
  };
}

interface CinematicStageProps {
  stageRef: MutableRefObject<CinematicStageRefs>;
}

export default function CinematicStage({ stageRef }: CinematicStageProps) {
  const bindLayer = (id: VisualSceneId) => (el: HTMLDivElement | null) => {
    stageRef.current.layers[id] = el;
  };

  const bind =
    (key: Exclude<keyof CinematicStageRefs, "layers" | "herbLeaves">) =>
    (el: HTMLDivElement | null) => {
      stageRef.current[key] = el;
    };

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {VISUAL_SCENE_IDS.map((id, index) => (
        <div
          key={id}
          ref={bindLayer(id)}
          className="cinematic-visual-layer gpu-layer absolute inset-0"
          style={{ visibility: index === 0 ? "visible" : "hidden" }}
        >
          {id === "hero" && (
            <div className="flex h-full w-full items-center justify-center">
              <div
                ref={bind("heroGlow")}
                className="gpu-layer relative flex h-[min(72vh,640px)] w-[min(72vh,640px)] items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CINEMATIC_ASSETS.heroGlow}
                  alt=""
                  className="h-full w-full object-contain opacity-95"
                  draggable={false}
                />
              </div>
            </div>
          )}

          {id === "bottle" && (
            <div className="flex h-full w-full items-center justify-center px-6">
              <div
                ref={bind("bottleProduct")}
                className="gpu-layer relative w-[min(46vw,360px)] max-w-md"
                style={{ perspective: "900px" }}
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CINEMATIC_ASSETS.bottle}
                    alt=""
                    className="cinematic-product-image h-[min(62vh,560px)] w-full object-contain"
                    draggable={false}
                  />
                  <div
                    ref={bind("bottleSweep")}
                    className="cinematic-light-sweep absolute inset-0 rounded-2xl"
                  />
                </div>
              </div>
            </div>
          )}

          {id === "capsule" && (
            <div className="flex h-full w-full items-center justify-center px-6">
              <div className="relative h-[min(58vh,520px)] w-[min(40vw,320px)] max-w-sm">
                <div
                  ref={bind("capsuleTop")}
                  className="gpu-layer absolute left-0 right-0 top-0 z-[2] origin-bottom overflow-hidden"
                  style={{ height: "52%" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CINEMATIC_ASSETS.capsuleTop}
                    alt=""
                    className="cinematic-product-image h-[200%] w-full object-cover object-top"
                    draggable={false}
                  />
                </div>
                <div
                  ref={bind("capsuleBottom")}
                  className="gpu-layer absolute bottom-0 left-0 right-0 z-[1] origin-top overflow-hidden"
                  style={{ height: "52%" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CINEMATIC_ASSETS.capsuleBottom}
                    alt=""
                    className="cinematic-product-image h-[200%] w-full object-cover object-bottom"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          )}

          {id === "herbs" && (
            <div className="relative h-full w-full">
              {CINEMATIC_ASSETS.herbs.map((src, leafIndex) => {
                const positions = [
                  "left-[8%] top-[18%] w-[18vw] max-w-[140px]",
                  "right-[10%] top-[28%] w-[20vw] max-w-[160px]",
                  "left-[22%] bottom-[16%] w-[16vw] max-w-[130px]",
                  "right-[18%] bottom-[12%] w-[22vw] max-w-[170px]",
                ];
                return (
                  <div
                    key={src}
                    ref={(el) => {
                      stageRef.current.herbLeaves[leafIndex] = el;
                    }}
                    className={`gpu-layer absolute ${positions[leafIndex]}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="h-auto w-full object-contain opacity-90 drop-shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {id === "ending" && (
            <>
              <div
                ref={bind("endingVignette")}
                className="cinematic-ending-vignette absolute inset-0 opacity-0"
              />
              <div className="flex h-full w-full items-center justify-center px-6">
                <div
                  ref={bind("endingProduct")}
                  className="gpu-layer w-[min(38vw,300px)] max-w-sm"
                >
                    <div className="cinematic-product-frame relative overflow-hidden rounded-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={CINEMATIC_ASSETS.endingProduct}
                        alt=""
                        className="cinematic-product-image h-[min(50vh,440px)] w-full object-contain"
                        draggable={false}
                      />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
