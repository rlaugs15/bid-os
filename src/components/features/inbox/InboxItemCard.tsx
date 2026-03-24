"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useDeleteInbox from "@/hooks/mutations/inbox/useDeleteInbox";
import { InboxItem } from "@/types/notes";
import Link from "next/link";

interface InboxItemCardProps extends Pick<InboxItem, "id" | "raw_text" | "created_at"> {}

export default function InboxItemCard({ id, raw_text, created_at }: InboxItemCardProps) {
  const { mutate: deleteInbox, isPending: isDeleting } = useDeleteInbox();
  const handleDeleteInbox = () => {
    if (isDeleting) return;
    deleteInbox(id);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-text-lg">{raw_text}</CardTitle>
      </CardHeader>
      <CardContent>
        <time className="text-xs! text-light-500">
          {new Date(created_at).toLocaleDateString()} {new Date(created_at).toLocaleTimeString()}
        </time>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          <Link href={`/inbox/${id}`}>
            <Button>메모로 변환</Button>
          </Link>
          <Button onClick={handleDeleteInbox} disabled={isDeleting}>
            {isDeleting ? "삭제중..." : "삭제"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
