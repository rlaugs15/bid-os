import { fetchJson } from "@/lib/utils";
import { caseKeys } from "@/services/cache/notes.chache";
import { CaseItem, CreateCaseRequest } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useCreateCase() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: CreateCaseRequest) =>
      fetchJson<CaseItem>("/api/cases", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: caseKeys.lists() });
      router.push("/cases");
    },
  });
}
