import Header from "@/components/common/Header";
import { StrictPropsWithChildren } from "@/types/common";

export default function ViewLayout({ children }: StrictPropsWithChildren) {
  return (
    <div className="w-full flex flex-col min-w-360">
      <Header />
      <div className="grow pt-15">{children}</div>
    </div>
  );
}
