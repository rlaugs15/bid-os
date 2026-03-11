import { memoKeys } from "@/services/cache/memos.cache";
import { Memo } from "@/types/memos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 실제 DELETE 요청
async function deleteMemo(id: string) {
  const res = await fetch(`/api/memos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("메모 삭제 실패");
  return res.json(); // { success: true, id: '...' }
}

// 훅
export function useDeleteMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMemo(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: memoKeys.list() });

      const previous = queryClient.getQueryData<Memo[]>(memoKeys.list());

      // 낙관적 업데이트: 캐시에서 바로 제거
      queryClient.setQueryData<Memo[]>(
        memoKeys.list(),
        (old) => old?.filter((memo) => memo.id !== id) || [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(memoKeys.list(), context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: memoKeys.list() });
    },
  });
}
