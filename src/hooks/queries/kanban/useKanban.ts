import { kanbanKeys } from "@/services/cache/kanban.cache";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

async function fetchKanban() {
  const res = await fetch("/api/kanban");

  if (!res.ok) throw new Error();

  return res.json();
}

export default function useKanban() {
  return useQuery({
    queryKey: kanbanKeys.board(),
    queryFn: fetchKanban,
    placeholderData: keepPreviousData,
  });
}
