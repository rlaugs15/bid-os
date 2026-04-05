import { fetchJson } from "@/lib/utils";
import { knowledgeKeys } from "@/services/cache/knowledge.cache";
import { UpdateKnowledge } from "@/types/knowledge";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateKnowledge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateKnowledge }) =>
      fetchJson(`/api/knowledge/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),

    onSuccess: (_, { id }) => {
      // 상세 갱신
      queryClient.invalidateQueries({
        queryKey: knowledgeKeys.detail(id),
      });

      // 리스트 갱신
      queryClient.invalidateQueries({
        queryKey: knowledgeKeys.listAll(),
      });
    },
  });
}
