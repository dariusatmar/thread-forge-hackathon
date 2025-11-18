'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { OutageDataResponse } from '@/types';
import { motion } from 'framer-motion';

interface ThreeDVisualizationProps {
  data: OutageDataResponse | undefined;
  isLoading: boolean;
}

function CallBar({
  position,
  height,
  color,
  label,
  callCount,
}: {
  position: [number, number, number];
  height: number;
  color: string;
  label: string;
  callCount: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        position={[0, height / 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? [1.1, 1, 1.1] : [1, 1, 1]}
      >
        <boxGeometry args={[0.8, height, 0.8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {hovered && (
        <Html position={[0, height + 0.5, 0]} center>
          <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none">
            <div className="font-bold">{label}</div>
            <div>{callCount} calls</div>
          </div>
        </Html>
      )}

      <Text
        position={[0, -0.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function Scene({ data }: { data: OutageDataResponse | undefined }) {
  const maxCalls = Math.max(...(data?.data.map((d) => d.call_count) || [1]));

  const bars = useMemo(() => {
    if (!data?.data) return [];

    const sortedData = [...data.data].sort((a, b) => b.call_count - a.call_count).slice(0, 10);

    return sortedData.map((point, index) => {
      const normalizedHeight = (point.call_count / maxCalls) * 5 + 0.5;
      const intensity = point.call_count / maxCalls;

      // Color gradient from green to red
      const r = Math.floor(intensity * 255);
      const g = Math.floor((1 - intensity) * 255);
      const color = `rgb(${r}, ${g}, 0)`;

      const angle = (index / sortedData.length) * Math.PI * 2;
      const radius = 4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      return {
        position: [x, 0, z] as [number, number, number],
        height: normalizedHeight,
        color,
        label: point.zip_code,
        callCount: point.call_count,
      };
    });
  }, [data, maxCalls]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />

      {bars.map((bar, index) => (
        <CallBar key={index} {...bar} />
      ))}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.8} />
      </mesh>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
      />
    </>
  );
}

export function ThreeDVisualization({ data, isLoading }: ThreeDVisualizationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[600px] bg-white rounded p-6 border-2 border-black">
        <div className="animate-pulse h-full bg-gray-100 rounded"></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-white rounded p-6 border-2 border-black">
        <div className="animate-pulse h-full bg-gray-100 rounded"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="w-full h-[600px] bg-black rounded overflow-hidden border-2 border-black"
    >
      <div className="p-4 border-b-2 border-white">
        <h3 className="text-xl font-bold text-white">3D Call Volume Visualization</h3>
        <p className="text-sm text-gray-300 mt-1">
          Top 10 ZIP codes by call volume (hover for details)
        </p>
      </div>
      <div className="h-[calc(100%-76px)]">
        <Canvas
          camera={{ position: [8, 8, 8], fov: 50 }}
          shadows
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={['#0a0a1a']} />
          <fog attach="fog" args={['#0a0a1a', 10, 30]} />
          <Scene data={data} />
        </Canvas>
      </div>
    </motion.div>
  );
}
