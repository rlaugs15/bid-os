import { memoKeys } from "@/services/cache/memos.cache";
import { Memo, UpdateMemo } from "@/types/memos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchMemo({ id, content, description }: UpdateMemo) {
  const res = await fetch(`/api/memos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      description,
    }),
  });

  if (!res.ok) throw new Error("메모 수정 실패");

  return res.json();
}

export function useUpdateMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMemo) => fetchMemo(data), // id + content 전달

    onMutate: async ({ id, content, description }) => {
      await queryClient.cancelQueries({ queryKey: memoKeys.list() });
      const previous = queryClient.getQueryData<Memo[]>(memoKeys.list());

      // 낙관적 업데이트
      queryClient.setQueryData<Memo[]>(
        memoKeys.list(),
        (old) =>
          old?.map((memo) =>
            memo.id === id
              ? { ...memo, content, description: description ?? memo.description }
              : memo,
          ) || [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) queryClient.setQueryData(memoKeys.list(), context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: memoKeys.list() });
    },
  });
}
