"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/moringa-container.glb";
/** Tripo export puts the label on +X; camera sits on +Z, so rotate -90° on Y. */
const LABEL_FRONT_Y = -Math.PI / 2;

useGLTF.preload(MODEL_PATH);

interface MoringaJarProps {
  progress: number;
}

function MoringaJar({ progress }: MoringaJarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);
  const model = useMemo(() => scene.clone(true), [scene]);
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return 2.35 / maxDim;
  }, [model]);

  useLayoutEffect(() => {
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [model]);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const y = THREE.MathUtils.lerp(-1.35, 1.35, progress);
    const scrollTiltY = THREE.MathUtils.lerp(-0.06, 0.06, progress);
    const rotX = THREE.MathUtils.lerp(0.02, -0.04, progress);

    group.position.y = y;
    group.rotation.y = scrollTiltY;
    group.rotation.x = rotX;
  }, [progress]);

  return (
    <group ref={groupRef} scale={scale}>
      <Center>
        <group rotation={[0, LABEL_FRONT_Y, 0]}>
          <primitive object={model} />
        </group>
      </Center>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.35}
        color="#fff8eb"
        castShadow
      />
      <directionalLight position={[-5, 2, -3]} intensity={0.45} color="#8fd4b0" />
      <spotLight
        position={[0, 5, 2]}
        angle={0.45}
        penumbra={0.8}
        intensity={0.9}
        color="#d4af6a"
      />
    </>
  );
}

interface MoringaModelSceneProps {
  progress: number;
  className?: string;
}

export default function MoringaModelScene({
  progress,
  className = "",
}: MoringaModelSceneProps) {
  return (
    <div className={`moringa-model-canvas-wrap ${className}`}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.2, 4.8], fov: 36, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <Environment preset="studio" environmentIntensity={0.35} />
          <MoringaJar progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
