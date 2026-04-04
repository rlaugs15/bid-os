"use client";

import CustomPagination from "@/components/common/CustomPagination";
import FallbackMessage from "@/components/common/FallbackMessage";
import LoadingLottie from "@/components/common/LoadingLottie";
import useCases from "@/hooks/queries/cases/useCases";
import useQueryPagination from "@/hooks/useQueryPagination";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import CaseItemCard from "./CaseItemCard";

export default function CaseList() {
  const searchParams = useSearchParams();
  const rawStatus = searchParams.get("status");
  const keyword = searchParams.get("keyword") ?? undefined;

  const status = rawStatus === "active" || rawStatus === "closed" ? rawStatus : undefined;

  const contentRef = useRef<HTMLElement | null>(null);
  const { currentPage, handlePageChange } = useQueryPagination("page", contentRef);
  const { data: casesData, isPending: isCasesPending } = useCases({
    page: currentPage,
    pageSize: 12,
    status,
    keyword,
  });

  const totalPages = Math.ceil((casesData?.totalCount ?? 0) / 12);

  if (isCasesPending) {
    return <LoadingLottie />;
  }

  if (!casesData || casesData.data.length === 0) {
    return <FallbackMessage message="공고 데이터가 존재하지 않습니다." />;
  }
  return (
    <section className="space-y-4">
      {casesData?.data.map((item) => (
        <CaseItemCard key={item.id} CaseData={item} />
      ))}

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={handlePageChange}
      />
    </section>
  );
}
