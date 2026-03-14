import { taskKeys } from "@/services/cache/tasks.cache";
import { CreateTask, Task } from "@/types/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createTask(data: CreateTask) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("업무일정 생성 실패");
  const task = await res.json();
  return task;
}

export default function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTask) => createTask(data),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.list() });
      const previous = queryClient.getQueryData(taskKeys.list());
      queryClient.setQueryData<Task[]>(taskKeys.list(), (old) =>
        old
          ? [
              ...old,
              {
                ...newTask,
                id: `temp-id-${Date.now()}`,
                user_id: `me-${Date.now()}`,
                createdAt: new Date().toISOString(),
              },
            ]
          : [newTask],
      );
      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) queryClient.setQueryData(taskKeys.list(), context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: taskKeys.list() }),
  });
}
