"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function seeded(index: number, offset: number) {
  const value = Math.sin(index * 12.9898 + offset * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function StarField() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 1500;
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      values[i * 3] = (seeded(i, 1) - 0.5) * 38;
      values[i * 3 + 1] = (seeded(i, 2) - 0.5) * 25;
      values[i * 3 + 2] = -seeded(i, 3) * 34;
    }
    return values;
  }, []);
  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.003;
    points.current.position.x = THREE.MathUtils.lerp(points.current.position.x, state.pointer.x * 0.3, 0.02);
    points.current.position.y = THREE.MathUtils.lerp(points.current.position.y, state.pointer.y * 0.18, 0.02);
  });
  return <Points ref={points} positions={positions} stride={3} frustumCulled={false}><PointMaterial transparent color="#c9e7ef" size={0.035} sizeAttenuation depthWrite={false} opacity={0.72} /></Points>;
}

function Singularity({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.z -= delta * (active ? 0.06 : 0.018);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.98 + state.pointer.y * 0.05, 0.02);
    const scale = THREE.MathUtils.lerp(group.current.scale.x, active ? 1.35 : 0.9, 0.02);
    group.current.scale.setScalar(scale);
  });
  return <group ref={group} position={[2.8, 0, -8]} rotation={[0.98, 0, 0]}>
    <mesh><sphereGeometry args={[1.35, 64, 64]} /><meshBasicMaterial color="#000" /></mesh>
    <mesh><ringGeometry args={[1.5, 4.6, 160]} /><meshBasicMaterial color="#7346d9" transparent opacity={active ? 0.24 : 0.1} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
    <mesh><torusGeometry args={[1.58, 0.025, 12, 180]} /><meshBasicMaterial color="#65ddff" transparent opacity={0.68} /></mesh>
    <pointLight color="#6adfff" intensity={active ? 4 : 1.6} distance={12} />
  </group>;
}

function Scene({ activeSection }: { activeSection: string }) {
  return <><color attach="background" args={["#030508"]} /><fog attach="fog" args={["#030508", 14, 38]} /><ambientLight intensity={0.12} /><StarField /><Singularity active={activeSection === "projects"} /></>;
}

export function SpaceScene({ activeSection }: { activeSection: string }) {
  return <div className={`scene ${activeSection === "projects" ? "scene--projects" : ""}`} aria-hidden="true"><Canvas camera={{ position: [0, 0, 12], fov: 42, near: 0.1, far: 60 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}><Scene activeSection={activeSection} /></Canvas></div>;
}
