import { fetchJson } from "@/lib/utils";
import { inboxKeys, noteKeys } from "@/services/cache/notes.chache";
import { NoteItem } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useConvertInbox() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inboxId: string) =>
      fetchJson<NoteItem>(`/api/inbox/${inboxId}/convert`, {
        method: "PATCH",
      }),
    onSuccess: (_note, inboxId) => {
      queryClient.invalidateQueries({ queryKey: inboxKeys.lists() });
      queryClient.invalidateQueries({ queryKey: inboxKeys.detail(inboxId) });
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
    },
  });
}
