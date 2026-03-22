import { fetchJson } from "@/lib/utils";
import { companyKeys } from "@/services/cache/notes.chache";
import { CompanyItem, UpdateCompanyRequest } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateCompany(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: UpdateCompanyRequest) =>
      fetchJson<CompanyItem>(`/api/companies/${companyId}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.detail(companyId) });
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
    },
  });
}
