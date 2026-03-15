import { kanbanKeys } from "@/services/cache/kanban.cache";
import { Task } from "@/types/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function moveTask({ id, column_id, position }: Pick<Task, "id" | "column_id" | "position">) {
  const res = await fetch(`/api/kanban/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ column_id, position }),
  });

  if (!res.ok) throw new Error("이동에 실패했습니다.");

  return res.json();
}

export default function useMoveTask() {
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
