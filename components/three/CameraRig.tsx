"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sampleWaypoints } from "@/lib/cameraWaypoints";

export default function CameraRig({
  scrollRef,
}: {
  scrollRef: MutableRefObject<number>;
}) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 2, -10));

  useFrame((state, delta) => {
    const { position, lookAt } = sampleWaypoints(scrollRef.current);

    const t = state.clock.elapsedTime;
    const swayX = Math.sin(t * 0.35) * 0.25;
    const swayY = Math.cos(t * 0.5) * 0.15;

    const target = position.clone();
    target.x += swayX;
    target.y += swayY;

    const damp = 1 - Math.pow(0.0015, delta);
    camera.position.lerp(target, damp);
    currentLookAt.current.lerp(lookAt, damp);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
