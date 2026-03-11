"use client";

import { Button } from "@/components/ui/button";
import { useDeleteMemo } from "@/hooks/mutations/memos/useDeleteMemo";
import { Memo } from "@/types/memos";

export default function MemoDeleteButton({ id }: Pick<Memo, "id">) {
  const { mutate, isPending } = useDeleteMemo();
  const handleDelete = () => {
    if (isPending) return;
    mutate(id);
  };
  return (
    <Button onClick={handleDelete} disabled={isPending} className="bg-green-700">
      {isPending ? "삭제중..." : "삭제"}
    </Button>
  );
}
