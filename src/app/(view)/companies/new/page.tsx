import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import CompanyForm from "@/components/features/companies/CompanyForm";

export default function NewCompanyPage() {
  return (
    <PageContainer>
      <PageHeader title="새 업체 등록" description="새 업체를 등록해주세요." />

      <CompanyForm />
    </PageContainer>
  );
}
