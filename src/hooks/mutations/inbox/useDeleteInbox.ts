import { fetchJson } from "@/lib/utils";
import { inboxKeys } from "@/services/cache/notes.chache";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteInbox(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inboxId: string) =>
      fetchJson<{ success: true }>(`/api/inbox/${inboxId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: inboxKeys.lists() });
      options?.onSuccess?.();
    },
  });
}
