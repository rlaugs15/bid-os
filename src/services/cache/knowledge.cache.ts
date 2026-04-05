export const knowledgeKeys = {
  all: ["knowledge"] as const,

  listAll: () => [...knowledgeKeys.all, "listAll"] as const,
  list: (params: { keyword?: string }) => [...knowledgeKeys.listAll(), params] as const,

  detailAll: () => [...knowledgeKeys.all, "detailAll"] as const,
  detail: (id: string) => [...knowledgeKeys.detailAll(), id] as const,
};
/* 
listAll   → 모든 리스트 묶음
list      → 특정 리스트
detailAll → 모든 상세 묶음
detail    → 특정 상세
 */
