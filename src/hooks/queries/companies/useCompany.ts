import { fetchJson } from "@/lib/utils";
import { companyKeys } from "@/services/cache/notes.chache";
import { CompanyItem } from "@/types/notes";
import { useQuery } from "@tanstack/react-query";

export default function useCompany(companyId: string) {
  return useQuery({
    queryKey: companyKeys.detail(companyId),
    queryFn: async () => fetchJson<CompanyItem>(`/api/companies/${companyId}`),
    enabled: Boolean(companyId),
  });
}
