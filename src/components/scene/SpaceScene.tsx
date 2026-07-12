"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { blackHoleFragmentShader, blackHoleVertexShader } from "./blackHoleShader";

type ScenePreset = {
  center: [number, number];
  exposure: number;
  intensity: number;
  scale: number;
};

const presets: Record<string, ScenePreset> = {
  profile: { center: [0.42, 0.015], exposure: 1.48, intensity: 1.2, scale: 1.44 },
  projects: { center: [0.04, 0], exposure: 1.64, intensity: 1.34, scale: 1.7 },
  trajectory: { center: [0.5, -0.1], exposure: 1.04, intensity: 0.72, scale: 0.92 },
  systems: { center: [-0.45, 0.08], exposure: 0.96, intensity: 0.62, scale: 0.82 },
  contact: { center: [0, -0.03], exposure: 1.28, intensity: 0.96, scale: 1.08 },
};

function BlackHoleField({
  activeSection,
  pointer,
  reducedMotion,
}: {
  activeSection: string;
  pointer: MutableRefObject<THREE.Vector2>;
  reducedMotion: boolean;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const smoothedPointer = useRef(new THREE.Vector2());
  const smoothedCenter = useRef(new THREE.Vector2(...presets.profile.center));
  const targetCenter = useRef(new THREE.Vector2(...presets.profile.center));
  const restingPointer = useRef(new THREE.Vector2());
  const smoothedScale = useRef(presets.profile.scale);
  const smoothedExposure = useRef(presets.profile.exposure);
  const smoothedIntensity = useRef(presets.profile.intensity);
  const { size } = useThree();
  const uniforms = useMemo(
    () => ({
      uCenter: { value: new THREE.Vector2(...presets.profile.center) },
      uExposure: { value: presets.profile.exposure },
      uIntensity: { value: presets.profile.intensity },
      uPointer: { value: new THREE.Vector2() },
      uQuality: { value: 1 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uScale: { value: presets.profile.scale },
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (!material.current) return;
    const preset = presets[activeSection] ?? presets.profile;
    const targetPointer = reducedMotion ? restingPointer.current : pointer.current;
    const response = 1 - Math.pow(0.001, delta);

    smoothedPointer.current.lerp(targetPointer, response * 0.58);
    targetCenter.current.set(...preset.center);
    smoothedCenter.current.lerp(targetCenter.current, response * 0.34);
    smoothedScale.current = THREE.MathUtils.lerp(smoothedScale.current, preset.scale, response * 0.3);
    smoothedExposure.current = THREE.MathUtils.lerp(smoothedExposure.current, preset.exposure, response * 0.28);
    smoothedIntensity.current = THREE.MathUtils.lerp(smoothedIntensity.current, preset.intensity, response * 0.28);

    const pixelRatio = state.gl.getPixelRatio();
    material.current.uniforms.uResolution.value.set(size.width * pixelRatio, size.height * pixelRatio);
    material.current.uniforms.uPointer.value.copy(smoothedPointer.current);
    material.current.uniforms.uCenter.value.copy(smoothedCenter.current);
    material.current.uniforms.uScale.value = smoothedScale.current;
    material.current.uniforms.uExposure.value = smoothedExposure.current;
    material.current.uniforms.uIntensity.value = smoothedIntensity.current;
    material.current.uniforms.uQuality.value = size.width < 720 ? 0.58 : 1;
    material.current.uniforms.uTime.value = reducedMotion ? 0 : state.clock.elapsedTime;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={blackHoleVertexShader}
        fragmentShader={blackHoleFragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export function SpaceScene({ activeSection }: { activeSection: string }) {
  const reducedMotion = Boolean(useReducedMotion());
  const pointer = useRef(new THREE.Vector2());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const updatePointer = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth - 0.5) * 2,
        -(event.clientY / window.innerHeight - 0.5) * 2,
      );
    };
    const resetPointer = () => pointer.current.set(0, 0);

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("blur", resetPointer);
    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("blur", resetPointer);
    };
  }, [reducedMotion]);

  return (
    <div
      className={`scene scene--${activeSection} ${ready ? "scene--ready" : ""}`}
      aria-hidden="true"
    >
      <div className="scene-fallback" />
      <Canvas
        dpr={[0.75, 1.35]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
        fallback={<div className="scene-webgl-fallback" />}
      >
        <BlackHoleField activeSection={activeSection} pointer={pointer} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
