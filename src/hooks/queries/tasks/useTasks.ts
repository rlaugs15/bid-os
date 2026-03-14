import { toQueryString } from "@/lib/utils";
import { taskKeys } from "@/services/cache/tasks.cache";
import { TaskQuery } from "@/types/tasks";
import { useQuery } from "@tanstack/react-query";

async function fetchTasks(query: TaskQuery) {
  const queryValue = toQueryString(query);
  const res = await fetch(`/api/tasks?${queryValue}`);
  const data = await res.json();
  return data;
}

export default function useTasks({ status, priority, today }: TaskQuery) {
  const query = { status, priority, today };
  return useQuery({
    queryKey: taskKeys.list(),
    queryFn: () => fetchTasks(query),
  });
}
