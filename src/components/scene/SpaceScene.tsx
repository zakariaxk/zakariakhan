"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { projects } from "@/data/portfolio";

type SceneProps = { entered: boolean; activeSection: string; selectedProject: string | null };

function seededValue(index: number, offset: number) {
  const value = Math.sin(index * 12.9898 + offset * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function StarField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 8 + seededValue(i, 1) * 28;
      const theta = seededValue(i, 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededValue(i, 3) - 1);
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      values[i * 3 + 2] = radius * Math.cos(phi) - 8;
    }
    return values;
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.004;
    points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, state.pointer.y * 0.025, 0.025);
    points.current.rotation.y = THREE.MathUtils.lerp(points.current.rotation.y, state.pointer.x * 0.035, 0.02);
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#cad9dc" size={0.028} sizeAttenuation depthWrite={false} opacity={0.68} />
    </Points>
  );
}

function BlackHole({ entered }: { entered: boolean }) {
  const system = useRef<THREE.Group>(null);
  const disc = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!system.current || !disc.current) return;
    system.current.rotation.y += delta * 0.025;
    system.current.rotation.x = THREE.MathUtils.lerp(
      system.current.rotation.x,
      0.14 + state.pointer.y * 0.035,
      0.025,
    );
    system.current.rotation.z = THREE.MathUtils.lerp(system.current.rotation.z, state.pointer.x * 0.025, 0.02);
    disc.current.rotation.z -= delta * 0.055;
    const targetScale = entered ? 1 : 0.48;
    const nextScale = THREE.MathUtils.lerp(system.current.scale.x, targetScale, 0.018);
    system.current.scale.setScalar(nextScale);
  });

  return (
    <group ref={system} rotation={[0.14, 0, 0]} scale={0.48}>
      <mesh>
        <sphereGeometry args={[1.45, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      <mesh ref={disc} rotation={[Math.PI / 2.42, 0, 0]}>
        <ringGeometry args={[1.57, 4.9, 160]} />
        <meshBasicMaterial color="#b38950" transparent opacity={0.22} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2.42, 0, 0]}>
        <ringGeometry args={[1.68, 3.45, 160]} />
        <meshBasicMaterial color="#e3d2a9" transparent opacity={0.31} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2.42, 0, 0]}>
        <torusGeometry args={[1.6, 0.018, 12, 160]} />
        <meshBasicMaterial color="#f7e8c5" transparent opacity={0.8} />
      </mesh>

      {[2.25, 2.7, 3.4].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2 + 0.06 * index, 0.08 * index, 0]}>
          <torusGeometry args={[radius, index === 0 ? 0.012 : 0.008, 6, 128, Math.PI * (1.24 + index * 0.18)]} />
          <meshBasicMaterial color={index === 0 ? "#9ab4ba" : "#6f7d7f"} transparent opacity={0.34 - index * 0.06} />
        </mesh>
      ))}

      <group rotation={[0.18, 0.15, 0]}>
        {[0, 1, 2, 3].map((index) => (
          <mesh key={index} rotation={[0, 0, (Math.PI / 2) * index]} position={[0, 0, -0.1]}>
            <boxGeometry args={[0.08, 7.4, 0.06]} />
            <meshStandardMaterial color="#1b2222" metalness={0.85} roughness={0.58} transparent opacity={0.54} />
          </mesh>
        ))}
      </group>
      <pointLight color="#c8a26c" intensity={3.4} distance={8} decay={2.2} />
    </group>
  );
}

function Debris() {
  const fragments = useMemo(
    () => Array.from({ length: 26 }, (_, index) => ({
      position: [
        Math.sin(index * 2.17) * (3.6 + (index % 5) * 0.52),
        Math.cos(index * 1.63) * (2.4 + (index % 4) * 0.4),
        -1.8 + (index % 7) * 0.38,
      ] as [number, number, number],
      scale: 0.025 + (index % 4) * 0.017,
      speed: 0.3 + (index % 5) * 0.08,
    })),
    [],
  );
  return (
    <group>
      {fragments.map((fragment, index) => (
        <Float key={index} speed={fragment.speed} rotationIntensity={0.8} floatIntensity={0.25}>
          <mesh position={fragment.position} scale={fragment.scale} rotation={[index, index * 0.5, index * 0.25]}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#485052" metalness={0.7} roughness={0.72} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ProjectConstellation({ visible, selectedProject }: { visible: boolean; selectedProject: string | null }) {
  const group = useRef<THREE.Group>(null);
  const linePositions = useMemo(() => {
    const values: number[] = [];
    projects.forEach((project, index) => {
      const next = projects[(index + 1) % projects.length];
      values.push(...project.position, ...next.position);
    });
    return new Float32Array(values);
  }, []);

  useFrame(() => {
    if (!group.current) return;
    const target = visible ? 1 : 0;
    const nextScale = THREE.MathUtils.lerp(group.current.scale.x, target, 0.045);
    group.current.scale.setScalar(nextScale);
    group.current.visible = group.current.scale.x > 0.01;
  });

  return (
    <group ref={group} scale={0} position={[0, 0, 0.6]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#6f868c" transparent opacity={0.15} />
      </lineSegments>
      {projects.map((project) => {
        const selected = project.id === selectedProject;
        return (
          <group key={project.id} position={project.position}>
            <mesh scale={selected ? 1.8 : project.featured ? 1.2 : 0.78}>
              <sphereGeometry args={[0.085, 20, 20]} />
              <meshBasicMaterial color={selected ? "#f0d4a0" : project.featured ? "#bd9b63" : "#70888d"} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} scale={selected ? 1.5 : 1}>
              <torusGeometry args={[project.featured ? 0.23 : 0.17, 0.008, 6, 48]} />
              <meshBasicMaterial color={project.featured ? "#bd9b63" : "#70888d"} transparent opacity={selected ? 0.9 : 0.38} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function CameraRig({ entered, activeSection, selectedProject }: SceneProps) {
  useFrame((state) => {
    const sectionDepth: Record<string, number> = {
      hero: 10.5,
      about: 11.2,
      projects: 9.8,
      experience: 12,
      skills: 11.5,
      contact: 13,
    };
    const selected = projects.find((project) => project.id === selectedProject);
    const targetZ = entered ? sectionDepth[activeSection] ?? 10.5 : 18;
    const camera = state.camera;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, entered ? 0.018 : 0.008);
    const selectedX = activeSection === "projects" && selected ? selected.position[0] * 0.16 : 0;
    const selectedY = activeSection === "projects" && selected ? selected.position[1] * 0.14 : 0;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, selectedX + state.pointer.x * 0.22, selected ? 0.04 : 0.018);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, selectedY + state.pointer.y * 0.14, selected ? 0.04 : 0.018);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ entered, activeSection, selectedProject }: SceneProps) {
  const count = typeof window !== "undefined" && window.innerWidth < 768 ? 850 : 1900;
  return (
    <>
      <color attach="background" args={["#020405"]} />
      <fog attach="fog" args={["#020405", 13, 36]} />
      <ambientLight intensity={0.16} color="#72858a" />
      <directionalLight position={[6, 5, 8]} intensity={0.42} color="#a9bec0" />
      <StarField count={count} />
      <BlackHole entered={entered} />
      <Debris />
      <ProjectConstellation visible={activeSection === "projects"} selectedProject={selectedProject} />
      <CameraRig entered={entered} activeSection={activeSection} selectedProject={selectedProject} />
    </>
  );
}

export function SpaceScene(props: SceneProps) {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 42, near: 0.1, far: 80 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Scene {...props} />
      </Canvas>
    </div>
  );
}
