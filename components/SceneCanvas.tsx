"use client";

import dynamic from "next/dynamic";

const CityScene = dynamic(() => import("./three/CityScene"), {
  ssr: false,
});

export default function SceneCanvas() {
  return <CityScene />;
}
