import { taskKeys } from "@/services/cache/tasks.cache";
import { Filters, Task, UpdateTask } from "@/types/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateTaskParams {
  id: string;
  data: UpdateTask;
}

async function updateTask({ id, data }: UpdateTaskParams) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("업무 일정 수정 실패");
  const task: Task = await res.json();
  return task;
}

export default function useUpdateTask(filters?: Filters) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateTaskParams) => updateTask({ id, data }),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.list(filters) });

      const previous = queryClient.getQueryData<Task[]>(taskKeys.list(filters));

      queryClient.setQueryData<Task[]>(taskKeys.list(filters), (old) =>
        old ? old.map((task) => (task.id === id ? { ...task, ...data } : task)) : [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      // 실패 시 이전 상태 복원
      if (context?.previous) {
        queryClient.setQueryData(taskKeys.list(filters), context.previous);
      }
    },

    onSettled: (_data, _error, variables) => {
      // 성공/실패 상관없이 캐시 최신화
      queryClient.invalidateQueries({ queryKey: taskKeys.list(filters) });
      queryClient.invalidateQueries({ queryKey: taskKeys.item(variables.id) });
    },
  });
}
