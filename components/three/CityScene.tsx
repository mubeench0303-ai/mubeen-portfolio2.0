"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import CameraRig from "./CameraRig";
import { useScrollProgressRef } from "@/lib/useScrollProgressRef";
import { getState } from "@/lib/gameStore";
import { openMission, setAiming } from "@/lib/events";
import { missions, profile } from "@/lib/data";

const NEON = ["#ff2e93", "#3be8ff", "#ffd400", "#a5f70a", "#8a2be2"];
type Quality = "high" | "low";

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── procedural lit-window texture ── */
function makeWindowsTexture(seed: number) {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#05060c";
  ctx.fillRect(0, 0, c.width, c.height);
  const cols = 4;
  const rows = 10;
  const pad = 4;
  const cw = (c.width - pad * (cols + 1)) / cols;
  const ch = (c.height - pad * (rows + 1)) / rows;
  const rand = mulberry32(seed);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (rand() > 0.45) {
        ctx.fillStyle = NEON[Math.floor(rand() * NEON.length)];
        ctx.globalAlpha = 0.5 + rand() * 0.5;
      } else {
        ctx.fillStyle = "#0c1120";
        ctx.globalAlpha = 1;
      }
      ctx.fillRect(pad + x * (cw + pad), pad + y * (ch + pad), cw, ch);
    }
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/* ── neon sign texture ── */
function makeTextTexture(text: string, color: string, sub?: string) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, 512, 256);
  ctx.fillStyle = "rgba(5,6,12,0.55)";
  ctx.fillRect(0, 0, 512, 256);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = color;
  ctx.shadowBlur = 34;
  ctx.fillStyle = color;
  ctx.font = "bold 92px Impact, sans-serif";
  ctx.fillText(text.toUpperCase(), 256, sub ? 108 : 128);
  if (sub) {
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#ffffff";
    ctx.font = "28px monospace";
    ctx.fillText(sub.toUpperCase(), 256, 186);
  }
  return new THREE.CanvasTexture(c);
}

function NeonSign({
  text,
  sub,
  color,
  position,
  scale = [8, 4, 1],
}: {
  text: string;
  sub?: string;
  color: string;
  position: [number, number, number];
  scale?: [number, number, number];
}) {
  const tex = useMemo(() => makeTextTexture(text, color, sub), [text, color, sub]);
  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} transparent toneMapped={false} />
    </mesh>
  );
}

type BData = {
  pos: [number, number, number];
  scale: [number, number, number];
  tex: THREE.Texture;
  emissive: string;
};

