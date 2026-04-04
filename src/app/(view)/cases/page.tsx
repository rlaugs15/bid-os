import ActionButton from "@/components/common/button/ActionButton";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import CaseList from "@/components/features/cases/CaseList";
import CasesTabs from "@/components/features/cases/CasesTabs";

export default function CasesPage() {
  return (
    <PageContainer>
      <PageHeader title="공고" description="공고 정보를 관리해보세요." />
      <ActionButton label="공고 등록하기" link="/cases/new" />

      <CasesTabs />

      <CaseList />
    </PageContainer>
  );
}
