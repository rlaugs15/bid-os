import Header from "@/components/common/Header";
import { StrictPropsWithChildren } from "@/types/common";

interface ViewLayoutProps extends StrictPropsWithChildren {
  modal: React.ReactNode;
}

export default function ViewLayout({ modal, children }: ViewLayoutProps) {
  return (
    <div className="w-full flex flex-col min-w-360">
      {modal}
      <Header />
      <div className="grow pt-15">{children}</div>
    </div>
  );
}
