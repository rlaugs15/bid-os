import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import CasesForm from "@/components/features/cases/CasesForm";

export default function NewCasePage() {
  return (
    <PageContainer>
      <PageHeader title="새 공고 등록" description="새 공고를 등록해주세요." />

      <CasesForm />
    </PageContainer>
  );
}
