import { fetchJson } from "@/lib/utils";
import { inboxKeys } from "@/services/cache/notes.chache";
import { CreateInboxRequest, InboxItem } from "@/types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateInbox() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateInboxRequest) =>
      fetchJson<InboxItem>("/api/inbox", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inboxKeys.lists() });
    },
  });
}
