"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  voltage: number;
  resistance: number;
  current: number;
  power: number;
  performanceMode?: "auto" | "low" | "high";
  enableSmoke?: boolean;
  enableBloom?: boolean;
};

function Wire({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh | null>(null);
  const vecStart = useMemo(() => new THREE.Vector3(...start), [start]);
  const vecEnd = useMemo(() => new THREE.Vector3(...end), [end]);
  const mid = useMemo(() => vecStart.clone().lerp(vecEnd, 0.5), [vecStart, vecEnd]);
  const length = useMemo(() => vecStart.distanceTo(vecEnd), [vecStart, vecEnd]);

  const quaternion = useMemo(() => {
    const dir = vecEnd.clone().sub(vecStart).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const axis = new THREE.Vector3().crossVectors(up, dir);
    const angle = Math.acos(Math.max(-1, Math.min(1, up.dot(dir))));
    const q = new THREE.Quaternion();
    if (axis.lengthSq() > 1e-6) q.setFromAxisAngle(axis.normalize(), angle);
    return q;
  }, [vecStart, vecEnd]);

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(mid.x, mid.y, mid.z);
      ref.current.setRotationFromQuaternion(quaternion);
    }
  }, [mid, quaternion]);

  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[0.06, 0.06, length, 12]} />
      <meshStandardMaterial emissive={new THREE.Color(color)} color={color} metalness={0.3} roughness={0.6} />
    </mesh>
  );
}

function ParticleTrail({ points, speed, count = 8 }: { points: [number, number, number][]; speed: number; count?: number }) {
  const particles = useMemo(() => new Array(count).fill(0).map(() => ({ t: Math.random() })), [count]);
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((_state, delta) => {
    particles.forEach((p, i) => {
      p.t += delta * speed * (0.2 + (i / particles.length) * 0.8);
      if (p.t > 1) p.t = 0;
      const idx = Math.floor(p.t * (points.length - 1));
      const localT = (p.t * (points.length - 1)) % 1;
      const a = new THREE.Vector3(...points[idx]);
      const b = new THREE.Vector3(...points[Math.min(idx + 1, points.length - 1)]);
      const pos = a.lerp(b, localT);
      if (refs.current[i]) refs.current[i].position.copy(pos);
    });
  });

  return (
    <group>
      {particles.map((_, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial emissive={new THREE.Color("#FFFF66")} color="#FFD700" />
        </mesh>
      ))}
    </group>
  );
}

