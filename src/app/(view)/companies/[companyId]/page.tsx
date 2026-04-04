import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import CompanyDetailContainer from "@/components/features/company-detail/CompanyDetailContainer";
import { Separator } from "@/components/ui/separator";

export default function CompanyDetailPage() {
  return (
    <PageContainer>
      <PageHeader
        title="업체 상세/수정페이지"
        description="업체 정보를 확인하고 수정할 수 있습니다."
      />
      <div>
        <Separator />
      </div>
      <CompanyDetailContainer />
    </PageContainer>
  );
}
