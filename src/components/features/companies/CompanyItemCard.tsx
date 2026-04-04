import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDeleteCompany from "@/hooks/mutations/companies/useDeleteCompany";
import { CompanyListItem } from "@/types/notes";
import Link from "next/link";

/* export interface CompanyListItem {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  status: CompanyStatus;
  updated_at: string;
  noteCount: number;
  caseCount: number;
} */

type Props = Pick<CompanyListItem, "id" | "name" | "status" | "noteCount" | "caseCount">;

export default function CompanyItemCard({ id, name, status, noteCount, caseCount }: Props) {
  const { mutate: deleteCompany, isPending: isDeleting } = useDeleteCompany();

  const handleDeleteCompany = () => {
    if (isDeleting) return;
    deleteCompany(id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-text-md font-sans">
        {/* 메타 정보 */}
        <dl className="space-y-2">
          {/* 타입 */}
          <div className="flex items-center gap-2">
            <dt>상태 : </dt>
            <dd>
              <span>
                {status === "active"
                  ? "서비스 중"
                  : status === "inactive"
                    ? "서비스 종료"
                    : "알 수 없음"}
              </span>
            </dd>
          </div>

          {/* 연결 정보 */}
          <div className="flex items-center gap-2">
            <span>연결된 노트 {noteCount}개</span>
            <p> / </p>
            <span>연결된 공고 {caseCount}개</span>
          </div>
        </dl>

        {/* 액션 */}
        <div className="flex justify-between w-full">
          <Link href={`/companies/${id}`}>
            <Button size="sm" variant="outline">
              상세 보기
            </Button>
          </Link>
          <Button type="button" onClick={handleDeleteCompany} variant="destructive">
            {isDeleting ? "삭제 중..." : "삭제"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
