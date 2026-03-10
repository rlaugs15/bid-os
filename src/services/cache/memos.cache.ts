import { cacheCore, safeKey } from "@/lib/utils";
import { MemoType } from "@/types/memos";

export const memoKeys = {
  all: ["memos"] as const,

  // 전체 메모 조회
  list: () => safeKey(...memoKeys.all),

  // 타입별 메모 조회
  listByType: (type: MemoType) => safeKey(...memoKeys.all, "type", type),

  // 개별 메모
  item: (id: string) => safeKey(...memoKeys.all, "item", id),
};

export const memoTags = {
  list: () => cacheCore.fromKey(memoKeys.list()),
  listByType: (type: MemoType) => cacheCore.fromKey(memoKeys.listByType(type)),
  item: (id: string) => cacheCore.fromKey(memoKeys.item(id)),
};
