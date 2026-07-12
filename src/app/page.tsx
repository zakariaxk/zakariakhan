"use client";

import dynamic from "next/dynamic";

const PortfolioExperience = dynamic(
  () => import("@/components/PortfolioExperience").then((mod) => mod.PortfolioExperience),
  { ssr: false },
);

export default function Home() {
  return <PortfolioExperience />;
}
