import { cn } from "@/lib/utils";

interface ModalOverlayProps {
  children: React.ReactNode;
  className?: string;
}

export default function ModalOverlay({ children, className }: ModalOverlayProps) {
  return (
    <div
      className={cn(
        "w-full h-full backdrop-blur-[10px] bg-black/50 absolute top-0 left-0 z-60 flex justify-center items-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
