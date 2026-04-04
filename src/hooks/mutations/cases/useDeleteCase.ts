import { fetchJson } from "@/lib/utils";
import { caseKeys } from "@/services/cache/notes.chache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useDeleteCase() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (caseId: string) =>
      fetchJson<{ success: true }>(`/api/cases/${caseId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: caseKeys.lists(), refetchType: "all" });
      router.push("/cases");
    },
  });
}