function Buildings({ quality }: { quality: Quality }) {
  const textures = useMemo(
    () => Array.from({ length: 6 }, (_, i) => makeWindowsTexture(i * 37 + 11)),
    []
  );
  const buildings = useMemo<BData[]>(() => {
    const arr: BData[] = [];
    const rand = mulberry32(1234);
    const gap = quality === "low" ? 11 : 6.5;
    for (let z = 6; z > -150; z -= gap) {
      [-1, 1].forEach((side) => {
        const w = 3 + rand() * 3;
        const d = 3 + rand() * 3;
        const h = 6 + rand() * 34;
        const x = side * (7 + rand() * 6);
        arr.push({
          pos: [x, h / 2 - 0.5, z + (rand() - 0.5) * 3],
          scale: [w, h, d],
          tex: textures[Math.floor(rand() * textures.length)],
          emissive: NEON[Math.floor(rand() * NEON.length)],
        });
      });
    }
    return arr;
  }, [textures, quality]);

  return (
    <group>
      {buildings.map((b, i) => (
        <mesh key={i} position={b.pos} scale={b.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#0a0d18"
            emissive={b.emissive}
            emissiveIntensity={0.6}
            emissiveMap={b.tex}
            roughness={0.6}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── clickable mission tower ── */
function MissionBuilding({
  mission,
  position,
  color,
  interactive,
}: {
  mission: (typeof missions)[number];
  position: [number, number, number];
  color: string;
  interactive: boolean;
}) {
  const [hover, setHover] = useState(false);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const tex = useMemo(() => makeWindowsTexture(mission.id.length * 91 + 5), [mission.id]);

  useFrame((_, dt) => {
    if (matRef.current) {
      matRef.current.emissiveIntensity = THREE.MathUtils.damp(
        matRef.current.emissiveIntensity,
        hover ? 1.6 : 0.6,
        4,
        dt
      );
    }
  });

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        if (!interactive) return;
        e.stopPropagation();
        setHover(true);
        setAiming(true);
      }}
      onPointerOut={() => {
        if (!interactive) return;
        setHover(false);
        setAiming(false);
      }}
      onClick={(e) => {
        if (!interactive) return;
        e.stopPropagation();
        openMission(mission.id);
      }}
    >
      <mesh position={[0, 11, 0]} scale={[6, 24, 6]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          ref={matRef}
          color="#0a0d18"
          emissive={color}
          emissiveIntensity={0.6}
          emissiveMap={tex}
          roughness={0.5}
          metalness={0.4}
        />
      </mesh>
      <NeonSign
        text={mission.code}
        sub={mission.name}
        color={color}
        position={[0, 17, 3.1]}
        scale={[6, 3, 1]}
      />
    </group>
  );
}

function MissionDistrict({ interactive }: { interactive: boolean }) {
  return (
    <group>
      {missions.map((m, i) => (
        <MissionBuilding
          key={m.id}
          mission={m}
          color={NEON[i % NEON.length]}
          position={[i % 2 === 0 ? -11 : 11, 0, -20 - i * 22]}
          interactive={interactive}
        />
      ))}
    </group>
  );
}

/* ── driving car ahead of the camera ── */
function Car() {
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();
  useFrame((state, dt) => {
    if (!ref.current) return;
    const targetZ = camera.position.z - 11;
    ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, targetZ, 5, dt);
    const sway = Math.sin(state.clock.elapsedTime * 0.8) * 0.4;
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, sway, 3, dt);
  });
  return (
    <group ref={ref} position={[0, 0.1, 6]}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.6, 0.5, 3.4]} />
        <meshStandardMaterial color="#14161f" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.75, -0.2]}>
        <boxGeometry args={[1.3, 0.45, 1.6]} />
        <meshStandardMaterial color="#0a0c14" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[2.4, 4.4]} />
        <meshBasicMaterial color="#ff2e93" transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh position={[0.55, 0.4, 1.75]}>
        <boxGeometry args={[0.3, 0.12, 0.08]} />
        <meshBasicMaterial color="#ff1133" toneMapped={false} />
      </mesh>
      <mesh position={[-0.55, 0.4, 1.75]}>
        <boxGeometry args={[0.3, 0.12, 0.08]} />
        <meshBasicMaterial color="#ff1133" toneMapped={false} />
      </mesh>
      <mesh position={[0.55, 0.4, -1.75]}>
        <boxGeometry args={[0.3, 0.12, 0.08]} />
        <meshBasicMaterial color="#eaf6ff" toneMapped={false} />
      </mesh>
      <mesh position={[-0.55, 0.4, -1.75]}>
        <boxGeometry args={[0.3, 0.12, 0.08]} />
        <meshBasicMaterial color="#eaf6ff" toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ── traffic light trails ── */
