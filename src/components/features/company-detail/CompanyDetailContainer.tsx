"use client";

import FallbackMessage from "@/components/common/FallbackMessage";
import LoadingLottie from "@/components/common/LoadingLottie";
import useCompany from "@/hooks/queries/companies/useCompany";
import { useParams } from "next/navigation";
import CompanyDetailForm from "./CompanyDetailForm";

export default function CompanyDetailContainer() {
  const { companyId } = useParams();
  const { data: companyData, isPending: isCompanyPending } = useCompany(String(companyId));

  if (!isCompanyPending && !companyData) {
    return <FallbackMessage message="업체를 찾을 수 없습니다." />;
  }

  return (
    <>
      {isCompanyPending ? (
        <LoadingLottie />
      ) : (
        <CompanyDetailForm companyData={companyData} companyId={String(companyId)} />
      )}
    </>
  );
}
