"use client";

import {
  KanbanBoard,
  KanbanBoardCard,
  KanbanBoardCardTitle,
  KanbanBoardColumn,
  KanbanBoardColumnHeader,
  KanbanBoardColumnList,
  KanbanBoardColumnListItem,
  KanbanBoardColumnTitle,
  KanbanBoardProvider,
} from "@/components/kanban";

const tasks = [
  { id: "1", title: "로그인 만들기", status: "todo" },
  { id: "2", title: "API 연결", status: "doing" },
];

export default function Page() {
  return (
    <KanbanBoardProvider>
      <KanbanBoard>
        <KanbanBoardColumn columnId="todo">
          <KanbanBoardColumnHeader>
            <KanbanBoardColumnTitle columnId="todo">Todo</KanbanBoardColumnTitle>
          </KanbanBoardColumnHeader>

          <KanbanBoardColumnList>
            {tasks
              .filter((t) => t.status === "todo")
              .map((task) => (
                <KanbanBoardColumnListItem key={task.id} cardId={task.id}>
                  <KanbanBoardCard data={{ id: task.id }}>
                    <KanbanBoardCardTitle>{task.title}</KanbanBoardCardTitle>
                  </KanbanBoardCard>
                </KanbanBoardColumnListItem>
              ))}
          </KanbanBoardColumnList>
        </KanbanBoardColumn>
      </KanbanBoard>
    </KanbanBoardProvider>
  );
}
