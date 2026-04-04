import { fetchJson } from "@/lib/utils";
import { caseKeys } from "@/services/cache/notes.chache";
import { CaseItem, UpdateCaseRequest } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateCase(caseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: UpdateCaseRequest) =>
      fetchJson<CaseItem>(`/api/cases/${caseId}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: caseKeys.detail(caseId) });
      queryClient.invalidateQueries({ queryKey: caseKeys.lists(), refetchType: "all" });
    },
  });
}
