import { cn } from "@/lib/utils";
import ModalOverlay from "./ModalOverlay";
import ModalWrapper from "./ModalWrapper";

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function ModalContent({ children, className }: ModalContentProps) {
  return (
    <ModalWrapper>
      <ModalOverlay>
        <div
          className={cn(
            "w-full max-w-130 h-107.75 p-5 bg-white rounded-2xl flex flex-col items-center",
            className,
          )}
        >
          {children}
        </div>
      </ModalOverlay>
    </ModalWrapper>
  );
}
