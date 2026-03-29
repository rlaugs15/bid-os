import { fetchJson } from "@/lib/utils";
import { inboxKeys } from "@/services/cache/notes.chache";
import { InboxItem } from "@/types/notes";
import { useQuery } from "@tanstack/react-query";

export default function useInbox(inboxId: string) {
  return useQuery({
    queryKey: inboxKeys.detail(inboxId),
    queryFn: async () => fetchJson<InboxItem>(`/api/inbox/${inboxId}`),
    enabled: Boolean(inboxId),
  });
}
