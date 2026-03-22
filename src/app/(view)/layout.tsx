import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/common/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { StrictPropsWithChildren } from "@/types/common";

interface ViewLayoutProps extends StrictPropsWithChildren {
  modal: React.ReactNode;
}

export default function ViewLayout({ modal, children }: ViewLayoutProps) {
  return (
    <div className="w-full flex flex-col">
      {modal}
      <Header />
      <SidebarProvider>
        <AppSidebar className="mt-15" />
        <SidebarInset>
          <div className="grow pt-15">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
