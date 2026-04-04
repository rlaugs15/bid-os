import ActionButton from "@/components/common/button/ActionButton";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import CompaniesTabs from "@/components/features/companies/CompaniesTabs";
import CompanyList from "@/components/features/companies/CompanyList";

export default function CompaniesPage() {
  return (
    <PageContainer>
      <PageHeader title="업체 페이지" description="업체 정보를 관리해보세요." />
      <ActionButton label="업체 등록하기" link="/companies/new" />

      <CompaniesTabs />

      <CompanyList />
    </PageContainer>
  );
}
