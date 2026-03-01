"use client";

import { useRouter } from "next/navigation";
import { XIcon } from "../icons";

export default function XButton() {
  const router = useRouter();
  return (
    <button className="hover:cursor-pointer" onClick={() => router.back()}>
      <XIcon className="w-3 h-3" />
    </button>
  );
}
