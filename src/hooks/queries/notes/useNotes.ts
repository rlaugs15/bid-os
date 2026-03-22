import { fetchJson } from "@/lib/utils";
import { noteKeys } from "@/services/cache/notes.chache";
import { PaginationResponse } from "@/types/common";
import { NoteItem, NoteListParams } from "@/types/notes";
import { useQuery } from "@tanstack/react-query";

export default function useNotes(params: NoteListParams) {
  return useQuery({
    queryKey: noteKeys.list(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: String(params.page),
        pageSize: String(params.pageSize),
        ...(params.keyword ? { keyword: params.keyword } : {}),
        ...(params.type ? { type: params.type } : {}),
      });

      return fetchJson<PaginationResponse<NoteItem>>(`/api/notes?${searchParams.toString()}`);
    },
  });
}
