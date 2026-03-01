import { cn } from "@/lib/utils";
import Image from "next/image";

/* modal header */
export const XIcon = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative", className ? className : "w-5 h-5")}>
      <Image
        src="/icons/x.svg"
        alt="엑스 아이콘"
        fill
        className="object-contain object-center stroke-2"
      />
    </div>
  );
};
