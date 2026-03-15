import { kanbanKeys } from "@/services/cache/kanban.cache";
import { Task } from "@/types/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function moveTask({ id, column_id, position }: Pick<Task, "id" | "column_id" | "position">) {
  const res = await fetch(`/api/kanban/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ column_id, position }),
  });

  if (!res.ok) throw new Error();

  return res.json();
}

export function useMoveTask() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: moveTask,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: kanbanKeys.board(),
      });
    },
  });
}
