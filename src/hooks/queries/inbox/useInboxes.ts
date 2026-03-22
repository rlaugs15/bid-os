import { fetchJson } from "@/lib/utils";
import { inboxKeys } from "@/services/cache/notes.chache";
import { PaginationResponse } from "@/types/common";
import { InboxItem, InboxListParams } from "@/types/notes";
import { useQuery } from "@tanstack/react-query";

export default function useInboxes(params: InboxListParams) {
  return useQuery({
    queryKey: inboxKeys.list(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: String(params.page),
        pageSize: String(params.pageSize),
        ...(params.keyword ? { keyword: params.keyword } : {}),
        ...(params.status ? { status: params.status } : {}),
      });

      return fetchJson<PaginationResponse<InboxItem>>(`/api/inbox?${searchParams.toString()}`);
    },
  });
}
