import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/common/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { StrictPropsWithChildren } from "@/types/common";
import { Suspense } from "react";

interface ViewLayoutProps extends StrictPropsWithChildren {
  modal: React.ReactNode;
}

export default function ViewLayout({ modal, children }: ViewLayoutProps) {
  return (
    <div className="w-full flex flex-col">
      {modal}
      <Suspense fallback={<div className="h-25 w-full bg-black" />}>
        <Header />
      </Suspense>
      <Suspense>
        <SidebarProvider>
          <AppSidebar className="mt-15" />
          <SidebarInset>
            <div className="grow pt-15">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </Suspense>
    </div>
  );
}
