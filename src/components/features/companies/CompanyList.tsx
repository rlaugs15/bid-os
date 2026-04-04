"use client";

import CustomPagination from "@/components/common/CustomPagination";
import FallbackMessage from "@/components/common/FallbackMessage";
import LoadingLottie from "@/components/common/LoadingLottie";
import useCompanies from "@/hooks/queries/companies/useCompanies";
import useQueryPagination from "@/hooks/useQueryPagination";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import CompanyItemCard from "./CompanyItemCard";

export default function CompanyList() {
  const searchParams = useSearchParams();
  const rawStatus = searchParams.get("status");
  const keyword = searchParams.get("keyword") ?? undefined;

  const status = rawStatus === "active" || rawStatus === "inactive" ? rawStatus : undefined;

  const contentRef = useRef<HTMLElement | null>(null);
  const { currentPage, handlePageChange } = useQueryPagination("page", contentRef);
  const { data: companiesData, isPending: isCompaniesPending } = useCompanies({
    page: currentPage,
    pageSize: 12,
    keyword,
    status,
  });

  const totalPages = Math.ceil((companiesData?.totalCount ?? 0) / 12);

  if (isCompaniesPending) {
    return <LoadingLottie />;
  }

  if (!companiesData || companiesData.data.length === 0) {
    return <FallbackMessage message="업체 데이터가 존재하지 않습니다." />;
  }
  return (
    <section className="space-y-4">
      {companiesData?.data.map((item) => (
        <CompanyItemCard key={item.id} {...item} />
      ))}

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={handlePageChange}
      />
    </section>
  );
}