function CarTrails({ count }: { count: number }) {
  const ref = useRef<THREE.Group>(null);
  const cars = useMemo(() => {
    const rand = mulberry32(99);
    return Array.from({ length: count }, () => ({
      lane: (rand() > 0.5 ? 1 : -1) * (1.4 + rand() * 1.6),
      z: -150 + rand() * 160,
      speed: 18 + rand() * 26,
      color: rand() > 0.5 ? "#ff2e93" : "#3be8ff",
      dir: rand() > 0.5 ? 1 : -1,
    }));
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, i) => {
      const car = cars[i];
      child.position.z += car.speed * car.dir * delta;
      if (car.dir > 0 && child.position.z > 12) child.position.z = -150;
      if (car.dir < 0 && child.position.z < -150) child.position.z = 12;
    });
  });

  return (
    <group ref={ref}>
      {cars.map((c, i) => (
        <mesh key={i} position={[c.lane, 0.2, c.z]}>
          <boxGeometry args={[0.35, 0.2, 2.4]} />
          <meshBasicMaterial color={c.color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ── rain ── */
function Rain() {
  const ref = useRef<THREE.Points>(null);
  const count = 550;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = Math.random() * 40;
      arr[i * 3 + 2] = -Math.random() * 160 + 10;
    }
    return arr;
  }, []);

  useFrame((state, dt) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const cz = state.camera.position.z;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i);
      y -= 55 * dt;
      if (y < 0) {
        y = 40;
        pos.setX(i, (Math.random() - 0.5) * 60);
        pos.setZ(i, cz - Math.random() * 120 - 5);
      }
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8fd7ff" size={0.14} transparent opacity={0.5} sizeAttenuation toneMapped={false} />
    </points>
  );
}

/* ── ground with optional wet reflections ── */
function Ground({ quality }: { quality: Quality }) {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -70]}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#04050a" roughness={0.9} metalness={0.2} />
      </mesh>
      {quality === "high" ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, -70]}>
          <planeGeometry args={[18, 400]} />
          <MeshReflectorMaterial
            blur={[200, 60]}
            resolution={256}
            mixBlur={1}
            mixStrength={28}
            roughness={0.6}
            depthScale={1.1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.3}
            color="#080a12"
            metalness={0.7}
          />
        </mesh>
      ) : (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, -70]}>
          <planeGeometry args={[18, 400]} />
          <meshStandardMaterial color="#0a0c14" roughness={0.4} metalness={0.6} />
        </mesh>
      )}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.46, -70]}>
        <planeGeometry args={[0.25, 400]} />
        <meshBasicMaterial color="#3be8ff" toneMapped={false} />
      </mesh>
    </>
  );
}

function makeSky(mode: "night" | "sunset") {
  const c = document.createElement("canvas");
  c.width = 16;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  if (mode === "night") {
    g.addColorStop(0, "#02030a");
    g.addColorStop(0.5, "#0a0a2e");
    g.addColorStop(0.8, "#241a52");
    g.addColorStop(1, "#3a2a6a");
  } else {
    g.addColorStop(0, "#05060a");
    g.addColorStop(0.45, "#1a0f3a");
    g.addColorStop(0.7, "#7a1e6b");
    g.addColorStop(0.85, "#ff5e7a");
    g.addColorStop(1, "#ffb84d");
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 16, 256);
  return new THREE.CanvasTexture(c);
}

