import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = "" }: PageContainerProps) {
  return <main className={`p-10 space-y-10 ${className}`}>{children}</main>;
}
