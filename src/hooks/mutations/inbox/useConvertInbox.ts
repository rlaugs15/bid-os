import { fetchJson } from "@/lib/utils";
import { inboxKeys, noteKeys } from "@/services/cache/notes.chache";
import { ConvertInboxRequest, NoteItem } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useConvertInbox() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ inboxId, title, content }: ConvertInboxRequest) =>
      fetchJson<Pick<NoteItem, "id">>(`/api/inbox/${inboxId}/convert`, {
        method: "PATCH",
        body: JSON.stringify({ title, content }),
      }),
    onSuccess: (note, variables) => {
      queryClient.invalidateQueries({ queryKey: inboxKeys.lists() });
      queryClient.invalidateQueries({ queryKey: inboxKeys.detail(variables.inboxId) });
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
      router.replace(`/notes/${note.id}`);
    },
  });
}
