export const kanbanKeys = {
  all: ["kanban"] as const,

  board: () => [...kanbanKeys.all, "board"] as const,
};
