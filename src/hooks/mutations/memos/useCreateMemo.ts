import { memoKeys } from "@/services/cache/memos.cache";
import { CreateMemo, Memo } from "@/types/memos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchMemo(data: CreateMemo) {
  const res = await fetch("/api/memos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("메모 생성 실패");
  return res.json();
}

export function useCreateMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMemo) => fetchMemo(data),
    onMutate: async (newMemo) => {
      await queryClient.cancelQueries({ queryKey: memoKeys.list() });
      const previous = queryClient.getQueryData<Memo[]>(memoKeys.list());
      queryClient.setQueryData<Memo[]>(memoKeys.list(), (old) =>
        old
          ? [
              ...old,
              {
                ...newMemo,
                id: `temp-id-${Date.now()}`,
                user_id: `me-${Date.now()}`,
                use_count: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ]
          : [],
      );
      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) queryClient.setQueryData(memoKeys.list(), context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: memoKeys.list() }),
  });
}
