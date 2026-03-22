import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/common/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/services/user/user.api";
import { StrictPropsWithChildren } from "@/types/common";

interface ViewLayoutProps extends StrictPropsWithChildren {
  modal: React.ReactNode;
}

export default async function ViewLayout({ modal, children }: ViewLayoutProps) {
  const me = await getUser();
  return (
    <div className="w-full flex flex-col">
      {modal}
      <Header />
      <SidebarProvider>
        <AppSidebar userName={me?.nickname ?? "사용자"} className="mt-15" />
        <SidebarInset>
          <div className="grow pt-15">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
