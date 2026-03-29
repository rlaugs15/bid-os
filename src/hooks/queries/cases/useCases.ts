import { fetchJson } from "@/lib/utils";
import { caseKeys } from "@/services/cache/notes.chache";
import { PaginationResponse } from "@/types/common";
import { CaseItem, CaseListParams } from "@/types/notes";
import { useQuery } from "@tanstack/react-query";

export default function useCases(params: CaseListParams) {
  return useQuery({
    queryKey: caseKeys.list(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: String(params.page),
        pageSize: String(params.pageSize),
        ...(params.keyword ? { keyword: params.keyword } : {}),
        ...(params.status ? { status: params.status } : {}),
      });

      return fetchJson<PaginationResponse<CaseItem>>(`/api/cases?${searchParams.toString()}`);
    },
  });
}
