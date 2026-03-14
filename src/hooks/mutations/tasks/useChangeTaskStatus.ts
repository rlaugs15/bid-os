import { taskKeys } from "@/services/cache/tasks.cache";
import { Task } from "@/types/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { task_status } from "prisma/app/generated/prisma/enums";

async function changeTaskStatus({ id, status }: { id: string; status: task_status }) {
  const res = await fetch(`/api/tasks/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("업무 상태 변경 실패");
  const task: Task = await res.json();
  return task;
}

export default function useChangeTaskStatus(filters?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; status: task_status }) => changeTaskStatus(data),

    // 낙관적 업데이트
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.list(filters) });
      const previous = queryClient.getQueryData<Task[]>(taskKeys.list(filters));

      queryClient.setQueryData<Task[]>(taskKeys.list(filters), (old) =>
        old ? old.map((task) => (task.id === id ? { ...task, status } : task)) : [],
      );

      return { previous };
    },

    // 오류 발생 시 이전 상태로 복원
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(taskKeys.list(filters), context.previous);
      }
    },

    // 성공/실패 후 항상 캐시 최신화
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.list(filters) });
      // 상세 Task도 최신화
      queryClient.invalidateQueries({ queryKey: taskKeys.item(variables.id) });
    },
  });
}
