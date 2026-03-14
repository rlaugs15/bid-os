import { safeKey } from "@/lib/utils";
import { Filters } from "@/types/tasks";

export const taskKeys = {
  all: ["tasks"] as const,

  // 전체 Task 조회
  list: (filters?: Filters) =>
    safeKey(...taskKeys.all, "list", filters ? JSON.stringify(filters) : undefined),

  // 개별 Task
  item: (id: string) => safeKey(...taskKeys.all, "item", id),
};
