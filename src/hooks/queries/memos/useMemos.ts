import { memoKeys } from "@/services/cache/memos.cache";
import { Memo, MemoType } from "@/types/memos";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

async function fetchMemos(params: MemoType) {
  const res = await fetch(`/api/memos?type=${params}`);
  const data = await res.json();
  return data;
}

export function useMemos(type: MemoType) {
  const key = type ? memoKeys.listByType(type) : memoKeys.list();
  return useQuery<Memo[], Error>({
    queryKey: key,
    queryFn: () => fetchMemos(type),
    placeholderData: keepPreviousData,
  });
}