function ParticleSmoke({ position, power, count = 40 }: { position: [number, number, number]; power: number; count?: number }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const particles = useMemo(
    () =>
      new Array(count).fill(0).map(() => ({
        x: (Math.random() - 0.5) * 0.6,
        z: (Math.random() - 0.5) * 0.2,
        y: Math.random() * 0.5,
        life: 0.5 + Math.random() * 1.5,
        age: Math.random(),
        scale: 0.2 + Math.random() * 0.6,
        rot: Math.random() * Math.PI * 2,
      })),
    [count]
  );

  useFrame((_state, delta) => {
    const intensity = Math.min(power / 40, 1);
    particles.forEach((p, i) => {
      p.age += delta * (0.3 + intensity * 3);
      if (p.age > p.life) {
        p.age = 0;
        p.y = 0;
        p.x = (Math.random() - 0.5) * 0.6;
        p.z = (Math.random() - 0.5) * 0.2;
        p.life = 0.6 + Math.random() * 1.6;
        p.scale = 0.2 + Math.random() * 0.6;
      } else {
        p.y += delta * (0.2 + intensity * 1.5) * (0.8 + Math.random() * 0.4);
        p.x += Math.sin(p.age * 3 + i) * 0.001 * (1 + intensity * 2);
        p.z += Math.cos(p.age * 2 + i) * 0.001 * (1 + intensity * 2);
      }

      const lifeRatio = p.age / p.life;
      const opacity = Math.max(0, (1 - lifeRatio) * (0.15 + intensity * 0.6));
      const scale = p.scale * (0.8 + lifeRatio * 1.6);

      const el = refs.current[i];
      if (el && el.material) {
        el.position.set(position[0] + p.x, position[1] + 0.8 + p.y, position[2] + p.z);
        (el.material as THREE.MeshStandardMaterial).opacity = opacity;
        el.scale.set(scale, scale, scale);
        el.rotation.z = p.rot + lifeRatio * 1.5;
      }
    });
  });

  return (
    <group>
      {particles.map((_, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#444" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function ResistorMesh({ position, power }: { position: [number, number, number]; power: number }) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);
  const baseColor = useMemo(() => new THREE.Color("#D2B48C"), []);
  const hotColor = useMemo(() => new THREE.Color("#FF6B6B"), []);

  useFrame((state) => {
    const t = Math.min(power / 50, 1);
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const c = baseColor.clone().lerp(hotColor, t);
        mat.emissive = c;
        mat.emissiveIntensity = 0.2 + t * 2.0;
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 6) * t * 0.02;
        meshRef.current.scale.set(pulse, pulse, pulse);
      }
    }
    if (lightRef.current) {
      lightRef.current.intensity = 0.2 + t * 2.5;
      lightRef.current.color = hotColor.clone().lerp(new THREE.Color("#FFA500"), t * 0.5);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.6, 0.6, 1.8, 24]} />
        <meshStandardMaterial color={"#D2B48C"} emissive={new THREE.Color(0, 0, 0)} emissiveIntensity={0} />
      </mesh>
      <pointLight ref={lightRef} position={[0, 0.6, 0]} intensity={0.2} distance={6} />
    </group>
  );
}

function EffectsLoader({ power }: { power: number }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Effects, setEffects] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import("@react-three/postprocessing")
      .then((mod) => {
        if (!mounted) return;
        setEffects(mod);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  if (!Effects) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Composer = Effects.EffectComposer || (Effects as any).Composer || (Effects as any).default?.EffectComposer;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Bloom = Effects.Bloom || (Effects as any).UnrealBloomPass || (Effects as any).default?.Bloom;
  if (!Composer || !Bloom) return null;
  const intensity = Math.min(power / 30, 1) * 1.2;

  return (
    <Composer>
      <Bloom luminanceThreshold={0.2} intensity={0.6 + intensity} mipmapBlur luminanceSmoothing={0.02} />
    </Composer>
  );
}

export default function Circuit3D({ voltage, resistance, current, power, performanceMode = "auto", enableSmoke = true, enableBloom = true, }: Props) {
  const [lowPerf, setLowPerf] = useState(false);

  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
    const cores = typeof navigator !== "undefined" ? (navigator as any).hardwareConcurrency || 4 : 4;
    const deviceMemory = typeof navigator !== "undefined" ? (navigator as any).deviceMemory || 4 : 4;
    const isMobile = /Mobi|Android/i.test(ua);
    const autoLow = cores <= 2 || deviceMemory <= 2 || isMobile;
    if (performanceMode === "low") setLowPerf(true);
    else if (performanceMode === "high") setLowPerf(false);
    else setLowPerf(autoLow);
  }, [performanceMode]);

  const batteryPos: [number, number, number] = [-3, 0, 0];
  const resistorPos: [number, number, number] = [3, 0, 0];
  const topWireStart: [number, number, number] = [-2, 1.2, 0];
  const topWireEnd: [number, number, number] = [2, 1.2, 0];
  const bottomWireStart: [number, number, number] = [2, -1.2, 0];
  const bottomWireEnd: [number, number, number] = [-2, -1.2, 0];

  const voltageRatio = Math.min(voltage / 24, 1);
  const wireRed = Math.floor(50 + (255 - 50) * voltageRatio);
  const wireGreen = Math.floor(50 + (255 - 50) * voltageRatio);
  const wireBlue = Math.floor(50 + (0 - 50) * voltageRatio);
  const wireColor = `rgb(${wireRed}, ${wireGreen}, ${wireBlue})`;

  const speed = Math.max(current, 0.01) * 2;
  const particleCount = lowPerf ? 10 : 40;
  const trailCount = lowPerf ? 3 : 8;
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, lowPerf ? 1 : 2) : 1;

  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ antialias: !lowPerf }} dpr={dpr}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <mesh position={batteryPos}>
        <boxGeometry args={[1.2, 2.4, 1.2]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[batteryPos[0], batteryPos[1] + 1.4, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.8]} />
        <meshStandardMaterial color="#E74C3C" />
      </mesh>
      <mesh position={[batteryPos[0], batteryPos[1] - 1.4, 0]}>
        <boxGeometry args={[0.8, 0.18, 0.8]} />
        <meshStandardMaterial color="#3498DB" />
      </mesh>

      <ResistorMesh position={resistorPos} power={power} />

      {enableSmoke && power > 0 && <ParticleSmoke position={resistorPos} power={power} count={particleCount} />}

      {!lowPerf && enableBloom && <EffectsLoader power={power} />}

      <Wire start={batteryPos.map((v, i) => (i === 0 ? v + 1.2 : v)) as [number, number, number]} end={topWireStart} color={wireColor} />
      <Wire start={topWireStart} end={topWireEnd} color={wireColor} />
      <Wire start={topWireEnd} end={resistorPos.map((v, i) => (i === 0 ? v - 1.2 : v)) as [number, number, number]} color={wireColor} />

      <Wire start={resistorPos.map((v, i) => (i === 0 ? v - 1.2 : v)) as [number, number, number]} end={bottomWireStart} color={wireColor} />
      <Wire start={bottomWireStart} end={bottomWireEnd} color={wireColor} />
      <Wire start={bottomWireEnd} end={batteryPos.map((v, i) => (i === 0 ? v + 1.2 : v)) as [number, number, number]} color={wireColor} />

      <ParticleTrail points={[topWireStart, topWireEnd]} speed={speed} count={trailCount} />
      <ParticleTrail points={[bottomWireStart, bottomWireEnd]} speed={speed} count={trailCount} />

      <Html position={[batteryPos[0], batteryPos[1] + 2.2, 0]} center>
        <div style={{ color: "#FFD700", fontWeight: 700 }}>{voltage.toFixed(1)} V</div>
      </Html>
      <Html position={[resistorPos[0], resistorPos[1] + 1.8, 0]} center>
        <div style={{ color: "#FFD700", fontWeight: 700 }}>{resistance} Ω</div>
      </Html>
      <Html position={[0, -3, 0]} center>
        <div style={{ color: "#9AE6B4", fontWeight: 700 }}>{current.toFixed(2)} A ({Math.round(current * 1000)} mA)</div>
      </Html>

      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  );
}
