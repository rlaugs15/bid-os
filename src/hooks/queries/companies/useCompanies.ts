import { fetchJson } from "@/lib/utils";
import { companyKeys } from "@/services/cache/notes.chache";
import { PaginationResponse } from "@/types/common";
import { CompanyListItem, CompanyListParams } from "@/types/notes";
import { useQuery } from "@tanstack/react-query";

export default function useCompanies(params: CompanyListParams) {
  return useQuery({
    queryKey: companyKeys.list(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: String(params.page),
        pageSize: String(params.pageSize),
        ...(params.keyword ? { keyword: params.keyword } : {}),
        ...(params.status ? { status: params.status } : {}),
      });

      return fetchJson<PaginationResponse<CompanyListItem>>(
        `/api/companies?${searchParams.toString()}`,
      );
    },
  });
}
