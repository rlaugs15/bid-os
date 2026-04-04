"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDeleteCase from "@/hooks/mutations/cases/useDeleteCase";
import { CaseListItem } from "@/types/notes";
import Link from "next/link";

interface Props {
  CaseData: CaseListItem;
}

export default function CaseItemCard({ CaseData }: Props) {
  const { mutate: deleteCase, isPending: isDeletePending } = useDeleteCase();
  const handleDelete = () => {
    if (isDeletePending) return;
    deleteCase(CaseData.id);
  };
  return (
    <Card>
      <CardHeader>
        <p className="text-text-sm font-semibold">{CaseData.bid_number}</p>
        <CardTitle className="text-md">{CaseData.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-text-md font-sans">
        {/* 메타 정보 */}
        <dl className="space-y-2">
          {/* 타입 */}
          <div className="flex items-center gap-2">
            <dt>상태 : </dt>
            <dd>
              <span>
                {CaseData.status === "active"
                  ? "진행중"
                  : CaseData.status === "closed"
                    ? "종료"
                    : "알 수 없음"}
              </span>
            </dd>
          </div>

          {/* 연결 정보 */}
          <div className="flex items-center gap-2">
            <span>연결된 노트 {CaseData.noteCount}개</span>
            <p> / </p>
            <span>연결된 업체 {CaseData.companyCount}개</span>
          </div>
        </dl>

        {/* 액션 */}
        <div className="flex justify-between w-full">
          <Link href={`/cases/${CaseData.id}`}>
            <Button size="sm" variant="outline">
              상세 보기
            </Button>
          </Link>
          <Button type="button" onClick={handleDelete} variant="destructive">
            {isDeletePending}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
