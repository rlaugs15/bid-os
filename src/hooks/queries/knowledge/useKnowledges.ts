import { fetchJson } from "@/lib/utils";
import { knowledgeKeys } from "@/services/cache/knowledge.cache";
import { KnowledgeListItem } from "@/types/knowledge";
import { useQuery } from "@tanstack/react-query";

export default function useKnowledges(keyword?: string) {
  return useQuery({
    queryKey: knowledgeKeys.list({ keyword }),

    queryFn: () =>
      fetchJson<KnowledgeListItem[]>(`/api/knowledge?keyword=${encodeURIComponent(keyword ?? "")}`),
  });
}
