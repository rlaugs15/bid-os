import { fetchJson } from "@/lib/utils";
import { knowledgeKeys } from "@/services/cache/knowledge.cache";
import { KnowledgeDetail } from "@/types/knowledge";
import { useQuery } from "@tanstack/react-query";

export default function useKnowledge(knowledgeId: string) {
  return useQuery({
    queryKey: knowledgeKeys.detail(knowledgeId),

    queryFn: () => fetchJson<KnowledgeDetail>(`/api/knowledge/${knowledgeId}`),

    enabled: !!knowledgeId,
  });
}
