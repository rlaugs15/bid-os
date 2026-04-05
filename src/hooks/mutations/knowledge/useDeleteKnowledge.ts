import { fetchJson } from "@/lib/utils";
import { knowledgeKeys } from "@/services/cache/knowledge.cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteKnowledge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetchJson(`/api/knowledge/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: knowledgeKeys.listAll(),
      });
    },
  });
}
