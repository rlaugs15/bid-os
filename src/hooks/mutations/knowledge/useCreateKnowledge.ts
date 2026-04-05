import { fetchJson } from "@/lib/utils";
import { knowledgeKeys } from "@/services/cache/knowledge.cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateKnowledge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { title: string; summary: string; description?: string }) =>
      fetchJson("/api/knowledge", {
        method: "POST",
        body: JSON.stringify(body),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: knowledgeKeys.listAll(),
      });
    },
  });
}
