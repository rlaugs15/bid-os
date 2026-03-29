"use client";

import { TypeAnimation } from "react-type-animation";

interface TypingTextProps {
  text: string;
  delay?: number;
  repeat?: number;
  speed?: number;
  className?: string;
}

export default function TypingText({ text, delay = 1200, className = "" }: TypingTextProps) {
  return (
    <TypeAnimation
      sequence={[text, delay, ""]}
      speed={40}
      repeat={Infinity}
      className={`whitespace-pre-line text-text-xl text-light-500 ${className}`}
    />
  );
}
