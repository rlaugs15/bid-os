"use client";

import CustomPagination from "@/components/common/CustomPagination";
import FallbackMessage from "@/components/common/FallbackMessage";
import LoadingLottie from "@/components/common/LoadingLottie";
import useNotes from "@/hooks/queries/notes/useNotes";
import useQueryPagination from "@/hooks/useQueryPagination";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import NotesItemCard from "./NoteItemCard";

export default function NoteList() {
  const searchParams = useSearchParams();
  const rawType = searchParams.get("type");
  const keyword = searchParams.get("keyword") ?? undefined;

  const type =
    rawType === "general" || rawType === "case" || rawType === "company" ? rawType : undefined;

  const contentRef = useRef<HTMLElement | null>(null);
  const { currentPage, handlePageChange } = useQueryPagination("page", contentRef);
  const { data: notesData, isPending: isNotesPending } = useNotes({
    page: currentPage,
    pageSize: 12,
    type,
    keyword,
  });

  const totalPages = Math.ceil((notesData?.totalCount ?? 0) / 12);

  if (isNotesPending) {
    return <LoadingLottie />;
  }

  if (!notesData || notesData.data.length === 0) {
    return <FallbackMessage message="노트 데이터가 존재하지 않습니다." />;
  }

  return (
    <section className="space-y-4">
      {notesData?.data.map((note) => (
        <NotesItemCard
          key={note.id}
          id={note.id}
          title={note.title}
          type={note.type}
          case_count={note.case_count}
          company_count={note.company_count}
          updated_at={note.updated_at}
        />
      ))}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={handlePageChange}
      />
    </section>
  );
}
