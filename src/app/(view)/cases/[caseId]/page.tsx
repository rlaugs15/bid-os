import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import CaseDetailContainer from "@/components/features/case-detail/CaseDetailContainer";
import { Separator } from "@/components/ui/separator";

export default function CaseDetailPage() {
  return (
    <PageContainer>
      <PageHeader
        title="공고 상세/수정페이지"
        description="공고를 필요한 공고나 업체와 연결해보세요."
      />
      <div>
        <Separator />
      </div>
      <CaseDetailContainer />
    </PageContainer>
  );
}
