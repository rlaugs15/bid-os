import { fetchJson } from "@/lib/utils";
import { companyKeys } from "@/services/cache/notes.chache";
import { CompanyItem, CreateCompanyRequest } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateCompanyRequest) =>
      fetchJson<CompanyItem>("/api/companies", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
    },
  });
}
