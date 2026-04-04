import { fetchJson } from "@/lib/utils";
import { companyKeys } from "@/services/cache/notes.chache";
import { CompanyItem, CreateCompanyRequest } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useCreateCompany() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: CreateCompanyRequest) =>
      fetchJson<CompanyItem>("/api/companies", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.lists(), refetchType: "all" });
      router.push("/companies");
    },
  });
}
