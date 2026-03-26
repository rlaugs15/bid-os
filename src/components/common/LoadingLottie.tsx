"use client";

import animationData from "@/assets/animation.json";
import Lottie from "lottie-react";

export default function LoadingLottie() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Lottie animationData={animationData} loop />
    </div>
  );
}
