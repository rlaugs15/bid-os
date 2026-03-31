"use client";

import CustomPagination from "@/components/common/CustomPagination";
import FallbackMessage from "@/components/common/FallbackMessage";
import LoadingLottie from "@/components/common/LoadingLottie";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCases from "@/hooks/queries/cases/useCases";
import useQueryPagination from "@/hooks/useQueryPagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";

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
        <Card key={item.id}>
          <CardHeader>
            <p className="text-text-sm font-semibold">{item.bid_number}</p>
            <CardTitle className="text-md">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-md font-sans">
            {/* 메타 정보 */}
            <dl className="space-y-2">
              {/* 타입 */}
              <div className="flex items-center gap-2">
                <dt>상태 : </dt>
                <dd>
                  <span>
                    {item.status === "active"
                      ? "진행중"
                      : item.status === "closed"
                        ? "종료"
                        : "알 수 없음"}
                  </span>
                </dd>
              </div>

              {/* 연결 정보 */}
              <div className="flex items-center gap-2">
                <span>연결된 노트 {item.noteCount}개</span>
                <p> / </p>
                <span>연결된 업체 {item.companyCount}개</span>
              </div>
            </dl>

            {/* 액션 */}
            <div className="flex justify-between w-full">
              <Link href={`/cases/${item.id}`}>
                <Button size="sm" variant="outline">
                  상세 보기
                </Button>
              </Link>
              <Button variant="destructive">삭제</Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={handlePageChange}
      />
    </section>
  );
}