/* ── sky + lights that respond to day/night ── */
function SkyLights() {
  const { scene } = useThree();
  const fac = useRef(0.15);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const p1 = useRef<THREE.PointLight>(null);
  const p2 = useRef<THREE.PointLight>(null);
  const sunsetSky = useRef<THREE.MeshBasicMaterial>(null);
  const sunMat = useRef<THREE.MeshBasicMaterial>(null);

  const nightTex = useMemo(() => makeSky("night"), []);
  const sunsetTex = useMemo(() => makeSky("sunset"), []);

  useEffect(() => {
    scene.fog = new THREE.Fog("#0a0620", 22, 150);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  const nightFog = useMemo(() => new THREE.Color("#0a0620"), []);
  const sunsetFog = useMemo(() => new THREE.Color("#2a1030"), []);
  const moonCol = useMemo(() => new THREE.Color("#cdd6ff"), []);
  const sunCol = useMemo(() => new THREE.Color("#ffb84d"), []);
  const dirNight = useMemo(() => new THREE.Color("#6a7bff"), []);
  const dirSunset = useMemo(() => new THREE.Color("#ff8ad0"), []);

  useFrame((_, dt) => {
    const target = getState().timeOfDay === "sunset" ? 1 : 0;
    fac.current = THREE.MathUtils.damp(fac.current, target, 2.5, dt);
    const f = fac.current;
    if (ambientRef.current) ambientRef.current.intensity = 0.25 + 0.25 * f;
    if (dirRef.current) {
      dirRef.current.intensity = 0.5 + 0.8 * f;
      dirRef.current.color.copy(dirNight).lerp(dirSunset, f);
    }
    if (p1.current) p1.current.intensity = 55 - 15 * f;
    if (p2.current) p2.current.intensity = 55 - 15 * f;
    if (sunsetSky.current) sunsetSky.current.opacity = f;
    if (sunMat.current) sunMat.current.color.copy(moonCol).lerp(sunCol, f);
    if (scene.fog) (scene.fog as THREE.Fog).color.copy(nightFog).lerp(sunsetFog, f);
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.3} />
      <directionalLight ref={dirRef} position={[6, 20, -60]} intensity={1} />
      <pointLight ref={p1} position={[0, 8, -30]} intensity={50} color="#3be8ff" distance={80} />
      <pointLight ref={p2} position={[0, 6, -90]} intensity={50} color="#ff2e93" distance={80} />

      <mesh position={[0, 20, -178]} scale={[520, 220, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={nightTex} toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh position={[0, 20, -177]} scale={[520, 220, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={sunsetSky} map={sunsetTex} transparent opacity={0} toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh position={[0, 15, -172]}>
        <circleGeometry args={[15, 48]} />
        <meshBasicMaterial ref={sunMat} color="#cdd6ff" toneMapped={false} />
      </mesh>
    </>
  );
}

function SceneContents({
  scrollRef,
  quality,
  missionInteractive,
}: {
  scrollRef: MutableRefObject<number>;
  quality: Quality;
  missionInteractive: boolean;
}) {
  return (
    <>
      <SkyLights />
      <Stars radius={130} depth={60} count={quality === "low" ? 800 : 1700} factor={4} saturation={0} fade speed={1} />
      <Ground quality={quality} />
      <Buildings quality={quality} />
      <MissionDistrict interactive={missionInteractive} />
      <CarTrails count={quality === "low" ? 7 : 14} />
      <Car />
      {quality === "high" && <Rain />}

      <NeonSign
        text={profile.name.split(" ")[0] || "DEV"}
        sub={profile.role}
        color="#ff2e93"
        position={[-10, 12, 2]}
        scale={[10, 5, 1]}
      />
      <NeonSign text="LOS SANTOS" color="#3be8ff" position={[11, 15, -6]} scale={[9, 4.5, 1]} />

      <CameraRig scrollRef={scrollRef} />
    </>
  );
}

export default function CityScene() {
  const scrollRef = useScrollProgressRef();
  const [missionInteractive, setMissionInteractive] = useState(false);
  const [quality] = useState<Quality>(() => {
    if (typeof window === "undefined") return "high";
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    return window.innerWidth < 768 || coarse ? "low" : "high";
  });

  useEffect(() => {
    const missionEl = document.getElementById("missions");
    if (!missionEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setMissionInteractive(entry.isIntersecting);
        if (!entry.isIntersecting) {
          // Ensure crosshair does not stay in aim state after leaving section.
          setAiming(false);
        }
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );
    observer.observe(missionEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-canvas-wrap">
      <Canvas
        gl={{ antialias: quality === "high", powerPreference: "high-performance" }}
        camera={{ position: [0, 3.2, 16], fov: 60, near: 0.1, far: 500 }}
        dpr={quality === "low" ? [1, 1.3] : [1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <SceneContents
          scrollRef={scrollRef}
          quality={quality}
          missionInteractive={missionInteractive}
        />
      </Canvas>
    </div>
  );
}
