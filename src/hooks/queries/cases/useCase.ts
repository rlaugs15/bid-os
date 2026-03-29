import { fetchJson } from "@/lib/utils";
import { caseKeys } from "@/services/cache/notes.chache";
import { CaseItem } from "@/types/notes";
import { useQuery } from "@tanstack/react-query";

export default function useCase(caseId: string) {
  return useQuery({
    queryKey: caseKeys.detail(caseId),
    queryFn: async () => fetchJson<CaseItem>(`/api/cases/${caseId}`),
    enabled: Boolean(caseId),
  });
}
