import { task_priority, task_status } from "prisma/app/generated/prisma/enums";
import { Tables } from "./database";

export type Task = Tables["task"];

export type CreateTask = {
  title: string;
  description?: string;
  priority?: string;
  due_at?: string;
  remind_at?: string;
};

export type UpdateTask = Pick<
  Task,
  "title" | "description" | "priority" | "due_at" | "remind_at",
  "status"
>;

export type TaskQuery = {
  status?: task_status;
  priority?: task_priority;
  today?: boolean;
};

export type CreateTask = Pick<Task, "title" | "description" | "priority" | "due_at" | "remind_at">;

export type Filters = "status" | "priority" | "today";
