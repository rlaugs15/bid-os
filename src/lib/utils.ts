import { Board, Task } from "@/types/kanban";
import { clsx, type ClassValue } from "clsx";
import prisma from "prisma/prisma";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* 쿼리키에서 undefined나 null 제거하는 함수 */
export function safeKey(...args: (string | number | undefined | null)[]) {
  return args
    .filter((v): v is string | number => v !== undefined && v !== null)
    .map((v) => String(v));
}

// 캐시키 배열을 문자열로 변환
export const cacheCore = {
  fromKey: (key: readonly (string | number)[]) => key.join(":"),
};

/* URLSearchParams로 변환해 API 요청용 쿼리스트링(query string) 으로 만들어주는 유틸 함수 */
export function toQueryString(params: Record<string, any>): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.set(key, String(value));
    }
  });

  return query.toString();
}

export function extractVariables(content: string) {
  const matches = content.match(/{([^{}]+)}/g) || [];
  return matches.map((v) => v.slice(1, -1).trim());
}

// -----------------------------------칸반 관련 유틸 -----------------------------------

//bigint 직렬화
// position을 BigInt로 둔 것은 좋다. 다만 JSON으로 바로 내려보내면 에러가 나므로 문자열 변환이 필요하다.
export function serializeBigInt<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) => (typeof value === "bigint" ? value.toString() : value)),
  );
}

const GAP = 1024n;

export async function getTaskPositionById(taskId: string) {
  return prisma.task.findUnique({
    where: { id: taskId },
    select: { id: true, position: true, column_id: true, user_id: true },
  });
}

export async function getLastTaskInColumn(columnId: string) {
  return prisma.task.findFirst({
    where: { column_id: columnId },
    orderBy: { position: "desc" },
    select: { id: true, position: true },
  });
}

export async function reindexColumnTasks(columnId: string) {
  const tasks = await prisma.task.findMany({
    where: { column_id: columnId },
    orderBy: { position: "asc" },
    select: { id: true },
  });

  await prisma.$transaction(
    tasks.map((task, index) =>
      prisma.task.update({
        where: { id: task.id },
        data: { position: BigInt((index + 1) * 1024) },
      }),
    ),
  );
}

export async function calculateTaskPosition(params: {
  toColumnId: string;
  beforeTaskId?: string | null;
  afterTaskId?: string | null;
}) {
  const { toColumnId, beforeTaskId, afterTaskId } = params;

  if (beforeTaskId && afterTaskId) {
    const [before, after] = await Promise.all([
      getTaskPositionById(beforeTaskId),
      getTaskPositionById(afterTaskId),
    ]);

    if (!before || !after) {
      throw new Error("기준 task를 찾을 수 없다.");
    }

    const gap = before.position - after.position;

    if (gap <= 1n) {
      await reindexColumnTasks(toColumnId);

      const [reBefore, reAfter] = await Promise.all([
        getTaskPositionById(beforeTaskId),
        getTaskPositionById(afterTaskId),
      ]);

      if (!reBefore || !reAfter) {
        throw new Error("재정렬 후 기준 task를 찾을 수 없다.");
      }

      return (reBefore.position + reAfter.position) / 2n;
    }

    return (before.position + after.position) / 2n;
  }

  if (beforeTaskId) {
    const before = await getTaskPositionById(beforeTaskId);

    if (!before) {
      throw new Error("beforeTask를 찾을 수 없다.");
    }

    if (before.position <= 1n) {
      await reindexColumnTasks(toColumnId);
      const reBefore = await getTaskPositionById(beforeTaskId);

      if (!reBefore) {
        throw new Error("재정렬 후 beforeTask를 찾을 수 없다.");
      }

      return reBefore.position / 2n;
    }

    return before.position / 2n;
  }

  if (afterTaskId) {
    const after = await getTaskPositionById(afterTaskId);

    if (!after) {
      throw new Error("afterTask를 찾을 수 없다.");
    }

    return after.position + GAP;
  }

  const lastTask = await getLastTaskInColumn(toColumnId);
  if (!lastTask) return GAP;

  return lastTask.position + GAP;
}

// -----------------------------------칸반 관련 프론트용 board 유틸-----------------------------------
export function removeTaskFromBoard(board: Board, taskId: string) {
  return {
    ...board,
    columns: board.columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => task.id !== taskId),
    })),
  };
}

export function insertTaskIntoBoard(params: {
  board: Board;
  task: Task;
  toColumnId: string;
  beforeTaskId?: string | null;
  afterTaskId?: string | null;
}) {
  const { board, task, toColumnId, beforeTaskId, afterTaskId } = params;

  return {
    ...board,
    columns: board.columns.map((column) => {
      if (column.id !== toColumnId) return column;

      const tasks = [...column.tasks];

      if (beforeTaskId) {
        const index = tasks.findIndex((t) => t.id === beforeTaskId);
        if (index >= 0) {
          tasks.splice(index, 0, task);
          return { ...column, tasks };
        }
      }

      if (afterTaskId) {
        const index = tasks.findIndex((t) => t.id === afterTaskId);
        if (index >= 0) {
          tasks.splice(index + 1, 0, task);
          return { ...column, tasks };
        }
      }

      tasks.push(task);
      return { ...column, tasks };
    }),
  };
}

export function moveTaskInBoard(params: {
  board: Board;
  taskId: string;
  toColumnId: string;
  beforeTaskId?: string | null;
  afterTaskId?: string | null;
}) {
  const { board, taskId, toColumnId, beforeTaskId, afterTaskId } = params;

  let movingTask: Task | null = null;

  for (const column of board.columns) {
    const found = column.tasks.find((task) => task.id === taskId);
    if (found) {
      movingTask = { ...found, column_id: toColumnId };
      break;
    }
  }

  if (!movingTask) return board;

  const removed = removeTaskFromBoard(board, taskId);
  return insertTaskIntoBoard({
    board: removed,
    task: movingTask,
    toColumnId,
    beforeTaskId,
    afterTaskId,
  });
}
