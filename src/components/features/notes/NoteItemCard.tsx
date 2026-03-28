import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDeleteNote from "@/hooks/mutations/notes/useDeleteNote";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  type: string;
  case_count: number;
  company_count: number;
  updated_at: string;
}

export default function NotesItemCard({
  id,
  title,
  type,
  case_count,
  company_count,
  updated_at,
}: Props) {
  const { mutate: deleteNote, isPending: isDeletePending } = useDeleteNote();

  const handleDeleteNote = () => {
    if (isDeletePending) return;
    deleteNote(id);
  };

  let typeLabel = "";
  switch (type) {
    case "general":
      typeLabel = "미분류";
      break;
    case "case":
      typeLabel = "공고";
      break;
    case "company":
      typeLabel = "업체";
      break;
    default:
      typeLabel = "알 수 없음";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-text-md font-sans">
        {/* 메타 정보 */}
        <dl className="space-y-2">
          {/* 타입 */}
          <div className="flex items-center gap-2">
            <dt>타입 : </dt>
            <dd>
              <span>{typeLabel}</span>
            </dd>
          </div>

          {/* 연결 정보 */}
          <div className="flex items-center gap-2">
            <span>연결된 공고 {case_count}개</span>
            <p> / </p>
            <span>연결된 업체 {company_count}개</span>
          </div>

          {/* 최근 수정 */}
          <div className="flex items-center gap-2 text-light-500">
            <p>최근 수정 : </p>
            <time>
              {new Date(updated_at).toLocaleDateString()}{" "}
              {new Date(updated_at).toLocaleTimeString()}
            </time>
          </div>
        </dl>

        {/* 액션 */}
        <div className="flex justify-between w-full">
          <Link href={`/notes/${id}`}>
            <Button size="sm" variant="outline">
              상세 보기
            </Button>
          </Link>
          <Button onClick={handleDeleteNote} variant="destructive">
            {isDeletePending ? "삭제 중..." : "삭제"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
